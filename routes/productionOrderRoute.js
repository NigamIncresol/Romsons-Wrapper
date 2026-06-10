const express = require("express");
const router = express.Router();
const productionOrderController = require("../controllers/productionOrderController");

router.get(
  "/getProductionOrders/:employeeId/:plant/:sessionId",
  async (req, res) => {
    console.log(
      "🟢 Get Production Orders request received",
      "/productionOrder/getProductionOrders",
    );

    await productionOrderController.getProductionOrders(req, res);
  },
);

router.get(
  "/getProductionOrder/:employeeId/:plant/:sessionId/:orderId",
  async (req, res) => {
    console.log(
      "🟢 Get Production Order request received",
      "/productionOrder/getProductionOrder",
    );

    await productionOrderController.getProductionOrder(req, res);
  },
);

router.get(
  "/getProductionOrderSummary/:employeeId/:plant/:sessionId",
  async (req, res) => {
    console.log(
      "🟢 Get Production Order Summary request received",
      "/productionOrder/getProductionOrderSummary",
    );
    await productionOrderController.getProductionOrderSummary(req, res);
  },
);

module.exports = router;
