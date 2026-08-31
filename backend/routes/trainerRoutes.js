import express from "express";

import {
  createTrainer,
  getTrainers,
  getTrainerById,
  updateTrainer,
  deleteTrainer,
  assignTrainer,
  removeTrainer,
} from "../controllers/trainerController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

// Create trainer
router.post(
  "/",
  protect,
  authorize("admin"),
  createTrainer
);

// Get trainers
router.get(
  "/",
  protect,
  authorize("admin", "trainer"),
  getTrainers
);

// Assign trainer to member
router.post(
  "/assign",
  protect,
  authorize("admin"),
  assignTrainer
);

// Remove trainer from member
router.put(
  "/remove/:memberId",
  protect,
  authorize("admin"),
  removeTrainer
);

// Get trainer
router.get(
  "/:id",
  protect,
  authorize("admin", "trainer"),
  getTrainerById
);

// Update trainer
router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateTrainer
);

// Delete trainer
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteTrainer
);

export default router;