import express from "express";

import {
  getDashboardStats,
  getMonthlyRevenue,
  getMonthlyAttendance,
  getExpiringMemberships,
  getRecentMembers,
  getRecentPayments,
} from "../controllers/dashboardController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();


// ========================================
// DASHBOARD OVERVIEW
// ========================================

router.get(
  "/stats",
  protect,
  authorize("admin"),
  getDashboardStats
);


// ========================================
// MONTHLY REVENUE
// ========================================

router.get(
  "/revenue",
  protect,
  authorize("admin"),
  getMonthlyRevenue
);


// ========================================
// MONTHLY ATTENDANCE
// ========================================

router.get(
  "/attendance",
  protect,
  authorize("admin"),
  getMonthlyAttendance
);


// ========================================
// EXPIRING MEMBERSHIPS
// ========================================

router.get(
  "/expiring-memberships",
  protect,
  authorize("admin"),
  getExpiringMemberships
);


// ========================================
// RECENT MEMBERS
// ========================================

router.get(
  "/recent-members",
  protect,
  authorize("admin"),
  getRecentMembers
);


// ========================================
// RECENT PAYMENTS
// ========================================

router.get(
  "/recent-payments",
  protect,
  authorize("admin"),
  getRecentPayments
);


export default router;