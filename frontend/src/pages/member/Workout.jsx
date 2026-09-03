import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import {
  getMyWorkouts,
  completeWorkout,
} from "../../services/workoutService";

import ExerciseCard from "../../components/workouts/ExerciseCard";

const Workout = () => {

  const [workouts, setWorkouts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  const fetchWorkouts = async () => {

    try {

      setLoading(true);

      const response =
        await getMyWorkouts();

      setWorkouts(
        response.data ||
          response
      );

    } catch (error) {

      toast.error(
        "Failed to load workouts"
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {
    fetchWorkouts();
  }, []);


  const handleComplete = async (
    workoutId
  ) => {

    try {

      await completeWorkout(
        workoutId
      );

      toast.success(
        "Workout marked as completed"
      );

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to complete workout"
      );

    }

  };


  if (loading) {

    return (
      <div className="p-10 text-center">
        Loading workouts...
      </div>
    );

  }


  if (!workouts.length) {

    return (
      <div className="rounded-2xl border bg-white p-10 text-center">

        <h2 className="text-xl font-semibold text-slate-900">
          No Workout Assigned
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Your trainer hasn't assigned a workout plan yet.
        </p>

      </div>
    );

  }


  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold text-slate-900">
          My Workout
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Follow your workout plan and track your exercises.
        </p>

      </div>


      {workouts.map(
        (workout) => (

          <div
            key={workout._id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >

            {/* Header */}

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">

              <div>

                <h2 className="text-2xl font-bold text-slate-900">
                  {workout.title}
                </h2>

                {workout.goal && (
                  <span className="mt-2 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {workout.goal}
                  </span>
                )}

              </div>


              <div className="text-sm text-slate-500">

                {workout.duration} minutes

              </div>

            </div>


            {/* Description */}

            {workout.description && (
              <p className="mt-4 text-sm leading-6 text-slate-500">
                {workout.description}
              </p>
            )}


            {/* Schedule */}

            {workout.days?.length > 0 && (

              <div className="mt-5">

                <p className="text-xs font-semibold uppercase text-slate-400">
                  Workout Days
                </p>

                <div className="mt-2 flex flex-wrap gap-2">

                  {workout.days.map(
                    (day) => (
                      <span
                        key={day}
                        className="rounded-lg bg-slate-100 px-3 py-1 text-xs text-slate-600"
                      >
                        {day}
                      </span>
                    )
                  )}

                </div>

              </div>

            )}


            {/* Exercises */}

            <div className="mt-7">

              <h3 className="mb-4 text-lg font-bold text-slate-900">
                Exercises
              </h3>

              <div className="space-y-3">

                {workout.exercises?.map(
                  (exercise, index) => (

                    <ExerciseCard
                      key={index}
                      exercise={exercise}
                      index={index}
                    />

                  )
                )}

              </div>

            </div>


            {/* Complete */}

            <button
              onClick={() =>
                handleComplete(
                  workout._id
                )
              }
              className="mt-6 w-full rounded-xl bg-slate-900 py-3 font-semibold text-white hover:bg-slate-800"
            >
              Mark Workout Completed
            </button>

          </div>

        )
      )}

    </div>
  );
};

export default Workout;