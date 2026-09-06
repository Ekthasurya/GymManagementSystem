import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getMyProgress,
} from "../../services/progressService";

import ProgressChart from "../../components/progress/ProgressChart";
import MeasurementsTable from "../../components/progress/MeasurementsTable";

const Progress = () => {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const data = await getMyProgress();

      setProgress(Array.isArray(data) ? data : data?.progress || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load progress"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        Loading progress...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">

      <div>
        <h1 className="text-2xl font-bold">
          My Progress
        </h1>

        <p className="text-gray-500">
          Track your fitness journey
        </p>
      </div>

      {progress.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <h2 className="text-lg font-semibold">
            No Progress Data
          </h2>

          <p className="text-gray-500 mt-2">
            Your trainer has not added any progress records yet.
          </p>
        </div>
      ) : (
        <>
          <ProgressChart progress={progress} />

          <MeasurementsTable progress={progress} />
        </>
      )}

    </div>
  );
};

export default Progress;