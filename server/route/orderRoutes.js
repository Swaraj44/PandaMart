// routes/orderRoutes.js
import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// GET orders of a specific customer
router.get("/:customerId", async (req, res) => {
  const customerId = req.params.customerId;

  try {
    const orders = await Order.find({ customerId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
