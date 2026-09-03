import { useEffect, useState } from "react";
import {
  Link,
  useParams,
} from "react-router-dom";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";

import {
  getMemberById,
} from "../../../services/memberService";

import MemberDetailsCard from "../../../components/members/MemberDetails";

import PageLoader from "../../../components/common/PageLoader";

const MemberDetails = () => {
  const { id } = useParams();

  const [member, setMember] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [id]);

  if (loading) {
    return <PageLoader />;
  }

  if (!member) {
    return (
      <div className="py-20 text-center">
        Member not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Member Details
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View complete member information.
          </p>
        </div>

        <Link
          to={`/admin/members/${id}/edit`}
          className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
        >
          <Pencil size={17} />

          Edit
        </Link>

      </div>

      <MemberDetailsCard
        member={member}
      />

    </div>
  );
};

export default MemberDetails;