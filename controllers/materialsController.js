const axios = require("axios");
const https = require("https");
const dotenv = require("dotenv");

dotenv.config();

exports.requestMaterials = async (req, res) => {
  const body = req.body || {};

  try {
    const response = await axios.post(
      `${process.env.SAP_BASE_URL}/sap/opu/odata/sap/ZRAKSHITH20_SRV/prodOrderListSet?sap-client=${process.env.SAP_CLIENT}`,
      body,
      {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Requested-With": "X",
          "sap-language": "EN",
        },
        auth: {
          username: process.env.SAP_USER,
          password: process.env.SAP_PASS,
        },
      },
    );
    console.log("response", response.headers["sap-message"]);
    res.json({
      response: response.data.d,
      message: response.headers["sap-message"],
    });
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    const sapMessage = error?.response?.data?.error?.message?.value
      ?? error?.response?.data ?? error?.message;
    res.status(error?.response?.status || 500).json({
      success: false,
      error: error?.response?.data ?? error?.message,
      message: sapMessage,
    });
  }
};

exports.transferMaterials = async (req, res) => {
  const body = req.body || {};

  try {
    const response = await axios.post(
      `${process.env.SAP_BASE_URL}/sap/opu/odata/sap/ZRAKSHITH20_SRV/ReservationHeaderSet?sap-client=${process.env.SAP_CLIENT}`,
      body,
      {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Requested-With": "X",
          "sap-language": "EN",
        },
        auth: {
          username: process.env.SAP_USER,
          password: process.env.SAP_PASS,
        },
      },
    );

    res.json({
      response: response.data.d,
      message: response.headers["sap-message"],
    });
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    const sapMessage = error?.response?.data?.error?.message?.value
      ?? error?.response?.data ?? error?.message;
    res.status(error?.response?.status || 500).json({
      success: false,
      error: error?.response?.data ?? error?.message,
      message: sapMessage,
    });
  }
};

exports.getReservation = async (req, res) => {
  const { reservationNumber } = req.params;

  try {
    const response = await axios.get(
      `${process.env.SAP_BASE_URL}/sap/opu/odata/sap/ZRAKSHITH20_SRV/ReservationHeaderSet?sap-client=${process.env.SAP_CLIENT}`,
      {
        params: {
          $expand: "npToItem,npToMatIssue,npToMatReceipts",
          $filter: `reservationNumber eq '${reservationNumber}'`,
          $format: "json",
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
        headers: {
          Accept: "application/json",
          "X-Requested-With": "X",
          "sap-language": "EN",
        },
        auth: {
          username: process.env.SAP_USER,
          password: process.env.SAP_PASS,
        },
      },
    );

    res.json(response.data.d);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    const sapMessage = error?.response?.data?.error?.message?.value
      ?? error?.response?.data ?? error?.message;
    res.status(error?.response?.status || 500).json({
      success: false,
      error: error?.response?.data ?? error?.message,
      message: sapMessage,
    });
  }
};

exports.getReservationList = async (req, res) => {
  const { employeeId, plant, sessionId } = req.params;

  try {
    const response = await axios.get(
      `${process.env.SAP_BASE_URL}/sap/opu/odata/sap/ZRAKSHITH20_SRV/ReservationHeaderSet?sap-client=${process.env.SAP_CLIENT}`,
      {
        params: {
          $expand: "npToItem",
          $filter: `employeeId eq '${employeeId}' and plant eq '${plant}' and sessionId eq '${sessionId}'`,
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
        headers: {
          Accept: "application/json",
          "X-Requested-With": "X",
          "sap-language": "EN",
        },
        auth: {
          username: process.env.SAP_USER,
          password: process.env.SAP_PASS,
        },
      },
    );

    res.json(response.data.d);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    const sapMessage = error?.response?.data?.error?.message?.value
      ?? error?.response?.data ?? error?.message;
    res.status(error?.response?.status || 500).json({
      success: false,
      error: error?.response?.data ?? error?.message,
      message: sapMessage,
    });
  }
};

exports.printMaterialReceiptSlip = async (req, res) => {
  const { materialDoc, materialDocYear } = req.params;

  try {
    const response = await axios.get(
      `${process.env.SAP_BASE_URL}/sap/opu/odata/sap/ZRAKSHITH20_SRV/MaterialReceiptSlipSet(materialDoc='${materialDoc}',materialDocYear='${materialDocYear}')/$value?sap-client=${process.env.SAP_CLIENT}`,
      {
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        responseType: "arraybuffer",
        headers: {
          Accept: "application/pdf",
          "X-Requested-With": "X",
          "sap-language": "EN",
        },
        auth: {
          username: process.env.SAP_USER,
          password: process.env.SAP_PASS,
        },
      },
    );

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="receipt_slip_${materialDoc}.pdf"`);
    res.send(response.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    const sapMessage = error?.response?.data?.error?.message?.value
      ?? error?.response?.data ?? error?.message;
    res.status(error?.response?.status || 500).json({
      success: false,
      error: error?.response?.data ?? error?.message,
      message: sapMessage,
    });
  }
};

exports.printMaterialIssueSlip = async (req, res) => {
  const { materialDoc, materialDocYear } = req.params;

  try {
    const response = await axios.get(
      `${process.env.SAP_BASE_URL}/sap/opu/odata/sap/ZRAKSHITH20_SRV/MaterialIssueSlipSet(materialDoc='${materialDoc}',materialDocYear='${materialDocYear}')/$value?sap-client=${process.env.SAP_CLIENT}`,
      {
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        responseType: "arraybuffer",
        headers: {
          Accept: "application/pdf",
          "X-Requested-With": "X",
          "sap-language": "EN",
        },
        auth: {
          username: process.env.SAP_USER,
          password: process.env.SAP_PASS,
        },
      },
    );

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="issue_slip_${materialDoc}.pdf"`);
    res.send(response.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    const sapMessage = error?.response?.data?.error?.message?.value
      ?? error?.response?.data ?? error?.message;
    res.status(error?.response?.status || 500).json({
      success: false,
      error: error?.response?.data ?? error?.message,
      message: sapMessage,
    });
  }
};

exports.printReservationSlip = async (req, res) => {
  const { reservationNumber } = req.params;

  try {
    const response = await axios.get(
      `${process.env.SAP_BASE_URL}/sap/opu/odata/sap/ZRAKSHITH20_SRV/ReservationSlipSet(reservationNumber='${reservationNumber}')/$value?sap-client=${process.env.SAP_CLIENT}`,
      {
        responseType: "arraybuffer",
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        headers: {
          Accept: "application/pdf",
          "X-Requested-With": "X",
          "sap-language": "EN",
        },
        auth: {
          username: process.env.SAP_USER,
          password: process.env.SAP_PASS,
        },
      },
    );

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="reservation_${reservationNumber}.pdf"`);
    res.send(response.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    const sapMessage = error?.response?.data?.error?.message?.value
      ?? error?.response?.data ?? error?.message;
    res.status(error?.response?.status || 500).json({
      success: false,
      error: error?.response?.data ?? error?.message,
      message: sapMessage,
    });
  }
};

exports.getConfirmationList = async (req, res) => {
  const { employeeId, plant, sessionId } = req.params;

  try {
    const response = await axios.get(
      `${process.env.SAP_BASE_URL}/sap/opu/odata/sap/ZRAKSHITH20_SRV/MatReceiptHdrSet?sap-client=${process.env.SAP_CLIENT}`,
      {
        params: {
          $expand: "npToItem",
          $filter: `employeeId eq '${employeeId}' and plant eq '${plant}' and sessionId eq '${sessionId}'`,
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
        headers: {
          Accept: "application/json",
          "X-Requested-With": "X",
          "sap-language": "EN",
        },
        auth: {
          username: process.env.SAP_USER,
          password: process.env.SAP_PASS,
        },
      },
    );

    res.json(response.data.d);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    const sapMessage = error?.response?.data?.error?.message?.value
      ?? error?.response?.data ?? error?.message;
    res.status(error?.response?.status || 500).json({
      success: false,
      error: error?.response?.data ?? error?.message,
      message: sapMessage,
    });
  }
};

exports.createReceiveConfirm = async (req, res) => {
  const body = req.body || {};

  try {
    const response = await axios.post(
      `${process.env.SAP_BASE_URL}/sap/opu/odata/sap/ZRAKSHITH20_SRV/MatIssueHdrSet?sap-client=${process.env.SAP_CLIENT}`,
      body,
      {
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Requested-With": "X",
          "sap-language": "EN",
        },
        auth: {
          username: process.env.SAP_USER,
          password: process.env.SAP_PASS,
        },
      },
    );

    res.json({
      response: response.data.d,
      message: response.headers["sap-message"],
    });
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    const sapMessage = error?.response?.data?.error?.message?.value
      ?? error?.response?.data ?? error?.message;
    res.status(error?.response?.status || 500).json({
      success: false,
      error: error?.response?.data ?? error?.message,
      message: sapMessage,
    });
  }
};

exports.issueDetailByDocAndYear = async (req, res) => {
  const { materialDoc, materialDocYear } = req.params;
  const { empid, sesid } = req.query;

  try {
    const response = await axios.get(
      `${process.env.SAP_BASE_URL}/sap/opu/odata/sap/ZRAKSHITH20_SRV/MatIssueHdrSet?sap-client=${process.env.SAP_CLIENT}`,
      {
        params: {
          $expand: "npToIssueItem,npToReceipts",
          $filter: `materialDoc eq '${materialDoc}' and materialDocYear eq '${materialDocYear}' and employeeId eq '${empid}' and sessionId eq '${sesid}'`,
          $format: "json",
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        headers: {
          Accept: "application/json",
          "X-Requested-With": "X",
          "sap-language": "EN",
        },
        auth: {
          username: process.env.SAP_USER,
          password: process.env.SAP_PASS,
        },
      },
    );

    res.json(response.data.d);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    const sapMessage = error?.response?.data?.error?.message?.value
      ?? error?.response?.data ?? error?.message;
    res.status(error?.response?.status || 500).json({
      success: false,
      error: error?.response?.data ?? error?.message,
      message: sapMessage,
    });
  }
};

exports.getSingleIssueDetailsByMatDocAndYear = async (req, res) => {
  const { materialDoc, materialDocYear } = req.params;

  try {
    const response = await axios.get(
      `${process.env.SAP_BASE_URL}/sap/opu/odata/sap/ZRAKSHITH20_SRV/MatIssueHdrSet?sap-client=${process.env.SAP_CLIENT}`,
      {
        params: {
          $expand: "npToIssueItem,npToReceipts",
          $filter: `materialDoc eq '${materialDoc}' and materialDocYear eq '${materialDocYear}'`,
          $format: "json",
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
        headers: {
          Accept: "application/json",
          "X-Requested-With": "X",
          "sap-language": "EN",
        },
        auth: {
          username: process.env.SAP_USER,
          password: process.env.SAP_PASS,
        },
      },
    );

    res.json(response.data.d);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    const sapMessage = error?.response?.data?.error?.message?.value
      ?? error?.response?.data ?? error?.message;
    res.status(error?.response?.status || 500).json({
      success: false,
      error: error?.response?.data ?? error?.message,
      message: sapMessage,
    });
  }
};

exports.getIssueList = async (req, res) => {
  const { employeeId, plant, sessionId } = req.params;

  try {
    const response = await axios.get(
      `${process.env.SAP_BASE_URL}/sap/opu/odata/sap/ZRAKSHITH20_SRV/MatIssueHdrSet?sap-client=${process.env.SAP_CLIENT}`,
      {
        params: {
          $expand: "npToIssueItem",
          $format: "json",
          $filter: `employeeId eq '${employeeId}' and plant eq '${plant}' and sessionId eq '${sessionId}'`,
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
        headers: {
          Accept: "application/json",
          "X-Requested-With": "X",
          "sap-language": "EN",
        },
        auth: {
          username: process.env.SAP_USER,
          password: process.env.SAP_PASS,
        },
      },
    );

    res.json(response.data.d);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    const sapMessage = error?.response?.data?.error?.message?.value
      ?? error?.response?.data ?? error?.message;
    res.status(error?.response?.status || 500).json({
      success: false,
      error: error?.response?.data ?? error?.message,
      message: sapMessage,
    });
  }
};

exports.getReservationByNumber = async (req, res) => {
  const { employeeId, plant, sessionId, reservationNumber } = req.params;

  try {
    const response = await axios.get(
      `${process.env.SAP_BASE_URL}/sap/opu/odata/sap/ZRAKSHITH20_SRV/ReservationHeaderSet?sap-client=${process.env.SAP_CLIENT}`,
      {
        params: {
          $expand: "npToItem/npToBatch",
          $filter: `employeeId eq '${employeeId}' and plant eq '${plant}' and sessionId eq '${sessionId}' and reservationNumber eq '${reservationNumber}'`,
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
        headers: {
          Accept: "application/json",
          "X-Requested-With": "X",
          "sap-language": "EN",
        },
        auth: {
          username: process.env.SAP_USER,
          password: process.env.SAP_PASS,
        },
      },
    );

    res.json(response.data.d);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    const sapMessage = error?.response?.data?.error?.message?.value
      ?? error?.response?.data ?? error?.message;
    res.status(error?.response?.status || 500).json({
      success: false,
      error: error?.response?.data ?? error?.message,
      message: sapMessage,
    });
  }
};

exports.confirmMaterialReceipt = async (req, res) => {
  const body = req.body || {};

  try {
    const response = await axios.post(
      `${process.env.SAP_BASE_URL}/sap/opu/odata/sap/ZRAKSHITH20_SRV/prodOrderListSet?sap-client=${process.env.SAP_CLIENT}`,
      body,
      {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Requested-With": "X",
          "sap-language": "EN",
        },
        auth: {
          username: process.env.SAP_USER,
          password: process.env.SAP_PASS,
        },
      },
    );

    res.json({
      response: response.data.d,
      message: response.headers["sap-message"],
    });
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    const sapMessage = error?.response?.data?.error?.message?.value
      ?? error?.response?.data ?? error?.message;
    res.status(error?.response?.status || 500).json({
      success: false,
      error: error?.response?.data ?? error?.message,
      message: sapMessage,
    });
  }
};

exports.getMaterialIssue = async (req, res) => {
  const { employeeId, plant, sessionId, orderId } = req.params;

  try {
    const response = await axios.get(
      `${process.env.SAP_BASE_URL}/sap/opu/odata/sap/ZRAKSHITH20_SRV/prodOrderListSet('${orderId}')?sap-client=${process.env.SAP_CLIENT}`,
      {
        params: {
          $expand: "npToIssue/npToIssueItem",
          $filter: `employeeId eq '${employeeId}' and plant eq '${plant}' and sessionId eq '${sessionId}'`,
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
        headers: {
          Accept: "application/json",
          "X-Requested-With": "X",
          "sap-language": "EN",
        },
        auth: {
          username: process.env.SAP_USER,
          password: process.env.SAP_PASS,
        },
      },
    );

    res.json(response.data.d);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    const sapMessage = error?.response?.data?.error?.message?.value
      ?? error?.response?.data ?? error?.message;
    res.status(error?.response?.status || 500).json({
      success: false,
      error: error?.response?.data ?? error?.message,
      message: sapMessage,
    });
  }
};

exports.createTransfer = async (req, res) => {
  const body = req.body || {};

  try {
    const response = await axios.post(
      `${process.env.SAP_BASE_URL}/sap/opu/odata/sap/ZRAKSHITH20_SRV/TransferHdrSet?sap-client=${process.env.SAP_CLIENT}`,
      body,
      {
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Requested-With": "X",
          "sap-language": "EN",
        },
        auth: {
          username: process.env.SAP_USER,
          password: process.env.SAP_PASS,
        },
      },
    );

    res.json({
      response: response.data.d,
      message: response.headers["sap-message"],
    });
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    const sapMessage = error?.response?.data?.error?.message?.value
      ?? error?.response?.data ?? error?.message;
    res.status(error?.response?.status || 500).json({
      success: false,
      error: error?.response?.data ?? error?.message,
      message: sapMessage,
    });
  }
};

exports.getStockInfo = async (req, res) => {
  const { plant, storageLocation, employeeId, sessionId } = req.query;

  try {
    const response = await axios.get(
      `${process.env.SAP_BASE_URL}/sap/opu/odata/sap/ZRAKSHITH20_SRV/StockSet?sap-client=${process.env.SAP_CLIENT}`,
      {
        params: {
          $filter: `Werks eq '${plant}' and Lgort eq '${storageLocation}' and Bwart eq '311' and Empid eq '${employeeId}' and Sesid eq '${sessionId}'`,
          $format: "json",
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        headers: {
          Accept: "application/json",
          "X-Requested-With": "X",
          "sap-language": "EN",
        },
        auth: {
          username: process.env.SAP_USER,
          password: process.env.SAP_PASS,
        },
      },
    );

    res.json(response.data.d);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    const sapMessage = error?.response?.data?.error?.message?.value
      ?? error?.response?.data ?? error?.message;
    res.status(error?.response?.status || 500).json({
      success: false,
      error: error?.response?.data ?? error?.message,
      message: sapMessage,
    });
  }
};

exports.verifyScanCheck = async (req, res) => {
  const body = req.body || {};

  try {
    const response = await axios.post(
      `${process.env.SAP_BASE_URL}/sap/opu/odata/sap/ZRAKSHITH20_SRV/ScanCheckSet?sap-client=${process.env.SAP_CLIENT}`,
      body,
      {
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Requested-With": "X",
          "sap-language": "EN",
        },
        auth: {
          username: process.env.SAP_USER,
          password: process.env.SAP_PASS,
        },
      },
    );

    res.json({
      response: response.data.d,
      message: response.headers["sap-message"],
    });
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    const sapMessage = error?.response?.data?.error?.message?.value
      ?? error?.response?.data ?? error?.message;
    res.status(error?.response?.status || 500).json({
      success: false,
      error: error?.response?.data ?? error?.message,
      message: sapMessage,
    });
  }
};

exports.getProdOrderMatList = async (req, res) => {
  const { employeeId, plant, sessionId, orderId } = req.params;

  try {
    const response = await axios.get(
      `${process.env.SAP_BASE_URL}/sap/opu/odata/sap/ZRAKSHITH20_SRV/prodOrderListSet('${orderId}')?sap-client=${process.env.SAP_CLIENT}`,
      {
        params: {
          $expand: "npToComponents",
          $filter: `employeeId eq '${employeeId}' and plant eq '${plant}' and sessionId eq '${sessionId}'`,
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
        headers: {
          Accept: "application/json",
          "X-Requested-With": "X",
          "sap-language": "EN",
        },
        auth: {
          username: process.env.SAP_USER,
          password: process.env.SAP_PASS,
        },
      },
    );

    res.json(response.data.d);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    const sapMessage = error?.response?.data?.error?.message?.value
      ?? error?.response?.data ?? error?.message;
    res.status(error?.response?.status || 500).json({
      success: false,
      error: error?.response?.data ?? error?.message,
      message: sapMessage,
    });
  }
};





