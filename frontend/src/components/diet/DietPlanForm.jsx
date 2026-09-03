import { useState } from "react";

const emptyMeal = {
  mealType: "breakfast",
  name: "",
  time: "",
  foods: "",
  calories: "",
  protein: "",
  carbs: "",
  fats: "",
};

const DietPlanForm = ({
  members = [],
  initialData,
  onSubmit,
  loading = false,
}) => {
  const [form, setForm] = useState({
    member: initialData?.member?._id || "",
    name: initialData?.name || "",
    goal: initialData?.goal || "general-fitness",
    calories: initialData?.calories || "",
    protein: initialData?.protein || "",
    carbs: initialData?.carbs || "",
    fats: initialData?.fats || "",
    startDate: initialData?.startDate
      ? initialData.startDate.split("T")[0]
      : "",
    endDate: initialData?.endDate
      ? initialData.endDate.split("T")[0]
      : "",
    notes: initialData?.notes || "",
    meals:
      initialData?.meals?.length
        ? initialData.meals
        : [{ ...emptyMeal }],
  });


  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleMealChange = (
    index,
    field,
    value
  ) => {
    setForm((prev) => {
      const meals = [...prev.meals];

      meals[index] = {
        ...meals[index],
        [field]: value,
      };

      return {
        ...prev,
        meals,
      };
    });
  };


  const addMeal = () => {
    setForm((prev) => ({
      ...prev,
      meals: [
        ...prev.meals,
        { ...emptyMeal },
      ],
    }));
  };


  const removeMeal = (index) => {
    setForm((prev) => ({
      ...prev,
      meals: prev.meals.filter(
        (_, i) => i !== index
      ),
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      ...form,

      calories: Number(form.calories),
      protein: Number(form.protein),
      carbs: Number(form.carbs),
      fats: Number(form.fats),

      meals: form.meals.map((meal) => ({
        ...meal,

        calories: Number(meal.calories),
        protein: Number(meal.protein),
        carbs: Number(meal.carbs),
        fats: Number(meal.fats),

        foods:
          typeof meal.foods === "string"
            ? meal.foods
                .split("\n")
                .map((food) => food.trim())
                .filter(Boolean)
            : meal.foods,
      })),
    };

    onSubmit(data);
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      {/* Basic Information */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="text-lg font-bold text-slate-900">
          Diet Plan Information
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">

          {/* Member */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Member *
            </label>

            <select
              name="member"
              value={form.member}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
            >
              <option value="">
                Select Member
              </option>

              {members.map((member) => (
                <option
                  key={member._id}
                  value={member._id}
                >
                  {member.name}
                </option>
              ))}
            </select>
          </div>


          {/* Plan Name */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Plan Name *
            </label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Fat Loss Diet"
              className="w-full rounded-xl border border-slate-200 px-4 py-3"
            />
          </div>


          {/* Goal */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Goal
            </label>

            <select
              name="goal"
              value={form.goal}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
            >
              <option value="weight-loss">
                Weight Loss
              </option>

              <option value="muscle-gain">
                Muscle Gain
              </option>

              <option value="maintenance">
                Maintenance
              </option>

              <option value="general-fitness">
                General Fitness
              </option>
            </select>
          </div>


          {/* Calories */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Daily Calories
            </label>

            <input
              type="number"
              name="calories"
              value={form.calories}
              onChange={handleChange}
              min="0"
              placeholder="2200"
              className="w-full rounded-xl border border-slate-200 px-4 py-3"
            />
          </div>

        </div>


        {/* Macros */}

        <div className="mt-6 grid gap-5 sm:grid-cols-3">

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Protein (g)
            </label>

            <input
              type="number"
              name="protein"
              value={form.protein}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3"
            />
          </div>


          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Carbs (g)
            </label>

            <input
              type="number"
              name="carbs"
              value={form.carbs}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3"
            />
          </div>


          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Fats (g)
            </label>

            <input
              type="number"
              name="fats"
              value={form.fats}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3"
            />
          </div>

        </div>


        {/* Dates */}

        <div className="mt-6 grid gap-5 sm:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Start Date *
            </label>

            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3"
            />
          </div>


          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              End Date
            </label>

            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3"
            />
          </div>

        </div>

      </div>


      {/* Meals */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Meals
            </h2>

            <p className="text-sm text-slate-500">
              Add meals and food items.
            </p>
          </div>

          <button
            type="button"
            onClick={addMeal}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
          >
            + Add Meal
          </button>

        </div>


        <div className="mt-6 space-y-6">

          {form.meals.map(
            (meal, index) => (

              <div
                key={index}
                className="rounded-xl border border-slate-200 p-5"
              >

                <div className="flex items-center justify-between">

                  <h3 className="font-semibold text-slate-800">
                    Meal {index + 1}
                  </h3>

                  {form.meals.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removeMeal(index)
                      }
                      className="text-sm font-medium text-red-500"
                    >
                      Remove
                    </button>
                  )}

                </div>


                <div className="mt-4 grid gap-4 md:grid-cols-3">

                  <select
                    value={meal.mealType}
                    onChange={(e) =>
                      handleMealChange(
                        index,
                        "mealType",
                        e.target.value
                      )
                    }
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3"
                  >
                    <option value="breakfast">
                      Breakfast
                    </option>

                    <option value="mid-morning">
                      Mid Morning
                    </option>

                    <option value="lunch">
                      Lunch
                    </option>

                    <option value="evening">
                      Evening
                    </option>

                    <option value="dinner">
                      Dinner
                    </option>

                    <option value="snack">
                      Snack
                    </option>
                  </select>


                  <input
                    value={meal.name}
                    onChange={(e) =>
                      handleMealChange(
                        index,
                        "name",
                        e.target.value
                      )
                    }
                    placeholder="Meal name"
                    className="rounded-xl border border-slate-200 px-4 py-3"
                  />


                  <input
                    type="time"
                    value={meal.time}
                    onChange={(e) =>
                      handleMealChange(
                        index,
                        "time",
                        e.target.value
                      )
                    }
                    className="rounded-xl border border-slate-200 px-4 py-3"
                  />

                </div>


                <textarea
                  value={
                    Array.isArray(meal.foods)
                      ? meal.foods.join("\n")
                      : meal.foods
                  }
                  onChange={(e) =>
                    handleMealChange(
                      index,
                      "foods",
                      e.target.value
                    )
                  }
                  rows="4"
                  placeholder={
                    "Oats 80g\n3 Eggs\n1 Banana"
                  }
                  className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-3"
                />


                <div className="mt-4 grid gap-4 sm:grid-cols-4">

                  <input
                    type="number"
                    value={meal.calories}
                    onChange={(e) =>
                      handleMealChange(
                        index,
                        "calories",
                        e.target.value
                      )
                    }
                    placeholder="Calories"
                    className="rounded-xl border border-slate-200 px-4 py-3"
                  />

                  <input
                    type="number"
                    value={meal.protein}
                    onChange={(e) =>
                      handleMealChange(
                        index,
                        "protein",
                        e.target.value
                      )
                    }
                    placeholder="Protein"
                    className="rounded-xl border border-slate-200 px-4 py-3"
                  />

                  <input
                    type="number"
                    value={meal.carbs}
                    onChange={(e) =>
                      handleMealChange(
                        index,
                        "carbs",
                        e.target.value
                      )
                    }
                    placeholder="Carbs"
                    className="rounded-xl border border-slate-200 px-4 py-3"
                  />

                  <input
                    type="number"
                    value={meal.fats}
                    onChange={(e) =>
                      handleMealChange(
                        index,
                        "fats",
                        e.target.value
                      )
                    }
                    placeholder="Fats"
                    className="rounded-xl border border-slate-200 px-4 py-3"
                  />

                </div>

              </div>

            )
          )}

        </div>

      </div>


      {/* Notes */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <label className="mb-2 block text-sm font-medium text-slate-700">
          Additional Notes
        </label>

        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows="4"
          placeholder="Drink plenty of water..."
          className="w-full rounded-xl border border-slate-200 px-4 py-3"
        />

      </div>


      <div className="flex justify-end">

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-slate-900 px-7 py-3 font-semibold text-white disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : initialData
            ? "Update Diet Plan"
            : "Create Diet Plan"}
        </button>

      </div>

    </form>
  );
};

export default DietPlanForm;