import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";
import trainerRoutes from "./routes/trainerRoutes.js";
import membershipRoutes from "./routes/membershipRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import workoutRoutes from "./routes/workoutRoutes.js";
import dietRoutes from "./routes/dietRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";


dotenv.config();

const app = express();

connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/trainers", trainerRoutes);
app.use("/api/memberships",membershipRoutes);
app.use("/api/payments",paymentRoutes);
app.use("/api/attendance",attendanceRoutes);
app.use("/api/workouts",workoutRoutes);
app.use("/api/diets",dietRoutes);
app.use("/api/progress",progressRoutes);
app.use("/api/dashboard",dashboardRoutes);



// Test
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Gym Management API is running ",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend Server running on port ${PORT}`);
});