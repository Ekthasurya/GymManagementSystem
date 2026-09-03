import ExerciseCard from "./ExerciseCard";

const WorkoutDetails = ({
  workout,
}) => {

  if (!workout) {
    return null;
  }


  return (
    <div className="space-y-6">

      <div className="rounded-2xl border border-slate-200 bg-white p-6">

        <h1 className="text-2xl font-bold text-slate-900">
          {workout.title}
        </h1>

        {workout.description && (
          <p className="mt-2 text-sm text-slate-500">
            {workout.description}
          </p>
        )}


        <div className="mt-5 grid gap-4 sm:grid-cols-3">

          <div className="rounded-xl bg-slate-50 p-4">

            <p className="text-xs text-slate-400">
              Goal
            </p>

            <p className="mt-1 font-semibold">
              {workout.goal || "—"}
            </p>

          </div>


          <div className="rounded-xl bg-slate-50 p-4">

            <p className="text-xs text-slate-400">
              Duration
            </p>

            <p className="mt-1 font-semibold">
              {workout.duration || 0} min
            </p>

          </div>


          <div className="rounded-xl bg-slate-50 p-4">

            <p className="text-xs text-slate-400">
              Exercises
            </p>

            <p className="mt-1 font-semibold">
              {workout.exercises?.length ||
                0}
            </p>

          </div>

        </div>

      </div>


      <div>

        <h2 className="mb-4 text-xl font-bold text-slate-900">
          Exercises
        </h2>

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

    </div>
  );
};

export default WorkoutDetails;