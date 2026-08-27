const axios = require("axios");
const https = require("https");
const dotenv = require("dotenv");

dotenv.config();

exports.getEmployeeInfo = async (req, res) => {
  const { employeeId } = req.params;

  try {
    const response = await axios.get(
      `https://ROMSONS-DEV.romsons.com:8443/sap/opu/odata/sap/ZRAKSHITH20_SRV/EmpDataSet('${employeeId}')?sap-client=690`,
      {
        params: { $format: "json" },
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
    res.status(500).json({
      success: false,
      error: error?.response?.data ?? error?.message,
      message: "Failed to fetch employee info",
    });
  }
};
