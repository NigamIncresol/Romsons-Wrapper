const axios = require("axios");
const https = require("https");
const dotenv = require("dotenv");

dotenv.config();

exports.getProductionOrders = async (req, res) => {
  const { employeeId, plant, sessionId } = req.params;

  try {
    const response = await axios.get(
      "https://ROMSONS-DEV.romsons.com:8443/sap/opu/odata/sap/ZRAKSHITH20_SRV/prodOrderListSet?sap-client=690",
      {
        params: {
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
      message: "Failed to fetch production order list",
    });
  }
};

exports.getProductionOrder = async (req, res) => {
  const { employeeId, plant, sessionId, orderId } = req.params;

  try {
    const response = await axios.get(
      `https://ROMSONS-DEV.romsons.com:8443/sap/opu/odata/sap/ZRAKSHITH20_SRV/prodOrderListSet('${orderId}')?sap-client=690`,
      {
        params: {
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
      message: "Failed to fetch production order",
    });
  }
};
exports.getProductionOrderFilterValues = async (req, res) => {
  const { employeeId, plant } = req.params;

  try {
    const response = await axios.get(
      "https://ROMSONS-DEV.romsons.com:8443/sap/zprd_details",
      {
        params: {
          plant,
          employee_code: employeeId,
          "sap-client": "690",
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

    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: error?.response?.data ?? error?.message,
      message: "Failed to fetch production order filter values",
    });
  }
};

exports.releaseProdOrder = async (req, res) => {
  const { order, employeeId, sessionId, plant } = req.body || {};

  if (!order || !employeeId || !sessionId || !plant) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: order, employeeId, sessionId, plant",
    });
  }

  try {
    const response = await axios.post(
      "https://ROMSONS-DEV.romsons.com:8443/sap/opu/odata/sap/ZRAKSHITH20_SRV/prodOrderListSet?sap-client=690",
      { order, employeeId, sessionId, plant },
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

    res.json(response.data.d);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: error?.response?.data ?? error?.message,
      message: "Failed to release production order",
    });
  }
};

exports.getProductionOrderSummary = async (req, res) => {
  const { employeeId, plant, sessionId } = req.params;

  try {
    const response = await axios.get(
      "https://ROMSONS-DEV.romsons.com:8443/sap/opu/odata/sap/ZRAKSHITH20_SRV/prodOrderSummaryListSet?sap-client=690",
      {
        params: {
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
      message: "Failed to fetch production order summary",
    });
  }
};
