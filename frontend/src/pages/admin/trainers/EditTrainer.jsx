import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import toast from "react-hot-toast";

import TrainerForm from "../../../components/trainers/TrainerForm";

import {
  getTrainerById,
  updateTrainer,
} from "../../../services/trainerService";

import PageLoader from "../../../components/common/PageLoader";

const EditTrainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trainer, setTrainer] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const response =
          await getTrainerById(id);

        setTrainer(
          response.data || response
        );
      } catch (error) {
        toast.error(
          "Failed to load trainer"
        );

        navigate("/admin/trainers");
      } finally {
        setLoading(false);
      }
    };

    fetchTrainer();
  }, [id, navigate]);

  const handleSubmit = async (data) => {
    try {
      setSaving(true);

      await updateTrainer(id, data);

      toast.success(
        "Trainer updated successfully"
      );

      navigate(`/admin/trainers/${id}`);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update trainer"
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
          Edit Trainer
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Update trainer information.
        </p>
      </div>

      <TrainerForm
        initialData={trainer}
        onSubmit={handleSubmit}
        loading={saving}
      />

    </div>
  );
};

export default EditTrainer;