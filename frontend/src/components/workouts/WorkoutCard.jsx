import {
  Clock,
  Dumbbell,
  Pencil,
  Trash2,
  User,
} from "lucide-react";

import { Link } from "react-router-dom";

const WorkoutCard = ({
  workout,
  onDelete,
}) => {

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-xl font-bold text-slate-900">
            {workout.title}
          </h3>

          {workout.goal && (
            <span className="mt-2 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {workout.goal}
            </span>
          )}

        </div>


        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            workout.status === "active"
              ? "bg-green-50 text-green-600"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          {workout.status || "active"}
        </span>

      </div>


      {/* Description */}

      {workout.description && (
        <p className="mt-4 text-sm leading-6 text-slate-500">
          {workout.description}
        </p>
      )}


      {/* Details */}

      <div className="mt-5 grid grid-cols-2 gap-3">

        <div className="rounded-xl bg-slate-50 p-4">

          <div className="flex items-center gap-2 text-slate-400">

            <User size={15} />

            <span className="text-xs">
              Member
            </span>

          </div>

          <p className="mt-1 truncate font-semibold text-slate-800">
            {workout.member?.name ||
              "Unassigned"}
          </p>

        </div>


        <div className="rounded-xl bg-slate-50 p-4">

          <div className="flex items-center gap-2 text-slate-400">

            <Clock size={15} />

            <span className="text-xs">
              Duration
            </span>

          </div>

          <p className="mt-1 font-semibold text-slate-800">
            {workout.duration || 0} min
          </p>

        </div>

      </div>


      {/* Days */}

      {workout.days?.length > 0 && (

        <div className="mt-5">

          <p className="mb-2 text-xs font-semibold uppercase text-slate-400">
            Schedule
          </p>

          <div className="flex flex-wrap gap-2">

            {workout.days.map(
              (day) => (
                <span
                  key={day}
                  className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs text-slate-600"
                >
                  {day}
                </span>
              )
            )}

          </div>

        </div>

      )}


      {/* Exercise count */}

      <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">

        <Dumbbell size={16} />

        {workout.exercises?.length || 0} exercises

      </div>


      {/* Actions */}

      <div className="mt-6 flex gap-2">

        <Link
          to={`/trainer/workouts/${workout._id}/edit`}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-100 py-3 text-sm font-semibold text-slate-700"
        >
          <Pencil size={16} />
          Edit
        </Link>


        <button
          type="button"
          onClick={() =>
            onDelete(workout._id)
          }
          className="rounded-xl bg-red-50 px-4 py-3 text-red-600 hover:bg-red-100"
        >
          <Trash2 size={17} />
        </button>

      </div>

    </div>
  );
};

export default WorkoutCard;