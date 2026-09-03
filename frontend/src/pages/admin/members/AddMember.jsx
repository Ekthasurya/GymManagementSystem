import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import MemberForm from "../../../components/members/MemberForm";

import {
  createMember,
} from "../../../services/memberService";

const AddMember = () => {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);

      await createMember(data);

      toast.success(
        "Member created successfully"
      );

      navigate("/admin/members");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create member"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Add Member
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Create a new gym member.
        </p>
      </div>

      <MemberForm
        onSubmit={handleSubmit}
        loading={loading}
      />

    </div>
  );
};

export default AddMember;