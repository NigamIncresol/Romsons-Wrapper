const axios = require("axios");
const https = require("https");
const dotenv = require("dotenv");

dotenv.config();

exports.requestMaterials = async (req, res) => {
  const body = req.body || {};

  try {
    const response = await axios.post(
      "https://ROMSONS-DEV.romsons.com:8443/sap/opu/odata/sap/ZRAKSHITH20_SRV/prodOrderListSet?sap-client=690",
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
    res.status(500).json({
      success: false,
      error: error?.response?.data ?? error?.message,
      message: "Failed to request materials",
    });
  }
};

exports.transferMaterials = async (req, res) => {
  const body = req.body || {};

  try {
    const response = await axios.post(
      "https://ROMSONS-DEV.romsons.com:8443/sap/opu/odata/sap/ZRAKSHITH20_SRV/ReservationHeaderSet?sap-client=690",
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
    res.status(500).json({
      success: false,
      error: error?.response?.data ?? error?.message,
      message: "Failed to transfer materials",
    });
  }
};

exports.getReservation = async (req, res) => {
  const { reservationNumber } = req.params;

  try {
    const response = await axios.get(
      "https://ROMSONS-DEV.romsons.com:8443/sap/opu/odata/sap/ZRAKSHITH20_SRV/ReservationHeaderSet?sap-client=690",
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
    res.status(500).json({
      success: false,
      error: error?.response?.data ?? error?.message,
      message: "Failed to fetch reservation",
    });
  }
};

exports.getReservationList = async (req, res) => {
  const { employeeId, plant, sessionId } = req.params;

  try {
    const response = await axios.get(
      "https://ROMSONS-DEV.romsons.com:8443/sap/opu/odata/sap/ZRAKSHITH20_SRV/ReservationHeaderSet?sap-client=690",
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
    res.status(500).json({
      success: false,
      error: error?.response?.data ?? error?.message,
      message: "Failed to fetch reservation list",
    });
  }
};

exports.getReservationByNumber = async (req, res) => {
  const { employeeId, plant, sessionId, reservationNumber } = req.params;

  try {
    const response = await axios.get(
      "https://ROMSONS-DEV.romsons.com:8443/sap/opu/odata/sap/ZRAKSHITH20_SRV/ReservationHeaderSet?sap-client=690",
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
    res.status(500).json({
      success: false,
      error: error?.response?.data ?? error?.message,
      message: "Failed to fetch reservations",
    });
  }
};

exports.confirmMaterialReceipt = async (req, res) => {
  const body = req.body || {};

  try {
    const response = await axios.post(
      "https://ROMSONS-DEV.romsons.com:8443/sap/opu/odata/sap/ZRAKSHITH20_SRV/prodOrderListSet?sap-client=690",
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
    res.status(500).json({
      success: false,
      error: error?.response?.data ?? error?.message,
      message: "Failed to confirm material receipt",
    });
  }
};

exports.getMaterialIssue = async (req, res) => {
  const { employeeId, plant, sessionId, orderId } = req.params;

  try {
    const response = await axios.get(
      `https://ROMSONS-DEV.romsons.com:8443/sap/opu/odata/sap/ZRAKSHITH20_SRV/prodOrderListSet('${orderId}')?sap-client=690`,
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
    res.status(500).json({
      success: false,
      error: error?.response?.data ?? error?.message,
      message: "Failed to fetch material issue",
    });
  }
};

exports.getProdOrderMatList = async (req, res) => {
  const { employeeId, plant, sessionId, orderId } = req.params;

  try {
    const response = await axios.get(
      `https://ROMSONS-DEV.romsons.com:8443/sap/opu/odata/sap/ZRAKSHITH20_SRV/prodOrderListSet('${orderId}')?sap-client=690`,
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
    res.status(500).json({
      success: false,
      error: error?.response?.data ?? error?.message,
      message: "Failed to fetch production order material list",
    });
  }
};
