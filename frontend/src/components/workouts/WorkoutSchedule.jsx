const WorkoutSchedule = ({
  days = [],
}) => {

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];


  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">

      <h2 className="text-lg font-bold text-slate-900">
        Weekly Schedule
      </h2>


      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">

        {weekDays.map(
          (day) => {

            const active =
              days.includes(day);

            return (
              <div
                key={day}
                className={`rounded-xl p-4 text-center ${
                  active
                    ? "bg-slate-900 text-white"
                    : "bg-slate-50 text-slate-400"
                }`}
              >

                <p className="text-xs font-semibold">
                  {day.substring(
                    0,
                    3
                  )}
                </p>

                <p className="mt-2 text-xs">
                  {active
                    ? "Workout"
                    : "Rest"}
                </p>

              </div>
            );

          }
        )}

      </div>

    </div>
  );
};

export default WorkoutSchedule;