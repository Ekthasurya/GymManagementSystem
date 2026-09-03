import { Link } from "react-router-dom";

import {
  Plus,
} from "lucide-react";

import toast from "react-hot-toast";

import useWorkouts from "../../hooks/useWorkouts";

import WorkoutCard from "../../components/workouts/WorkoutCard";

const Workouts = () => {

  const {
    workouts,
    loading,
    removeWorkout,
  } = useWorkouts();


  const handleDelete = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this workout?"
      );

    if (!confirmed) return;


    try {

      await removeWorkout(id);

      toast.success(
        "Workout deleted successfully"
      );

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to delete workout"
      );

    }

  };


  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>

          <h1 className="text-3xl font-bold text-slate-900">
            Workout Plans
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create and manage workout plans for your members.
          </p>

        </div>


        <Link
          to="/trainer/workouts/create"
          className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
        >
          <Plus size={18} />
          Create Workout
        </Link>

      </div>


      {/* Loading */}

      {loading ? (

        <div className="rounded-2xl border bg-white p-10 text-center">
          Loading workouts...
        </div>

      ) : workouts.length === 0 ? (

        <div className="rounded-2xl border bg-white p-10 text-center">

          <h2 className="font-semibold text-slate-800">
            No workout plans
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Create your first workout plan.
          </p>

        </div>

      ) : (

        <div className="grid gap-5 lg:grid-cols-2">

          {workouts.map(
            (workout) => (

              <WorkoutCard
                key={workout._id}
                workout={workout}
                onDelete={
                  handleDelete
                }
              />

            )
          )}

        </div>

      )}

    </div>
  );
};

export default Workouts;