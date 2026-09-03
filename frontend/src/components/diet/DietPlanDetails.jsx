import MealCard from "./MealCard";
import NutritionSummary from "./NutritionSummary";

const DietPlanDetails = ({
  plan,
}) => {
  if (!plan) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center">
        Diet plan not found.
      </div>
    );
  }


  return (
    <div className="space-y-6">

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <p className="text-sm text-slate-500">
          Diet Plan
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          {plan.name}
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Goal: {plan.goal}
        </p>

      </div>


      <NutritionSummary
        calories={plan.calories}
        protein={plan.protein}
        carbs={plan.carbs}
        fats={plan.fats}
      />


      <div>

        <h2 className="mb-4 text-xl font-bold text-slate-900">
          Daily Meals
        </h2>

        <div className="space-y-4">

          {plan.meals?.map(
            (meal, index) => (
              <MealCard
                key={meal._id || index}
                meal={meal}
              />
            )
          )}

        </div>

      </div>


      {plan.notes && (

        <div className="rounded-2xl border border-slate-200 bg-white p-6">

          <h2 className="font-bold text-slate-900">
            Trainer Notes
          </h2>

          <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600">
            {plan.notes}
          </p>

        </div>

      )}

    </div>
  );
};

export default DietPlanDetails;