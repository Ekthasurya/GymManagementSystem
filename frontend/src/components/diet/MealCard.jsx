import {
  Clock,
  Flame,
} from "lucide-react";

const MealCard = ({
  meal,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-xs font-semibold uppercase text-slate-400">
            {meal.mealType}
          </p>

          <h3 className="mt-1 text-lg font-bold text-slate-900">
            {meal.name}
          </h3>

        </div>


        <div className="flex items-center gap-1 text-sm text-slate-500">

          <Clock size={15} />

          {meal.time || "—"}

        </div>

      </div>


      <div className="mt-4">

        <p className="mb-2 text-sm font-semibold text-slate-700">
          Foods
        </p>

        <ul className="space-y-1">

          {meal.foods?.map(
            (food, index) => (

              <li
                key={index}
                className="text-sm text-slate-600"
              >
                • {food}
              </li>

            )
          )}

        </ul>

      </div>


      <div className="mt-5 flex flex-wrap gap-3">

        <span className="flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
          <Flame size={13} />
          {meal.calories || 0} kcal
        </span>

        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
          Protein {meal.protein || 0}g
        </span>

        <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-medium text-yellow-600">
          Carbs {meal.carbs || 0}g
        </span>

        <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-600">
          Fats {meal.fats || 0}g
        </span>

      </div>

    </div>
  );
};

export default MealCard;