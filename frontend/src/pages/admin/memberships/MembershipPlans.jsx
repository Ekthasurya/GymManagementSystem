import { Link } from "react-router-dom";
import {
  Plus,
  UserPlus,
} from "lucide-react";

import toast from "react-hot-toast";

import useMemberships from "../../../hooks/useMemberships";

import MembershipTable from "../../../components/memberships/MembershipTable";

const MembershipPlans = () => {
  const {
    plans,
    loading,
    removePlan,
  } = useMemberships();


  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this membership plan?"
    );

    if (!confirmed) return;


    try {
      await removePlan(id);

      toast.success(
        "Membership plan deleted successfully"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete membership plan"
      );
    }
  };


  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>

          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Membership Plans
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create and manage your gym membership plans.
          </p>

        </div>


        <div className="flex gap-3">

          <Link
            to="/admin/memberships/assign"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700"
          >
            <UserPlus size={18} />
            Assign Membership
          </Link>


          <Link
            to="/admin/memberships/add"
            className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
          >
            <Plus size={18} />
            Add Plan
          </Link>

        </div>

      </div>


      {/* Content */}
      {loading ? (

        <div className="rounded-2xl bg-white p-10 text-center">
          Loading membership plans...
        </div>

      ) : (

        <MembershipTable
          plans={plans}
          onDelete={handleDelete}
        />

      )}

    </div>
  );
};

export default MembershipPlans;