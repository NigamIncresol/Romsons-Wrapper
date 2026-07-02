const express = require("express");
const router = express.Router();
const materialsController = require("../controllers/materialsController");

router.get(
  "/prodOrderMatList/:employeeId/:plant/:sessionId/:orderId",
  async (req, res) => {
    console.log(
      "🟢 Get Production Order Material List request received",
      "/materials/prodOrderMatList",
    );
    await materialsController.getProdOrderMatList(req, res);
  },
);

module.exports = router;
