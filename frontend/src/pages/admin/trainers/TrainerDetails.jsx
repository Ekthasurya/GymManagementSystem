import { useEffect, useState } from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import {
  Pencil,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  getTrainerById,
  getAssignedMembers,
  removeMemberFromTrainer,
} from "../../../services/trainerService";

import TrainerDetailsCard from "../../../components/trainers/TrainerDetails";

import AssignedMembers from "../../../components/trainers/AssignedMembers";

import PageLoader from "../../../components/common/PageLoader";

const TrainerDetailsPage = () => {
  const { id } = useParams();

  const [trainer, setTrainer] =
    useState(null);

  const [members, setMembers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          trainerResponse,
          membersResponse,
        ] = await Promise.all([
          getTrainerById(id),
          getAssignedMembers(id),
        ]);

        setTrainer(
          trainerResponse.data ||
            trainerResponse
        );

        setMembers(
          membersResponse.data ||
            membersResponse
        );
      } catch (error) {
        toast.error(
          "Failed to load trainer"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleRemoveMember = async (
    memberId
  ) => {
    const confirmed = window.confirm(
      "Remove this member from the trainer?"
    );

    if (!confirmed) return;

    try {
      await removeMemberFromTrainer(
        id,
        memberId
      );

      setMembers((prev) =>
        prev.filter(
          (member) =>
            member._id !== memberId
        )
      );

      toast.success(
        "Member removed successfully"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to remove member"
      );
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  if (!trainer) {
    return (
      <div className="py-20 text-center">
        Trainer not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-2xl font-bold text-slate-900">
            Trainer Details
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View trainer information and assigned members.
          </p>

        </div>

        <Link
          to={`/admin/trainers/${id}/edit`}
          className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
        >
          <Pencil size={17} />
          Edit
        </Link>

      </div>


      <TrainerDetailsCard
        trainer={trainer}
      />


      <AssignedMembers
        members={members}
        onRemove={handleRemoveMember}
      />

    </div>
  );
};

export default TrainerDetailsPage;