const axios = require("axios");
const https = require("https");
const dotenv = require("dotenv");

dotenv.config();

exports.getOperationList = async (req, res) => {
  const { Aufnr } = req.params;

  try {
    const response = await axios.get(
      "https://ROMSONS-DEV.romsons.com:8443/sap/opu/odata/sap/ZRAKSHITH20_SRV/OperationSet?sap-client=690",
      {
        params: {
          $filter: `Aufnr eq '${Aufnr}'`,
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
      message: "Failed to fetch operation list",
    });
  }
};

exports.getOperatorList = async (req, res) => {
  const { Werks, HouseId, ShiftId } = req.params;

  try {
    const response = await axios.get(
      "https://ROMSONS-DEV.romsons.com:8443/sap/opu/odata/sap/ZRAKSHITH20_SRV/OperatorSet?sap-client=690",
      {
        params: {
          $filter: `Werks eq '${Werks}' and HouseId eq '${HouseId}' and ShiftId eq '${ShiftId}'`,
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
      message: "Failed to fetch operation list",
    });
  }
};
