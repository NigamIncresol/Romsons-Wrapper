const axios = require("axios");
const https = require("https");
const dotenv = require("dotenv");

dotenv.config();

exports.getOperationList = async (req, res) => {
  const { orderId, employeeId, plant, sessionId } = req.params;

  try {
    const response = await axios.get(
      "https://ROMSONS-DEV.romsons.com:8443/sap/opu/odata/sap/ZRAKSHITH20_SRV/OperationSet?sap-client=690",
      {
        params: {
          $filter: `order eq '${orderId}' and employeeId eq '${employeeId}' and plant eq '${plant}' and sessioId eq '${sessionId}'`,
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
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      error: error?.response?.data ?? error?.message,
      message: "Failed to fetch operation list",
    });
  }
};

exports.getOperatorList = async (req, res) => {
  const { plant, houseId, shiftId, employeeId, sessionId } = req.params;

  try {
    const response = await axios.get(
      "https://ROMSONS-DEV.romsons.com:8443/sap/opu/odata/sap/ZRAKSHITH20_SRV/OperatorSet?sap-client=690",
      {
        params: {
          $filter: `plant eq '${plant}' and houseId eq '${houseId}' and shiftId eq '${shiftId}' and employeeId eq '${employeeId}' and sessionId eq '${sessionId}'`,
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
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      error: error?.response?.data ?? error?.message,
      message: "Failed to fetch operator list",
    });
  }
};

exports.getShiftList = async (req, res) => {
  const { plant } = req.params;

  try {
    const response = await axios.get(
      "https://ROMSONS-DEV.romsons.com:8443/sap/opu/odata/sap/ZRAKSHITH20_SRV/shiftSet?sap-client=690",
      {
        params: {
          $filter: `plant eq '${plant}'`,
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
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      error: error?.response?.data ?? error?.message,
      message: "Failed to fetch shift list",
    });
  }
};

exports.getOperatorAssignmentList = async (req, res) => {
  const { order, shiftId, shiftDate, employeeId, plant, sessionId } =
    req.params;

  try {
    const response = await axios.get(
      "https://ROMSONS-DEV.romsons.com:8443/sap/opu/odata/sap/ZRAKSHITH20_SRV/OperatorAssignmentSet?sap-client=690",
      {
        params: {
          $filter: `order eq '${order}' and shiftId eq '${shiftId}' and shiftDate eq datetime'${shiftDate}' and employeeId eq '${employeeId}' and plant eq '${plant}' and sessionId eq '${sessionId}'`,
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
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      error: error?.response?.data ?? error?.message,
      message: "Failed to fetch operator assignment list",
    });
  }
};

exports.updateOperatorAssignment = async (req, res) => {
  const {
    order,
    shiftId,
    employeeId,
    operation,
    plannedHrs,
    freeHrs,
    targetQty,
    shiftDate,
    sessionId,
    plant,
  } = req.body || {};

  if (!order || !shiftId || !employeeId || !operation) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: order, shiftId, employeeId, operation",
    });
  }

  try {
    await axios.put(
      `https://ROMSONS-DEV.romsons.com:8443/sap/opu/odata/sap/ZRAKSHITH20_SRV/OperatorAssignmentSet(order='${order}',operation='${operation}',shiftId='${shiftId}',employeeId='${employeeId}')?sap-client=690`,
      {
        order,
        shiftId,
        employeeId,
        operation,
        plannedHrs,
        freeHrs,
        shiftDate,
        targetQty,
        sessionId,
        plant,
      },
      {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Requested-With": "X",
          "sap-language": "EN",
        },
        auth: {
          username: process.env.SAP_USER,
          password: process.env.SAP_PASS,
        },
      },
    );

    return res.status(204).send();
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      error: error?.response?.data ?? error?.message,
      message: "Failed to update operator assignment",
    });
  }
};

exports.assignOperator = async (req, res) => {
  const {
    order,
    plant,
    shiftDate,
    sessionId,
    operation,
    shiftId,
    status,
    employeeId,
    houseId,
    plannedHrs,
    freeHrs,
    targetQty,
    unit,
  } = req.body || {};

  // Basic validation: fail fast if required fields are missing
  if (!order || !shiftId || !employeeId || !operation) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: order, shiftId, employeeId, operation",
    });
  }

  try {
    const response = await axios.post(
      "https://ROMSONS-DEV.romsons.com:8443/sap/opu/odata/sap/ZRAKSHITH20_SRV/OperatorAssignmentSet?sap-client=690",
      {
        order,
        plant,
        shiftDate,
        sessionId,
        operation,
        shiftId,
        status,
        employeeId,
        houseId,
        plannedHrs,
        freeHrs,
        targetQty,
        unit,
      },
      {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Requested-With": "X",
          "sap-language": "EN",
        },
        auth: {
          username: process.env.SAP_USER,
          password: process.env.SAP_PASS,
        },
      },
    );

    // SAP OData typically wraps result in response.data.d, but keep fallback
    return res.status(200).json(response.data?.d ?? response.data);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      error: error?.response?.data ?? error?.message,
      message: "Failed to assign operator",
    });
  }
};
