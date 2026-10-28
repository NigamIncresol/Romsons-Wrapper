const axios = require("axios");
const https = require("https");
const dotenv = require("dotenv");

dotenv.config();


exports.bulkOperatorAssign = async (req, res) => {
  const body = req.body || {};

  try {
    const response = await axios.post(
      `${process.env.SAP_BASE_URL}/sap/opu/odata/sap/ZRAKSHITH20_SRV/JobCardListSet?sap-client=${process.env.SAP_CLIENT}`,
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

exports.submitOrderForGRN = async (req, res) => {
  const body = req.body || {};

  try {
    const response = await axios.post(
      `${process.env.SAP_BASE_URL}/sap/opu/odata/sap/ZRAKSHITH20_SRV/JobCardListSet?sap-client=${process.env.SAP_CLIENT}`,
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

exports.getProdOrderConfirmList = async (req, res) => {
  const { jobCardNo, plant, sessionId, employeeId } = req.params;

  try {
    const response = await axios.get(
      `${process.env.SAP_BASE_URL}/sap/opu/odata/sap/ZRAKSHITH20_SRV/JobCardListSet?sap-client=${process.env.SAP_CLIENT}`,
      {
        params: {
          $filter: `jobCardNo eq '${jobCardNo}' and plant eq '${plant}' and sessionId eq '${sessionId}' and employeeId eq '${employeeId}'`,
          $expand: "npToConfirmation/npToItem",
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

exports.submitOrderConfirmation = async (req, res) => {
  const body = req.body || {};

  try {
    const response = await axios.post(
      `${process.env.SAP_BASE_URL}/sap/opu/odata/sap/ZRAKSHITH20_SRV/prodOrderListSet?sap-client=${process.env.SAP_CLIENT}`,
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

exports.getActivityDetails = async (req, res) => {
  const {
    order,
    operation,
    yield: yieldVal,
    plant,
    sessionId,
    employeeId,
  } = req.params;

  try {
    const response = await axios.get(
      `${process.env.SAP_BASE_URL}/sap/opu/odata/sap/ZRAKSHITH20_SRV/ProductionActivitySet?sap-client=${process.env.SAP_CLIENT}`,
      {
        params: {
          $filter: `order eq '${order}' and operation eq '${operation}' and yield eq ${yieldVal} and plant eq '${plant}' and sessionId eq '${sessionId}' and employeeId eq '${employeeId}'`,
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

exports.getComponentBatchDetails = async (req, res) => {
  const {
    order,
    operation,
    material,
    itemNo,
    yield: yieldVal,
    plant,
    sessionId,
    employeeId,
  } = req.params;

  try {
    const response = await axios.get(
      `${process.env.SAP_BASE_URL}/sap/opu/odata/sap/ZRAKSHITH20_SRV/ComponentBatchSet?sap-client=${process.env.SAP_CLIENT}`,
      {
        params: {
          $filter: `order eq '${order}' and operation eq '${operation}' and material eq '${material}' and itemNo eq '${itemNo}' and yield eq ${yieldVal} and plant eq '${plant}' and sessionId eq '${sessionId}' and employeeId eq '${employeeId}'`,
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

exports.getConsumptionDetails = async (req, res) => {
  const {
    order,
    operation,
    yield: yieldVal,
    plant,
    sessionId,
    employeeId,
  } = req.params;

  try {
    const response = await axios.get(
      `${process.env.SAP_BASE_URL}/sap/opu/odata/sap/ZRAKSHITH20_SRV/ComponentConsumpSet?sap-client=${process.env.SAP_CLIENT}`,
      {
        params: {
          $filter: `order eq '${order}' and operation eq '${operation}' and yield eq ${yieldVal} and plant eq '${plant}' and sessionId eq '${sessionId}' and employeeId eq '${employeeId}'`,
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

exports.getJobCardDetails = async (req, res) => {
  const { jobCardNo, plant, sessionId, employeeId } = req.params;

  try {
    const response = await axios.get(
      `${process.env.SAP_BASE_URL}/sap/opu/odata/sap/ZRAKSHITH20_SRV/JobCardListSet?sap-client=${process.env.SAP_CLIENT}`,
      {
        params: {
          $filter: `jobCardNo eq '${jobCardNo}' and plant eq '${plant}' and sessionId eq '${sessionId}' and employeeId eq '${employeeId}'`,
          $expand: "npToItem/npToAssignment",
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

exports.getOrderDetails = async (req, res) => {
  const { order, plant, sessionId, employeeId } = req.params;

  try {
    const response = await axios.get(
      `${process.env.SAP_BASE_URL}/sap/opu/odata/sap/ZRAKSHITH20_SRV/prodOrderListSet?sap-client=${process.env.SAP_CLIENT}`,
      {
        params: {
          $filter: `order eq '${order}' and plant eq '${plant}' and sessionId eq '${sessionId}' and employeeId eq '${employeeId}'`,
          $expand: "npToOperation/npToComponent",
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




