const express = require("express");
const router = express.Router();
const materialsController = require("../controllers/materialsController");

router.post("/requestMaterials", async (req, res) => {
  console.log(
    "🟢 Request Materials request received",
    "/materials/requestMaterials",
  );
  await materialsController.requestMaterials(req, res);
});

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
