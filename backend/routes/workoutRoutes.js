import express from "express";

import {
  createWorkoutPlan,
  getWorkoutPlans,
  getWorkoutPlanById,
  updateWorkoutPlan,
  deleteWorkoutPlan,
} from "../controllers/workoutController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();


// Create workout plan
router.post(
  "/",
  protect,
  authorize("admin", "trainer"),
  createWorkoutPlan
);


// Get all workout plans
router.get(
  "/",
  protect,
  authorize("admin", "trainer", "member"),
  getWorkoutPlans
);


// Get workout plan by ID
router.get(
  "/:id",
  protect,
  authorize("admin", "trainer", "member"),
  getWorkoutPlanById
);


// Update workout plan
router.put(
  "/:id",
  protect,
  authorize("admin", "trainer"),
  updateWorkoutPlan
);


// Delete workout plan
router.delete(
  "/:id",
  protect,
  authorize("admin", "trainer"),
  deleteWorkoutPlan
);


export default router;