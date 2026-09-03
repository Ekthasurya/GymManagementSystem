import { useState } from "react";

import {
  Plus,
  Trash2,
} from "lucide-react";

const initialExercise = {
  name: "",
  muscleGroup: "",
  sets: 3,
  reps: 10,
  weight: "",
  restTime: 60,
  notes: "",
};


const WorkoutForm = ({
  members = [],
  initialData,
  onSubmit,
  loading = false,
}) => {

  const [form, setForm] = useState({
    title:
      initialData?.title || "",

    description:
      initialData?.description || "",

    member:
      initialData?.member?._id ||
      initialData?.member ||
      "",

    goal:
      initialData?.goal || "",

    duration:
      initialData?.duration || 60,

    days:
      initialData?.days || [],

    exercises:
      initialData?.exercises || [],
  });


  const [exercise, setExercise] =
    useState(initialExercise);


  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];


  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  const toggleDay = (day) => {

    setForm((prev) => {

      const exists =
        prev.days.includes(day);

      return {
        ...prev,

        days: exists
          ? prev.days.filter(
              (item) => item !== day
            )
          : [...prev.days, day],
      };

    });

  };


  const handleExerciseChange = (
    e
  ) => {

    const {
      name,
      value,
    } = e.target;

    setExercise((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  const addExercise = () => {

    if (!exercise.name.trim()) {
      return;
    }

    setForm((prev) => ({
      ...prev,

      exercises: [
        ...prev.exercises,
        {
          ...exercise,

          sets: Number(
            exercise.sets
          ),

          reps: Number(
            exercise.reps
          ),

          weight: exercise.weight
            ? Number(exercise.weight)
            : 0,

          restTime: Number(
            exercise.restTime
          ),
        },
      ],
    }));


    setExercise(
      initialExercise
    );

  };


  const removeExercise = (
    index
  ) => {

    setForm((prev) => ({
      ...prev,

      exercises:
        prev.exercises.filter(
          (_, i) => i !== index
        ),
    }));

  };


  const handleSubmit = (e) => {

    e.preventDefault();

    onSubmit({
      ...form,

      duration: Number(
        form.duration
      ),
    });

  };


  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      {/* Basic Information */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="text-lg font-bold text-slate-900">
          Workout Information
        </h2>


        <div className="mt-6 grid gap-5 md:grid-cols-2">

          {/* Title */}

          <div className="md:col-span-2">

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Workout Name *
            </label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="e.g. Beginner Muscle Gain"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
            />

          </div>


          {/* Member */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Assign Member *
            </label>

            <select
              name="member"
              value={form.member}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
            >

              <option value="">
                Select member
              </option>

              {members.map(
                (member) => (
                  <option
                    key={member._id}
                    value={member._id}
                  >
                    {member.name}
                  </option>
                )
              )}

            </select>

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

              <option value="">
                Select goal
              </option>

              <option value="Weight Loss">
                Weight Loss
              </option>

              <option value="Muscle Gain">
                Muscle Gain
              </option>

              <option value="Strength">
                Strength
              </option>

              <option value="Endurance">
                Endurance
              </option>

              <option value="General Fitness">
                General Fitness
              </option>

            </select>

          </div>


          {/* Duration */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Workout Duration (Minutes)
            </label>

            <input
              type="number"
              name="duration"
              value={form.duration}
              onChange={handleChange}
              min="1"
              className="w-full rounded-xl border border-slate-200 px-4 py-3"
            />

          </div>


          {/* Description */}

          <div className="md:col-span-2">

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="3"
              placeholder="Workout plan description..."
              className="w-full rounded-xl border border-slate-200 px-4 py-3"
            />

          </div>

        </div>

      </div>


      {/* Workout Days */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="text-lg font-bold text-slate-900">
          Workout Schedule
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Select the days when the member should perform this workout.
        </p>


        <div className="mt-5 flex flex-wrap gap-3">

          {weekDays.map(
            (day) => {

              const selected =
                form.days.includes(day);

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() =>
                    toggleDay(day)
                  }
                  className={`rounded-xl px-4 py-2 text-sm font-medium ${
                    selected
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {day}
                </button>
              );

            }
          )}

        </div>

      </div>


      {/* Add Exercise */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-lg font-bold text-slate-900">
              Add Exercises
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add exercises to this workout plan.
            </p>

          </div>

        </div>


        <div className="mt-6 grid gap-4 md:grid-cols-2">

          <input
            name="name"
            value={exercise.name}
            onChange={handleExerciseChange}
            placeholder="Exercise name"
            className="rounded-xl border border-slate-200 px-4 py-3"
          />


          <input
            name="muscleGroup"
            value={exercise.muscleGroup}
            onChange={handleExerciseChange}
            placeholder="Muscle group"
            className="rounded-xl border border-slate-200 px-4 py-3"
          />


          <input
            type="number"
            name="sets"
            value={exercise.sets}
            onChange={handleExerciseChange}
            placeholder="Sets"
            min="1"
            className="rounded-xl border border-slate-200 px-4 py-3"
          />


          <input
            type="number"
            name="reps"
            value={exercise.reps}
            onChange={handleExerciseChange}
            placeholder="Reps"
            min="1"
            className="rounded-xl border border-slate-200 px-4 py-3"
          />


          <input
            type="number"
            name="weight"
            value={exercise.weight}
            onChange={handleExerciseChange}
            placeholder="Weight (kg)"
            min="0"
            className="rounded-xl border border-slate-200 px-4 py-3"
          />


          <input
            type="number"
            name="restTime"
            value={exercise.restTime}
            onChange={handleExerciseChange}
            placeholder="Rest time (seconds)"
            min="0"
            className="rounded-xl border border-slate-200 px-4 py-3"
          />


          <textarea
            name="notes"
            value={exercise.notes}
            onChange={handleExerciseChange}
            placeholder="Exercise notes"
            rows="2"
            className="rounded-xl border border-slate-200 px-4 py-3 md:col-span-2"
          />

        </div>


        <button
          type="button"
          onClick={addExercise}
          className="mt-5 flex items-center gap-2 rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200"
        >
          <Plus size={17} />
          Add Exercise
        </button>


        {/* Exercise List */}

        {form.exercises.length > 0 && (

          <div className="mt-6 space-y-3">

            {form.exercises.map(
              (item, index) => (

                <div
                  key={index}
                  className="flex items-center justify-between rounded-xl bg-slate-50 p-4"
                >

                  <div>

                    <p className="font-semibold text-slate-800">
                      {item.name}
                    </p>

                    <p className="text-sm text-slate-500">
                      {item.muscleGroup} •{" "}
                      {item.sets} sets ×{" "}
                      {item.reps} reps
                    </p>

                  </div>


                  <button
                    type="button"
                    onClick={() =>
                      removeExercise(
                        index
                      )
                    }
                    className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                  >
                    <Trash2 size={17} />
                  </button>

                </div>

              )
            )}

          </div>

        )}

      </div>


      {/* Submit */}

      <div className="flex justify-end">

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-slate-900 px-7 py-3 font-semibold text-white disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : initialData
            ? "Update Workout"
            : "Create Workout"}
        </button>

      </div>

    </form>
  );
};

export default WorkoutForm;