import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import {
  getMyDietPlan,
} from "../../services/dietService";

import DietPlanDetails from "../../components/diet/DietPlanDetails";

const Diet = () => {

  const [plan, setPlan] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    const fetchDiet = async () => {

      try {

        const response =
          await getMyDietPlan();

        setPlan(
          response.data || response
        );

      } catch (error) {

        toast.error(
          error.response?.data?.message ||
            "Failed to load diet plan"
        );

      } finally {

        setLoading(false);

      }

    };


    fetchDiet();

  }, []);


  if (loading) {

    return (
      <div className="p-10 text-center">
        Loading diet plan...
      </div>
    );

  }


  if (!plan) {

    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">

        <h2 className="text-xl font-bold text-slate-900">
          No Diet Plan
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Your trainer has not assigned a diet plan yet.
        </p>

      </div>
    );

  }


  return (
    <div>

      <DietPlanDetails
        plan={plan}
      />

    </div>
  );
};

export default Diet;