const express = require("express");
const router = express.Router();
const employeeInfoController = require("../controllers/employeeInfoController");

router.get("/:employeeId", async (req, res) => {
  console.log(
    "🟢 Get Employee Info request received",
    "/employeeinfo",
  );
  await employeeInfoController.getEmployeeInfo(req, res);
});

module.exports = router;
