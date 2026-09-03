import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import toast from "react-hot-toast";

import MemberForm from "../../../components/members/MemberForm";

import {
  getMemberById,
  updateMember,
} from "../../../services/memberService";

import PageLoader from "../../../components/common/PageLoader";

const EditMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [member, setMember] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response =
          await getMemberById(id);

        setMember(
          response.data || response
        );
      } catch (error) {
        toast.error(
          "Failed to load member"
        );

        navigate("/admin/members");
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [id, navigate]);

  const handleSubmit = async (data) => {
    try {
      setSaving(true);

      await updateMember(id, data);

      toast.success(
        "Member updated successfully"
      );

      navigate(`/admin/members/${id}`);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update member"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Edit Member
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Update member information.
        </p>
      </div>

      <MemberForm
        initialData={member}
        onSubmit={handleSubmit}
        loading={saving}
      />

    </div>
  );
};

export default EditMember;