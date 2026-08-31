import express from "express";

import {
  scanAttendance,
  getTodayAttendance,
  getAttendance,
  getMemberAttendance,
} from "../controllers/attendanceController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();


// Scan QR
router.post(
  "/scan",
  protect,
  authorize("admin", "member"),
  scanAttendance
);


// Today's Attendance
router.get(
  "/today",
  protect,
  authorize("admin", "trainer"),
  getTodayAttendance
);


// All Attendance
router.get(
  "/",
  protect,
  authorize("admin", "trainer"),
  getAttendance
);


// Member Attendance
router.get(
  "/member/:memberId",
  protect,
  authorize("admin", "trainer", "member"),
  getMemberAttendance
);


export default router;