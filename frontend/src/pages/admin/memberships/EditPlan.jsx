import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import toast from "react-hot-toast";

import MembershipForm from "../../../components/memberships/MembershipForm";

import {
  getMembershipPlanById,
  updateMembershipPlan,
} from "../../../services/membershipService";

const EditPlan = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [plan, setPlan] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);


  useEffect(() => {

    const fetchPlan = async () => {

      try {

        const response =
          await getMembershipPlanById(id);

        setPlan(
          response.data || response
        );

      } catch (error) {

        toast.error(
          "Failed to load membership plan"
        );

        navigate("/admin/memberships");

      } finally {

        setLoading(false);

      }
    };


    fetchPlan();

  }, [id, navigate]);


  const handleSubmit = async (data) => {

    try {

      setSaving(true);

      await updateMembershipPlan(
        id,
        data
      );

      toast.success(
        "Membership plan updated successfully"
      );

      navigate("/admin/memberships");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to update membership plan"
      );

    } finally {

      setSaving(false);

    }
  };


  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }


  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Edit Membership Plan
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Update membership plan information.
        </p>

      </div>


      <MembershipForm
        initialData={plan}
        onSubmit={handleSubmit}
        loading={saving}
      />

    </div>
  );
};

export default EditPlan;