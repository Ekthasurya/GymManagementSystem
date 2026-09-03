import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getMembershipPlans,
  deleteMembershipPlan,
} from "../services/membershipService";

const useMemberships = () => {
  const [plans, setPlans] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);


  const fetchPlans = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response =
        await getMembershipPlans();

      setPlans(
        response.data || response
      );
    } catch (error) {
      console.error(
        "Fetch membership plans error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to fetch membership plans"
      );
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);


  const removePlan = async (id) => {
    await deleteMembershipPlan(id);

    setPlans((prev) =>
      prev.filter(
        (plan) => plan._id !== id
      )
    );
  };


  return {
    plans,
    loading,
    error,
    fetchPlans,
    removePlan,
  };
};

export default useMemberships;