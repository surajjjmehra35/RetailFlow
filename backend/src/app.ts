import express from "express";
import cors from "cors";
import productRoutes from "./modules/products/product.routes";
const app = express();

app.use(cors({ origin: process.env.FRONTEND_ORIGIN ?? "http://localhost:5173" }));
app.use(express.json({ limit: "1mb" }));
app.use("/api/products", productRoutes);
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "RetailFlow API is running",
    timestamp: new Date().toISOString()
  });
});

export default app;
