const axios = require("axios");
const https = require("https");
const dotenv = require("dotenv");

dotenv.config();

exports.getOperatorPerformance = async (req, res) => {
  const { plant, fromDate, toDate, order, employeeId, sessionId } = req.query;

  if (!plant || !employeeId || !sessionId) {
    return res.status(400).json({
      success: false,
      message: "Missing required query params: plant, employeeId and sessionId are mandatory",
    });
  }

  const hasDateRange = fromDate && toDate;
  const hasOrder = !!order;

  if (!hasDateRange && !hasOrder) {
    return res.status(400).json({
      success: false,
      message: "At least one of date range (fromDate + toDate) or order must be provided",
    });
  }

  if ((fromDate && !toDate) || (!fromDate && toDate)) {
    return res.status(400).json({
      success: false,
      message: "Both fromDate and toDate must be provided together",
    });
  }

  let filter = `Werks eq '${plant}'`;
  if (hasDateRange) {
    filter += ` and ( ShiftDate ge datetime'${fromDate}' and ShiftDate le datetime'${toDate}' )`;
  }
  if (hasOrder) {
    filter += ` and Aufnr eq '${order}'`;
  }
  filter += ` and UserEmpid eq '${employeeId}' and Sesid eq '${sessionId}'`;

  try {
    const response = await axios.get(
      `${process.env.SAP_BASE_URL}/sap/opu/odata/sap/ZRAKSHITH20_SRV/OperPerfSet?sap-client=${process.env.SAP_CLIENT}`,
      {
        params: {
          $filter: filter,
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

exports.getPlannedData = async (req, res) => {
  const { plant, mrpController, materialCode, materialType, houseId, department, family, employeeId, sessionId, top = 50, skip = 0 } = req.query;

  if (!plant || !mrpController || !employeeId || !sessionId) {
    return res.status(400).json({
      success: false,
      message: "Missing required query params: plant, mrpController, employeeId and sessionId are mandatory",
    });
  }

  let filter = `plant eq '${plant}' and mrpController eq '${mrpController}' and employeeId eq '${employeeId}' and sessionId eq '${sessionId}'`;
  if (materialCode) filter += ` and materialCode eq '${materialCode}'`;
  if (materialType) filter += ` and materialType eq '${materialType}'`;
  if (houseId)      filter += ` and houseId eq '${houseId}'`;
  if (department)   filter += ` and department eq '${department}'`;
  if (family)       filter += ` and family eq '${family}'`;

  try {
    const response = await axios.get(
      `${process.env.SAP_BASE_URL}/sap/opu/odata/SAP/ZRAKSHITH20_SRV/PlannedDataSet?sap-client=${process.env.SAP_CLIENT}`,
      {
        params: {
          $filter: filter,
          $format: "json",
          $top: top,
          $skip: skip,
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



