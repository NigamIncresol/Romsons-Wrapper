const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

router.get("/operatorperformance", async (req, res) => {
  console.log("🟢 Get Operator Performance request received", "/report/operatorperformance");
  await reportController.getOperatorPerformance(req, res);
});

router.get("/stockreport", async (req, res) => {
  console.log("🟢 Get Planned Data request received", "/report/stockreport");
  await reportController.getPlannedData(req, res);
});

module.exports = router;
