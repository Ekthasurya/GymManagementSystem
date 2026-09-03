import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getWorkouts,
  deleteWorkout,
} from "../services/workoutService";

const useWorkouts = () => {

  const [workouts, setWorkouts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);


  const fetchWorkouts = useCallback(
    async () => {

      try {

        setLoading(true);
        setError(null);

        const response =
          await getWorkouts();

        setWorkouts(
          response.data || response
        );

      } catch (error) {

        console.error(
          "Fetch workouts error:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to fetch workouts"
        );

      } finally {

        setLoading(false);

      }

    },
    []
  );


  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);


  const removeWorkout = async (id) => {

    await deleteWorkout(id);

    setWorkouts((prev) =>
      prev.filter(
        (workout) =>
          workout._id !== id
      )
    );

  };


  return {
    workouts,
    loading,
    error,
    fetchWorkouts,
    removeWorkout,
  };
};


export default useWorkouts;