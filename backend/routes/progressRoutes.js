import express from "express";

import {
  createProgress,
  getProgress,
  getMemberProgress,
  getProgressById,
  updateProgress,
  deleteProgress,
} from "../controllers/progressController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();


// ========================================
// CREATE
// ========================================

router.post(
  "/",
  protect,
  authorize("admin", "trainer"),
  createProgress
);


// ========================================
// GET ALL
// ========================================

router.get(
  "/",
  protect,
  authorize("admin", "trainer"),
  getProgress
);


// ========================================
// MEMBER PROGRESS
// IMPORTANT: keep this before /:id
// ========================================

router.get(
  "/member/:memberId",
  protect,
  authorize("admin", "trainer", "member"),
  getMemberProgress
);


// ========================================
// GET BY ID
// ========================================

router.get(
  "/:id",
  protect,
  authorize("admin", "trainer", "member"),
  getProgressById
);


// ========================================
// UPDATE
// ========================================

router.put(
  "/:id",
  protect,
  authorize("admin", "trainer"),
  updateProgress
);


// ========================================
// DELETE
// ========================================

router.delete(
  "/:id",
  protect,
  authorize("admin", "trainer"),
  deleteProgress
);


export default router;