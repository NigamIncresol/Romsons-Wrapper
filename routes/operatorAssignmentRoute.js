const express = require("express");
const router = express.Router();
const operatorAssignmentController = require("../controllers/operatorAssignmentController");

router.get("/getOperationList/:employeeId/:plant/:sessionId/:orderId", async (req, res) => {
  console.log(
    "🟢 Get OperationList request received",
    "/operatorAssignment/getOperationList",
  );
  await operatorAssignmentController.getOperationList(req, res);
});

router.get("/getShiftList/:plant", async (req, res) => {
  console.log(
    "🟢 Get Shift List request received",
    "/operatorAssignment/getShiftList",
  );
  await operatorAssignmentController.getShiftList(req, res);
});

router.get("/getOperatorList/:employeeId/:plant/:sessionId/:houseId/:shiftId", async (req, res) => {
  console.log(
    "🟢 Get Operator List request received",
    "/operatorAssignment/getOperatorList",
  );
  await operatorAssignmentController.getOperatorList(req, res);
});

router.get("/getOperatorAssignmentList/:employeeId/:plant/:sessionId/:order/:shiftId/:shiftDate", async (req, res) => {
  console.log(
    "🟢 Get Operator Assignment List request received",
    "/operatorAssignment/getOperatorAssignmentList",
  );
  await operatorAssignmentController.getOperatorAssignmentList(req, res);
});

router.put("/updateOperatorAssignment", async (req, res) => {
  console.log(
    "🟢 Update Operator Assignment request received",
    "/operatorAssignment/updateOperatorAssignment",
  );
  await operatorAssignmentController.updateOperatorAssignment(req, res);
});

router.post("/assignOperator", async (req, res) => {
  console.log(
    "🟢 Assign Operator request received",
    "/operatorAssignment/assignOperator",
  );
  await operatorAssignmentController.assignOperator(req, res);
});

module.exports = router;
