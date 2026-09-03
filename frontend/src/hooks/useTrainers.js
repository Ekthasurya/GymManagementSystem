import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getTrainers,
  deleteTrainer,
} from "../services/trainerService";

const useTrainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTrainers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getTrainers();

      setTrainers(
        response.data || response
      );
    } catch (error) {
      console.error(
        "Fetch trainers error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to fetch trainers"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrainers();
  }, [fetchTrainers]);

  const removeTrainer = async (id) => {
    await deleteTrainer(id);

    setTrainers((prev) =>
      prev.filter(
        (trainer) => trainer._id !== id
      )
    );
  };

  return {
    trainers,
    loading,
    error,
    fetchTrainers,
    removeTrainer,
  };
};

export default useTrainers;