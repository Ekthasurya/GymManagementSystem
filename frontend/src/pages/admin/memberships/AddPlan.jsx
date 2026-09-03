import { useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import MembershipForm from "../../../components/memberships/MembershipForm";

import {
  createMembershipPlan,
} from "../../../services/membershipService";

const AddPlan = () => {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);


  const handleSubmit = async (data) => {
    try {
      setLoading(true);

      await createMembershipPlan(data);

      toast.success(
        "Membership plan created successfully"
      );

      navigate("/admin/memberships");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to create membership plan"
      );

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Add Membership Plan
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Create a new membership plan.
        </p>

      </div>


      <MembershipForm
        onSubmit={handleSubmit}
        loading={loading}
      />

    </div>
  );
};

export default AddPlan;