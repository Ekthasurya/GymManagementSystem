import express from "express";

import {
  createDietPlan,
  getDietPlans,
  getDietPlanById,
  updateDietPlan,
  deleteDietPlan,
} from "../controllers/dietController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();


// Create diet plan
router.post(
  "/",
  protect,
  authorize("admin", "trainer"),
  createDietPlan
);


// Get all diet plans
router.get(
  "/",
  protect,
  authorize("admin", "trainer", "member"),
  getDietPlans
);


// Get diet plan by ID
router.get(
  "/:id",
  protect,
  authorize("admin", "trainer", "member"),
  getDietPlanById
);


// Update diet plan
router.put(
  "/:id",
  protect,
  authorize("admin", "trainer"),
  updateDietPlan
);


// Delete diet plan
router.delete(
  "/:id",
  protect,
  authorize("admin", "trainer"),
  deleteDietPlan
);


export default router;