import express from "express";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

import {
  adminTest,
  trainerTest,
  memberTest,
} from "../controllers/testController.js";

const router = express.Router();

router.get(
  "/admin",
  protect,
  authorize("admin"),
  adminTest
);

router.get(
  "/trainer",
  protect,
  authorize("trainer"),
  trainerTest
);

router.get(
  "/member",
  protect,
  authorize("member"),
  memberTest
);

export default router;