import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

import toast from "react-hot-toast";

import DietPlanCard from "../../components/diet/DietPlanCard";

import {
  getDietPlans,
  deleteDietPlan,
} from "../../services/dietService";

const DietPlans = () => {

  const [plans, setPlans] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  const fetchPlans = async () => {

    try {

      setLoading(true);

      const response =
        await getDietPlans();

      setPlans(
        response.data || response
      );

    } catch (error) {

      toast.error(
        "Failed to load diet plans"
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    fetchPlans();
  }, []);


  const handleDelete = async (id) => {

    const confirmed =
      window.confirm(
        "Delete this diet plan?"
      );

    if (!confirmed) return;


    try {

      await deleteDietPlan(id);

      setPlans((prev) =>
        prev.filter(
          (plan) =>
            plan._id !== id
        )
      );

      toast.success(
        "Diet plan deleted"
      );

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to delete diet plan"
      );

    }
  };


  return (
    <div className="space-y-6">

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>

          <h1 className="text-3xl font-bold text-slate-900">
            Diet Plans
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create and manage diet plans for your members.
          </p>

        </div>


        <Link
          to="/trainer/diet-plans/create"
          className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
        >
          <Plus size={18} />
          Create Diet Plan
        </Link>

      </div>


      {loading ? (

        <div className="rounded-2xl bg-white p-10 text-center">
          Loading diet plans...
        </div>

      ) : plans.length === 0 ? (

        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">

          <h2 className="font-semibold text-slate-900">
            No Diet Plans
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Create a diet plan for your members.
          </p>

        </div>

      ) : (

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          {plans.map((plan) => (

            <DietPlanCard
              key={plan._id}
              plan={plan}
              onDelete={handleDelete}
            />

          ))}

        </div>

      )}

    </div>
  );
};

export default DietPlans;