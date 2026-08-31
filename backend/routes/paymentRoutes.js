import express from "express";

import {
  createPayment,
  getPayments,
  getPaymentById,
  getMemberPayments,
  updatePayment,
  deletePayment,
} from "../controllers/paymentController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

// ========================================
// PAYMENT MANAGEMENT
// ========================================

// Record payment
router.post(
  "/",
  protect,
  authorize("admin"),
  createPayment
);

// Get all payments
router.get(
  "/",
  protect,
  authorize("admin"),
  getPayments
);

// Get member payment history
router.get(
  "/member/:memberId",
  protect,
  authorize("admin", "trainer", "member"),
  getMemberPayments
);

// Get payment by ID
router.get(
  "/:id",
  protect,
  authorize("admin"),
  getPaymentById
);

// Update payment
router.put(
  "/:id",
  protect,
  authorize("admin"),
  updatePayment
);

// Delete payment
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deletePayment
);

export default router;