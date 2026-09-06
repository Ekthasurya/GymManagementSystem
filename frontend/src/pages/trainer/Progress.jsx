import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getProgressRecords } from "../../services/progressService";
import { getMembers } from "../../services/memberService";

import ProgressCard from "../../components/progress/ProgressCard";

const Progress = () => {
  const [progress, setProgress] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [progressData, membersData] = await Promise.all([
        getProgressRecords(),
        getMembers(),
      ]);

      setProgress(
        Array.isArray(progressData)
          ? progressData
          : progressData?.progress || []
      );

      setMembers(
        Array.isArray(membersData)
          ? membersData
          : membersData?.members || []
      );
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
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-2xl font-bold">
            Member Progress
          </h1>

          <p className="text-gray-500">
            Monitor member fitness progress
          </p>
        </div>

      </div>

      {progress.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          No progress records found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

          {progress.map((item) => (
            <ProgressCard
              key={item._id}
              progress={item}
            />
          ))}

        </div>
      )}

    </div>
  );
};

export default Progress;