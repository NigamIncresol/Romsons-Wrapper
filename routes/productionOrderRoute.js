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

router.get(
  "/getProductionOrderFilterValues/:employeeId/:plant",
  async (req, res) => {
    console.log(
      "🟢 Get Production Order Filter Values request received",
      "/productionOrder/getProductionOrderFilterValues",
    );
    await productionOrderController.getProductionOrderFilterValues(req, res);
  },
);

router.get("/printJobCard/:order/:shiftId/:shiftDate", async (req, res) => {
  console.log(
    "🟢 Print Job Card request received",
    "/productionOrder/printJobCard",
  );
  await productionOrderController.printJobCard(req, res);
});

router.post("/releaseProdOrder", async (req, res) => {
  console.log(
    "🟢 Release Production Order request received",
    "/productionOrder/releaseProdOrder",
  );
  await productionOrderController.releaseProdOrder(req, res);
});

module.exports = router;
