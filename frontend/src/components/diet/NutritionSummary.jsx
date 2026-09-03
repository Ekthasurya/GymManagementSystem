const NutritionSummary = ({
  calories = 0,
  protein = 0,
  carbs = 0,
  fats = 0,
}) => {
  const nutrition = [
    {
      label: "Calories",
      value: `${calories} kcal`,
    },
    {
      label: "Protein",
      value: `${protein}g`,
    },
    {
      label: "Carbs",
      value: `${carbs}g`,
    },
    {
      label: "Fats",
      value: `${fats}g`,
    },
  ];


  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

      {nutrition.map((item) => (

        <div
          key={item.label}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >

          <p className="text-sm text-slate-500">
            {item.label}
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {item.value}
          </p>

        </div>

      ))}

    </div>
  );
};

export default NutritionSummary;