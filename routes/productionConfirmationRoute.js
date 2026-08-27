const express = require("express");
const router = express.Router();
const productionConfirmationController = require("../controllers/productionConfirmationController");

router.post("/submitorderforgrn", async (req, res) => {
  console.log(
    "🟢 Submit Order For GRN request received",
    "/productionconfirmation/submitorderforgrn",
  );
  await productionConfirmationController.submitOrderForGRN(req, res);
});

router.get(
  "/prodorderconfirmlist/:jobCardNo/:plant/:sessionId/:employeeId",
  async (req, res) => {
    console.log(
      "🟢 Get Prod Order Confirm List request received",
      "/productionconfirmation/prodorderconfirmlist",
    );
    await productionConfirmationController.getProdOrderConfirmList(req, res);
  },
);

router.post("/submitorderconfirmation", async (req, res) => {
  console.log(
    "🟢 Submit Order Confirmation request received",
    "/productionconfirmation/submitorderconfirmation",
  );
  await productionConfirmationController.submitOrderConfirmation(req, res);
});

router.get(
  "/activitydetails/:order/:operation/:yield/:plant/:sessionId/:employeeId",
  async (req, res) => {
    console.log(
      "🟢 Get Activity Details request received",
      "/productionconfirmation/activitydetails",
    );
    await productionConfirmationController.getActivityDetails(req, res);
  },
);

router.get(
  "/componentbatchdetails/:order/:operation/:material/:itemNo/:yield/:plant/:sessionId/:employeeId",
  async (req, res) => {
    console.log(
      "🟢 Get Component Batch Details request received",
      "/productionconfirmation/componentbatchdetails",
    );
    await productionConfirmationController.getComponentBatchDetails(req, res);
  },
);

router.get(
  "/consumptiondetails/:order/:operation/:yield/:plant/:sessionId/:employeeId",
  async (req, res) => {
    console.log(
      "🟢 Get Consumption Details request received",
      "/productionconfirmation/consumptiondetails",
    );
    await productionConfirmationController.getConsumptionDetails(req, res);
  },
);

router.get(
  "/jobcarddetails/:jobCardNo/:plant/:sessionId/:employeeId",
  async (req, res) => {
    console.log(
      "🟢 Get Job Card Details request received",
      "/productionconfirmation/jobcarddetails",
    );
    await productionConfirmationController.getJobCardDetails(req, res);
  },
);

router.get(
  "/orderdetails/:order/:plant/:sessionId/:employeeId",
  async (req, res) => {
    console.log(
      "🟢 Get Order Details request received",
      "/productionconfirmation/orderdetails",
    );
    await productionConfirmationController.getOrderDetails(req, res);
  },
);

module.exports = router;
