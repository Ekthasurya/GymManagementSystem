import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to read user data:", error);
        setUser(null);
      }
    }
  }, []);

  const memberName = user?.name || "Member";

  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Welcome, {memberName}
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Here's an overview of your gym activities.
        </p>
      </div>

      {/* ================= STATISTICS ================= */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Membership */}
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-medium text-slate-500">
            Membership
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Active
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Current membership
          </p>
        </div>

        {/* Attendance */}
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-medium text-slate-500">
            Attendance
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            0
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Attendance records
          </p>
        </div>

        {/* Payments */}
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-medium text-slate-500">
            Payments
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            ₹0
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Total payments
          </p>
        </div>

        {/* Workout */}
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-medium text-slate-500">
            Workout
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            View
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your workout plan
          </p>
        </div>
      </div>

      {/* ================= QUICK ACCESS ================= */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-slate-900">
          Quick Access
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Membership */}
          <Link
            to="/member/membership"
            className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
          >
            <h3 className="font-semibold text-slate-900">
              Membership
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              View your current membership and status.
            </p>
          </Link>

          {/* Attendance */}
          <Link
            to="/member/attendance"
            className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
          >
            <h3 className="font-semibold text-slate-900">
              Attendance
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Check your attendance history.
            </p>
          </Link>

          {/* Payments */}
          <Link
            to="/member/payments"
            className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
          >
            <h3 className="font-semibold text-slate-900">
              Payments
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              View your payment history.
            </p>
          </Link>

          {/* Workout */}
          <Link
            to="/member/workout"
            className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
          >
            <h3 className="font-semibold text-slate-900">
              Workout
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              View your assigned workout plan.
            </p>
          </Link>
        </div>
      </div>

      {/* ================= DIET & PROGRESS ================= */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Diet */}
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Diet Plan
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Check your assigned diet plan.
              </p>
            </div>

            <Link
              to="/member/diet"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              View
            </Link>
          </div>
        </div>

        {/* Progress */}
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Progress
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Track your fitness progress and measurements.
              </p>
            </div>

            <Link
              to="/member/progress"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              View
            </Link>
          </div>
        </div>
      </div>

      {/* ================= MOTIVATION ================= */}
      <div className="rounded-xl bg-slate-900 p-6 text-white">
        <h2 className="text-xl font-semibold">
          Keep Going!
        </h2>

        <p className="mt-2 text-sm text-slate-300">
          Stay consistent with your workouts, attendance, and diet
          to achieve your fitness goals.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;