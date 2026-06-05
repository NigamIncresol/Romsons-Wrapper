const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoute");
const statusRoutes = require("./routes/statusRoute");
const productionOrderRoutes=require("./routes/productionOrderRoute");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Custom Routes
app.use("/status",statusRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/productionOrder", productionOrderRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
