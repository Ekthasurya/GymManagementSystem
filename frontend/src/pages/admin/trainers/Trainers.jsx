import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import toast from "react-hot-toast";

import useTrainers from "../../../hooks/useTrainers";
import TrainerTable from "../../../components/trainers/TrainerTable";

const Trainers = () => {
  const {
    trainers,
    loading,
    removeTrainer,
  } = useTrainers();

  const [search, setSearch] =
    useState("");

  const filteredTrainers = useMemo(() => {
    const searchText =
      search.toLowerCase();

    return trainers.filter((trainer) => {
      return (
        trainer.name
          ?.toLowerCase()
          .includes(searchText) ||
        trainer.email
          ?.toLowerCase()
          .includes(searchText) ||
        trainer.specialization
          ?.toLowerCase()
          .includes(searchText)
      );
    });
  }, [trainers, search]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this trainer?"
    );

    if (!confirmed) return;

    try {
      await removeTrainer(id);

      toast.success(
        "Trainer deleted successfully"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete trainer"
      );
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>

          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Trainers
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your gym trainers.
          </p>

        </div>

        <Link
          to="/admin/trainers/add"
          className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          <Plus size={18} />
          Add Trainer
        </Link>

      </div>


      {/* Search */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

        <div className="relative">

          <Search
            size={19}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search trainer..."
            className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-slate-400"
          />

        </div>

      </div>


      {/* Count */}
      <p className="text-sm text-slate-500">
        Showing{" "}
        <span className="font-semibold text-slate-900">
          {filteredTrainers.length}
        </span>{" "}
        trainers
      </p>


      {/* Trainers */}
      {loading ? (

        <div className="rounded-2xl bg-white p-10 text-center">
          Loading trainers...
        </div>

      ) : (

        <TrainerTable
          trainers={filteredTrainers}
          onDelete={handleDelete}
        />

      )}

    </div>
  );
};

export default Trainers;