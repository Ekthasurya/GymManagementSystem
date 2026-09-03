import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import TrainerForm from "../../../components/trainers/TrainerForm";

import {
  createTrainer,
} from "../../../services/trainerService";

const AddTrainer = () => {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);

      await createTrainer(data);

      toast.success(
        "Trainer created successfully"
      );

      navigate("/admin/trainers");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create trainer"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Add Trainer
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Add a new trainer to your gym.
        </p>
      </div>

      <TrainerForm
        onSubmit={handleSubmit}
        loading={loading}
      />

    </div>
  );
};

export default AddTrainer;