const axios = require("axios");
const https = require("https");
const dotenv = require("dotenv");

dotenv.config();

const F4_BASE = `${process.env.SAP_BASE_URL}/sap/zrk_f4`;

const buildParams = (query) => {
  const { empid, sesid, plant, search, top, skip, house_id, family, aufnr, rsnum, mjahr } = query;
  const params = { "sap-client": process.env.SAP_CLIENT };
  if (empid)    params.empid    = empid;
  if (sesid)    params.sesid    = sesid;
  if (plant)    params.plant    = plant;
  if (search)   params.search   = search;
  if (top)      params.top      = top;
  if (skip)     params.skip     = skip;
  if (house_id) params.house_id = house_id;
  if (family)   params.family   = family;
  if (aufnr)    params.aufnr    = aufnr;
  if (rsnum)    params.rsnum    = rsnum;
  if (mjahr)    params.mjahr    = mjahr;
  return params;
};

const sapConfig = () => ({
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
});

exports.getBundle = async (req, res) => {
  const { appId } = req.params;
  try {
    const response = await axios.get(`${F4_BASE}/${appId}`, {
      params: buildParams(req.query),
      ...sapConfig(),
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: error?.response?.data ?? error?.message,
      message: error?.response?.data?.message ?? error?.message,
    });
  }
};

exports.getValueHelp = async (req, res) => {
  const { appId, helpId } = req.params;
  try {
    const response = await axios.get(`${F4_BASE}/${appId}/${helpId}`, {
      params: buildParams(req.query),
      ...sapConfig(),
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: error?.response?.data ?? error?.message,
      message: error?.response?.data?.message ?? error?.message,
    });
  }
};



