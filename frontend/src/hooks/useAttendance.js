import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getTodayAttendance,
  getAllAttendance,
  getMemberAttendance,
  getMyAttendance,
} from "../services/attendanceService";

const useAttendance = ({
  type = "all",
  memberId = null,
  autoFetch = true,
} = {}) => {

  const [attendance, setAttendance] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);


  const fetchAttendance = useCallback(
    async (params = {}) => {

      try {

        setLoading(true);
        setError(null);

        let response;


        // Today's attendance
        if (type === "today") {

          response =
            await getTodayAttendance(
              params
            );

        }

        // Member attendance
        else if (
          type === "member" &&
          memberId
        ) {

          response =
            await getMemberAttendance(
              memberId,
              params
            );

        }

        // Logged-in member
        else if (type === "my") {

          response =
            await getMyAttendance(
              params
            );

        }

        // All attendance
        else {

          response =
            await getAllAttendance(
              params
            );

        }


        const data =
          response?.data ?? response ?? [];


        setAttendance(
          Array.isArray(data)
            ? data
            : data.attendance || []
        );


        return data;

      } catch (err) {

        console.error(
          "Attendance error:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Failed to load attendance"
        );

        setAttendance([]);

      } finally {

        setLoading(false);

      }

    },
    [type, memberId]
  );


  useEffect(() => {

    if (
      autoFetch &&
      (type !== "member" || memberId)
    ) {
      fetchAttendance();
    }

  }, [
    autoFetch,
    type,
    memberId,
    fetchAttendance,
  ]);


  return {
    attendance,
    loading,
    error,
    fetchAttendance,
    setAttendance,
  };
};

export default useAttendance;