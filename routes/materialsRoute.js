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

router.post("/transferMaterials", async (req, res) => {
  console.log(
    "🟢 Transfer Materials request received",
    "/materials/transferMaterials",
  );
  await materialsController.transferMaterials(req, res);
});

router.get("/getSingleReservation/:reservationNumber", async (req, res) => {
  console.log(
    "🟢 Get Single Reservation request received",
    "/materials/getSingleReservation",
  );
  await materialsController.getReservation(req, res);
});

router.get(
  "/getReservationList/:employeeId/:plant/:sessionId",
  async (req, res) => {
    console.log(
      "🟢 Get Reservation List request received",
      "/materials/getReservationList",
    );
    await materialsController.getReservationList(req, res);
  },
);

router.get(
  "/getReservationByNumber/:employeeId/:plant/:sessionId/:reservationNumber",
  async (req, res) => {
    console.log(
      "🟢 Get Reservations By Reservation Number request received",
      "/materials/getReservations",
    );
    await materialsController.getReservationByNumber(req, res);
  },
);

router.get("/printMaterialReceiptSlip/:materialDoc/:materialDocYear", async (req, res) => {
  console.log("🟢 Print Material Receipt Slip request received", "/materials/printMaterialReceiptSlip");
  await materialsController.printMaterialReceiptSlip(req, res);
});

router.get("/printMaterialIssueSlip/:materialDoc/:materialDocYear", async (req, res) => {
  console.log("🟢 Print Material Issue Slip request received", "/materials/printMaterialIssueSlip");
  await materialsController.printMaterialIssueSlip(req, res);
});

router.get("/printReservationSlip/:reservationNumber", async (req, res) => {
  console.log("🟢 Print Reservation Slip request received", "/materials/printReservationSlip");
  await materialsController.printReservationSlip(req, res);
});

router.get("/getConfirmationList/:employeeId/:plant/:sessionId", async (req, res) => {
  console.log(
    "🟢 Get Confirmation List request received",
    "/materials/getConfirmationList",
  );
  await materialsController.getConfirmationList(req, res);
});

router.get("/getSingleIssueDetailsByMatDocAndYear/:materialDoc/:materialDocYear", async (req, res) => {
  console.log(
    "🟢 Get Single Issue Details By Mat Doc And Year request received",
    "/materials/getSingleIssueDetailsByMatDocAndYear",
  );
  await materialsController.getSingleIssueDetailsByMatDocAndYear(req, res);
});

router.get("/getIssueList/:employeeId/:plant/:sessionId", async (req, res) => {
  console.log(
    "🟢 Get Issue List request received",
    "/materials/getIssueList",
  );
  await materialsController.getIssueList(req, res);
});

router.post("/confirmMaterialReceipt", async (req, res) => {
  console.log(
    "🟢 Confirm Material Receipt request received",
    "/materials/confirmMaterialReceipt",
  );
  await materialsController.confirmMaterialReceipt(req, res);
});

router.get(
  "/getMaterialIssue/:employeeId/:plant/:sessionId/:orderId",
  async (req, res) => {
    console.log(
      "🟢 Get Material Issue request received",
      "/materials/getMaterialIssue",
    );
    await materialsController.getMaterialIssue(req, res);
  },
);

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
