import { useEffect, useState } from "react";

import {
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import DietPlanForm from "../../components/diet/DietPlanForm";

import {
  createDietPlan,
} from "../../services/dietService";

import {
  getMembers,
} from "../../services/memberService";

const CreateDietPlan = () => {

  const navigate = useNavigate();

  const [members, setMembers] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [loadingMembers, setLoadingMembers] =
    useState(true);


  useEffect(() => {

    const fetchMembers = async () => {

      try {

        const response =
          await getMembers();

        setMembers(
          response.data || response
        );

      } catch (error) {

        toast.error(
          "Failed to load members"
        );

      } finally {

        setLoadingMembers(false);

      }
    };


    fetchMembers();

  }, []);


  const handleSubmit = async (data) => {

    try {

      setLoading(true);

      await createDietPlan(data);

      toast.success(
        "Diet plan created successfully"
      );

      navigate("/trainer/diet-plans");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to create diet plan"
      );

    } finally {

      setLoading(false);

    }
  };


  if (loadingMembers) {

    return (
      <div className="p-10 text-center">
        Loading members...
      </div>
    );

  }


  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold text-slate-900">
          Create Diet Plan
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Create a personalized diet plan for a member.
        </p>

      </div>


      <DietPlanForm
        members={members}
        onSubmit={handleSubmit}
        loading={loading}
      />

    </div>
  );
};

export default CreateDietPlan;