import { Routes, Route } from "react-router-dom";

// Common
import ProtectedRoute from "../components/common/ProtectedRoute";
import RoleRoute from "../components/common/RoleRoute";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

// Admin
import AdminDashboard from "../pages/admin/Dashboard";
import Members from "../pages/admin/members/Members";
import AddMember from "../pages/admin/members/AddMember";
import EditMember from "../pages/admin/members/EditMember";
import MemberDetails from "../pages/admin/members/MemberDetails";

import Trainers from "../pages/admin/trainers/Trainers";
import AddTrainer from "../pages/admin/trainers/AddTrainer";
import EditTrainer from "../pages/admin/trainers/EditTrainer";
import TrainerDetails from "../pages/admin/trainers/TrainerDetails";

import MembershipPlans from "../pages/admin/memberships/MembershipPlans";
import AddPlan from "../pages/admin/memberships/AddPlan";
import EditPlan from "../pages/admin/memberships/EditPlan";
import AssignMembership from "../pages/admin/memberships/AssignMembership";

import Attendance from "../pages/admin/attendance/Attendance";

import Payments from "../pages/admin/payments/Payments";
import PaymentDetails from "../pages/admin/payments/PaymentDetails";

import Reports from "../pages/admin/reports/Reports";

// Trainer
import Workouts from "../pages/trainer/Workouts";
import CreateWorkout from "../pages/trainer/CreateWorkout";
import DietPlans from "../pages/trainer/DietPlans";
import CreateDietPlan from "../pages/trainer/CreateDietPlan";
import TrainerProgress from "../pages/trainer/Progress";
import TrainerDashboard from "../pages/trainer/Dashboard";

// Member
import Membership from "../pages/admin/members/Membership";
import MemberPayments from "../pages/admin/members/Payments";
import MemberDashboard from "../pages/member/Dashboard";
import MemberAttendance from "../pages/member/Attendance";
import MemberWorkout from "../pages/member/Workout";
import MemberDiet from "../pages/member/Diet";
import MemberProgress from "../pages/member/Progress";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ================= AUTH ================= */}

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* ================= ADMIN ================= */}

      <Route path="/admin/dashboard" element={<AdminDashboard />} />

      {/* Members */}
      <Route
        path="/admin/members"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["admin"]}>
              <Members />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route path="/member/dashboard" element={<MemberDashboard />} />

      <Route
        path="/admin/members/add"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["admin"]}>
              <AddMember />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/members/:id/edit"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["admin"]}>
              <EditMember />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/members/:id"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["admin"]}>
              <MemberDetails />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      {/* Trainers */}
      <Route
        path="/admin/trainers"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["admin"]}>
              <Trainers />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/trainers/add"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["admin"]}>
              <AddTrainer />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/trainers/:id/edit"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["admin"]}>
              <EditTrainer />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/trainers/:id"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["admin"]}>
              <TrainerDetails />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      {/* Membership */}
      <Route
        path="/admin/memberships"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["admin"]}>
              <MembershipPlans />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/memberships/add"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["admin"]}>
              <AddPlan />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/memberships/:id/edit"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["admin"]}>
              <EditPlan />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/memberships/assign"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["admin"]}>
              <AssignMembership />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      {/* Attendance */}
      <Route
        path="/admin/attendance"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["admin"]}>
              <Attendance />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      {/* Payments */}
      <Route
        path="/admin/payments"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["admin"]}>
              <Payments />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/payments/:id"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["admin"]}>
              <PaymentDetails />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      {/* Reports */}
      <Route
        path="/admin/reports"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["admin"]}>
              <Reports />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      {/* ================= TRAINER ================= */}

      <Route path="/trainer/dashboard" element={<TrainerDashboard />} />

      <Route
        path="/trainer/workouts"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["trainer"]}>
              <Workouts />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/trainer/workouts/create"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["trainer"]}>
              <CreateWorkout />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/trainer/diet-plans"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["trainer"]}>
              <DietPlans />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/trainer/diet-plans/create"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["trainer"]}>
              <CreateDietPlan />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/trainer/progress"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["trainer"]}>
              <TrainerProgress />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      {/* ================= MEMBER ================= */}

      <Route
        path="/member/membership"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["member"]}>
              <Membership />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/member/attendance"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["member"]}>
              <MemberAttendance />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/member/payments"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["member"]}>
              <MemberPayments />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/member/workout"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["member"]}>
              <MemberWorkout />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/member/diet"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["member"]}>
              <MemberDiet />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/member/progress"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["member"]}>
              <MemberProgress />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      {/* ================= DEFAULT ================= */}

      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
