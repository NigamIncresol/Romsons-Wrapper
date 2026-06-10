const express = require("express");
const router = express.Router();
const operatorAssignmentController = require("../controllers/operatorAssignmentController");

router.get("/getOperationList/:orderId", async (req, res) => {
  console.log(
    "🟢 Get OperationList request received",
    "/operatorAssignment/getOperationList",
  );
  await operatorAssignmentController.getOperationList(req, res);
});

router.get("/getOperatorList/:plant/:houseId/:shiftId", async (req, res) => {
  console.log(
    "🟢 Get Operator List request received",
    "/operatorAssignment/getOperatorList",
  );
  await operatorAssignmentController.getOperatorList(req, res);
});

router.post("/assignOperator", async (req, res) => {
  console.log(
    "🟢 Assign Operator request received",
    "/operatorAssignment/assignOperator",
  );
  await operatorAssignmentController.assignOperator(req, res);
});

module.exports = router;
