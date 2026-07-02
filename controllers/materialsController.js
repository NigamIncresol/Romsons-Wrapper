const axios = require("axios");
const https = require("https");
const dotenv = require("dotenv");

dotenv.config();

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
