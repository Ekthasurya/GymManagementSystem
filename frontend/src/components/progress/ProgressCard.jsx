import { CalendarDays, TrendingDown, TrendingUp, Weight } from "lucide-react";

const ProgressCard = ({ progress }) => {
  const weightChange = progress.weightChange || 0;

  return (
    <div className="bg-white rounded-xl shadow p-5">

      <div className="flex items-center justify-between mb-4">

        <div>
          <h3 className="font-semibold text-lg">
            {progress.member?.name || "Member"}
          </h3>

          <p className="text-sm text-gray-500 flex items-center gap-1">
            <CalendarDays size={15} />
            {new Date(progress.date).toLocaleDateString()}
          </p>
        </div>

        <Weight className="text-blue-600" />
      </div>

      <div className="grid grid-cols-2 gap-4">

        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm text-gray-500">
            Weight
          </p>

          <p className="text-xl font-bold">
            {progress.weight} kg
          </p>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm text-gray-500">
            Body Fat
          </p>

          <p className="text-xl font-bold">
            {progress.bodyFat || 0}%
          </p>
        </div>

      </div>

      {weightChange !== 0 && (
        <div className="mt-4 flex items-center gap-2">

          {weightChange < 0 ? (
            <TrendingDown className="text-green-600" size={18} />
          ) : (
            <TrendingUp className="text-orange-600" size={18} />
          )}

          <span className="text-sm">
            {Math.abs(weightChange)} kg change
          </span>

        </div>
      )}

      {progress.notes && (
        <p className="mt-4 text-sm text-gray-600">
          {progress.notes}
        </p>
      )}

    </div>
  );
};

export default ProgressCard;