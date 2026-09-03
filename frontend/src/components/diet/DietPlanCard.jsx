import { Link } from "react-router-dom";
import {
  CalendarDays,
  Flame,
  Pencil,
  Trash2,
} from "lucide-react";

const DietPlanCard = ({
  plan,
  onDelete,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-xl font-bold text-slate-900">
            {plan.name}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {plan.member?.name || "Member"}
          </p>

        </div>


        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            plan.status === "active"
              ? "bg-green-50 text-green-600"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          {plan.status || "active"}
        </span>

      </div>


      <div className="mt-6 grid grid-cols-2 gap-4">

        <div className="rounded-xl bg-slate-50 p-4">

          <div className="flex items-center gap-2 text-slate-400">
            <Flame size={16} />

            <span className="text-xs">
              Calories
            </span>
          </div>

          <p className="mt-1 font-bold text-slate-900">
            {plan.calories || 0} kcal
          </p>

        </div>


        <div className="rounded-xl bg-slate-50 p-4">

          <div className="flex items-center gap-2 text-slate-400">
            <CalendarDays size={16} />

            <span className="text-xs">
              Start
            </span>
          </div>

          <p className="mt-1 font-bold text-slate-900">
            {plan.startDate
              ? new Date(
                  plan.startDate
                ).toLocaleDateString()
              : "—"}
          </p>

        </div>

      </div>


      <div className="mt-5 grid grid-cols-3 gap-3 text-center">

        <div>
          <p className="text-xs text-slate-400">
            Protein
          </p>

          <p className="font-semibold text-slate-800">
            {plan.protein || 0}g
          </p>
        </div>


        <div>
          <p className="text-xs text-slate-400">
            Carbs
          </p>

          <p className="font-semibold text-slate-800">
            {plan.carbs || 0}g
          </p>
        </div>


        <div>
          <p className="text-xs text-slate-400">
            Fats
          </p>

          <p className="font-semibold text-slate-800">
            {plan.fats || 0}g
          </p>
        </div>

      </div>


      <div className="mt-6 flex gap-2">

        <Link
          to={`/trainer/diet-plans/${plan._id}`}
          className="flex-1 rounded-xl bg-slate-100 py-3 text-center text-sm font-semibold text-slate-700"
        >
          View
        </Link>


        <Link
          to={`/trainer/diet-plans/${plan._id}/edit`}
          className="rounded-xl bg-blue-50 p-3 text-blue-600"
        >
          <Pencil size={17} />
        </Link>


        <button
          onClick={() =>
            onDelete(plan._id)
          }
          className="rounded-xl bg-red-50 p-3 text-red-600"
        >
          <Trash2 size={17} />
        </button>

      </div>

    </div>
  );
};

export default DietPlanCard;