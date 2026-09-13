import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Trainer Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your workouts, diet plans, members, and progress.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-medium text-slate-500">
            Assigned Members
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            0
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-medium text-slate-500">
            Workout Plans
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            0
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-medium text-slate-500">
            Diet Plans
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            0
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-medium text-slate-500">
            Progress
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            View
          </h2>
        </div>
      </div>

      {/* Quick Access */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-slate-900">
          Quick Access
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            to="/trainer/workouts"
            className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
          >
            <h3 className="font-semibold text-slate-900">
              Workouts
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              View and manage workout plans.
            </p>
          </Link>

          <Link
            to="/trainer/workouts/create"
            className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
          >
            <h3 className="font-semibold text-slate-900">
              Create Workout
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Create a new workout plan.
            </p>
          </Link>

          <Link
            to="/trainer/diet-plans"
            className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
          >
            <h3 className="font-semibold text-slate-900">
              Diet Plans
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Manage assigned diet plans.
            </p>
          </Link>

          <Link
            to="/trainer/progress"
            className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
          >
            <h3 className="font-semibold text-slate-900">
              Progress
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Track member fitness progress.
            </p>
          </Link>
        </div>
      </div>

      {/* Overview */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            Workout Management
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Create, update, and manage workout plans for your assigned
            members.
          </p>

          <Link
            to="/trainer/workouts"
            className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Manage Workouts →
          </Link>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            Diet Management
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Create and manage nutrition and diet plans for members.
          </p>

          <Link
            to="/trainer/diet-plans"
            className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Manage Diet Plans →
          </Link>
        </div>
      </div>

      {/* Motivation */}
      <div className="rounded-xl bg-slate-900 p-6 text-white">
        <h2 className="text-xl font-semibold">
          Keep Your Members on Track!
        </h2>

        <p className="mt-2 text-sm text-slate-300">
          Create effective workout and diet plans and monitor member
          progress consistently.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;