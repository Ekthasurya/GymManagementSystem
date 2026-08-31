import express from "express";

import {
  createPlan,
  getPlans,
  getPlanById,
  updatePlan,
  deletePlan,
  assignMembership,
  getMemberMembership,
  renewMembership,
} from "../controllers/membershipController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

// ========================================
// MEMBERSHIP PLANS
// ========================================

router.post(
  "/plans",
  protect,
  authorize("admin"),
  createPlan
);

router.get(
  "/plans",
  protect,
  authorize("admin", "trainer", "member"),
  getPlans
);

router.get(
  "/plans/:id",
  protect,
  authorize("admin", "trainer", "member"),
  getPlanById
);

router.put(
  "/plans/:id",
  protect,
  authorize("admin"),
  updatePlan
);

router.delete(
  "/plans/:id",
  protect,
  authorize("admin"),
  deletePlan
);

// ========================================
// MEMBER MEMBERSHIP
// ========================================

router.post(
  "/assign",
  protect,
  authorize("admin"),
  assignMembership
);

router.get(
  "/member/:memberId",
  protect,
  authorize("admin", "trainer", "member"),
  getMemberMembership
);

router.post(
  "/renew",
  protect,
  authorize("admin"),
  renewMembership
);

export default router;