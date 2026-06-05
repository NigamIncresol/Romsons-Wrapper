const axios = require("axios");
const https = require("https");
const dotenv = require("dotenv");

dotenv.config();

exports.loginUser = async (req, res) => {
  const { employeeId, password, plant } = req.body;
  try {
    const response = await axios.post(
      "https://ROMSONS-DEV.romsons.com:8443/sap/opu/odata/sap/ZRAKSHITH20_SRV/AuthSet?sap-client=690",
      {
        employeeId: employeeId,
        password: password,
        plant: plant,
      },
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

    // console.log("Response:", response.data);
    res.json(response.data.d);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).json({
      message: "Login failed",
      error: error.response?.data || error.message,
    });
  }
};

exports.logoutUser = async (req, res) => {
  const { employeeId, sessionId, plant } = req.body;

  try {
    const response = await axios.put(
      "https://ROMSONS-DEV.romsons.com:8443/sap/opu/odata/sap/ZRAKSHITH20_SRV/AuthSet(employeeId='" +
        employeeId +
        "',plant='" +
        plant +
        "')?sap-client=690",
      {
        employeeId: employeeId,
        sessionId: sessionId,
        plant: plant,
      },
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

    // SAP OData usually wraps response in .d
    res.json(response.data?.d || response.data);
  } catch (error) {
    console.error("Logout Error:", error.response?.data || error.message);

    res.status(500).json({
      message: "Logout failed",
      error: error.response?.data || error.message,
    });
  }
};

exports.changePassword = async (req, res) => {
  const { employeeId, oldPassword, newPassword, confirmPassword, plant } =
    req.body;

  try {
    const response = await axios.post(
      "https://ROMSONS-DEV.romsons.com:8443/sap/opu/odata/sap/ZRAKSHITH20_SRV/ChangePasswordSet?sap-client=690",
      {
        employeeId,
        oldPassword,
        newPassword,
        confirmPassword,
        plant,
      },
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

    res.json(response.data?.d || response.data);
  } catch (error) {
    console.error(
      "Change Password Error:",
      error.response?.data || error.message,
    );

    res.status(500).json({
      message: "Change password failed",
      error: error.response?.data || error.message,
    });
  }
};

exports.forgotPasswordOTP = async (req, res) => {
  const { employeeID, Email, plant } = req.body;

  try {
    const response = await axios.post(
      "https://ROMSONS-DEV.romsons.com:8443/sap/opu/odata/sap/ZRAKSHITH20_SRV/ForgotPasswordSet?sap-client=690",
      {
        employeeID,
        Email,
        plant,
      },
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

    res.json(response.data?.d || response.data);
  } catch (error) {
    console.error(
      "Forgot Password Error:",
      error.response?.data || error.message,
    );

    res.status(500).json({
      message: "Failed to send OTP / forgot password request",
      error: error.response?.data || error.message,
    });
  }
};

exports.resetPasswordWithOTP = async (req, res) => {
  const { employeeID, Otp, password, plant } = req.body;

  try {
    const response = await axios.put(
      "https://ROMSONS-DEV.romsons.com:8443/sap/opu/odata/sap/ZRAKSHITH20_SRV/ForgotPasswordSet(employeeID='" +
        employeeID +
        "',plant='" +
        plant +
        "')?sap-client=690",
      {
        employeeID,
        Otp,
        password,
        plant,
      },
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

    res.json(response.data?.d || response.data);
  } catch (error) {
    
    console.error(
      "OTP Reset Password Error:",
      error.response?.data || error.message,
    );

    res.status(500).json({
      message: "OTP verification / password reset failed",
      error: error.response?.data || error.message,
    });
  }
};
