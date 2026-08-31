import express from "express";

import {
  createMember,
  getMembers,
  getMemberById,
  updateMember,
  deleteMember,
} from "../controllers/memberController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

// Admin only
router.post(
  "/",
  protect,
  authorize("admin"),
  createMember
);

router.get(
  "/",
  protect,
  authorize("admin", "trainer"),
  getMembers
);

router.get(
  "/:id",
  protect,
  authorize("admin", "trainer"),
  getMemberById
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateMember
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteMember
);

export default router;