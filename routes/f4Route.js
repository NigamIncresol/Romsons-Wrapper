const express = require("express");
const router = express.Router();
const f4Controller = require("../controllers/f4Controller");

router.get("/:appId/:helpId", async (req, res) => {
  console.log(`🟢 F4 Value Help request received /${req.params.appId}/${req.params.helpId}`);
  await f4Controller.getValueHelp(req, res);
});

router.get("/:appId", async (req, res) => {
  console.log(`🟢 F4 Bundle request received /${req.params.appId}`);
  await f4Controller.getBundle(req, res);
});

module.exports = router;
