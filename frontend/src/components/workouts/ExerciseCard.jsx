import {
  Dumbbell,
  Clock,
  Trash2,
} from "lucide-react";

const ExerciseCard = ({
  exercise,
  index,
  onRemove,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">

      <div className="flex items-start justify-between">

        <div className="flex items-start gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
            <Dumbbell
              size={20}
              className="text-slate-700"
            />
          </div>

          <div>

            <h3 className="font-semibold text-slate-900">
              {exercise.name}
            </h3>

            <p className="text-sm text-slate-500">
              {exercise.muscleGroup}
            </p>

          </div>

        </div>


        {onRemove && (
          <button
            type="button"
            onClick={() =>
              onRemove(index)
            }
            className="rounded-lg p-2 text-red-500 hover:bg-red-50"
          >
            <Trash2 size={17} />
          </button>
        )}

      </div>


      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">

        <div className="rounded-xl bg-slate-50 p-3">

          <p className="text-xs text-slate-400">
            Sets
          </p>

          <p className="mt-1 font-semibold text-slate-800">
            {exercise.sets}
          </p>

        </div>


        <div className="rounded-xl bg-slate-50 p-3">

          <p className="text-xs text-slate-400">
            Reps
          </p>

          <p className="mt-1 font-semibold text-slate-800">
            {exercise.reps}
          </p>

        </div>


        <div className="rounded-xl bg-slate-50 p-3">

          <p className="text-xs text-slate-400">
            Weight
          </p>

          <p className="mt-1 font-semibold text-slate-800">
            {exercise.weight
              ? `${exercise.weight} kg`
              : "Bodyweight"}
          </p>

        </div>


        <div className="rounded-xl bg-slate-50 p-3">

          <div className="flex items-center gap-1">

            <Clock
              size={13}
              className="text-slate-400"
            />

            <p className="text-xs text-slate-400">
              Rest
            </p>

          </div>

          <p className="mt-1 font-semibold text-slate-800">
            {exercise.restTime || 0}s
          </p>

        </div>

      </div>


      {exercise.notes && (
        <p className="mt-4 text-sm text-slate-500">
          <span className="font-medium text-slate-700">
            Note:
          </span>{" "}
          {exercise.notes}
        </p>
      )}

    </div>
  );
};

export default ExerciseCard;