const express = require("express");
const router = express.Router();
const operatorAssignmentController = require("../controllers/operatorAssignmentController");

router.get("/getOperationList/:Aufnr", async (req, res) => {
  console.log(
    "🟢 Get OperationList request received",
    "/operatorAssignment/getOperationList",
  );
  await operatorAssignmentController.getOperationList(req, res);
});

router.get("/getOperatorList/:Werks/:HouseId/:ShiftId", async (req, res) => {
  console.log(
    "🟢 Get Operator List request received",
    "/operatorAssignment/getOperatorList",
  );
  await operatorAssignmentController.getOperatorList(req, res);
});

module.exports = router;
