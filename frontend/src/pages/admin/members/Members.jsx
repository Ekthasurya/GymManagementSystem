import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

import MemberFilters from "../../../components/members/MemberFilters";
import MemberTable from "../../../components/members/MemberTable";

import useMembers from "../../../hooks/useMembers";

const Members = () => {
  const {
    members,
    loading,
    removeMember,
  } = useMembers();

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("all");

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const searchText =
        search.toLowerCase();

      const matchesSearch =
        member.name
          ?.toLowerCase()
          .includes(searchText) ||
        member.email
          ?.toLowerCase()
          .includes(searchText);

      const matchesStatus =
        status === "all" ||
        member.status === status;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [members, search, status]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this member?"
    );

    if (!confirmed) return;

    try {
      await removeMember(id);

      toast.success(
        "Member deleted successfully"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete member"
      );
    }
  };

  const handleReset = () => {
    setSearch("");
    setStatus("all");
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Members
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage all gym members.
          </p>
        </div>

        <Link
          to="/admin/members/add"
          className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          <Plus size={18} />

          Add Member
        </Link>

      </div>


      {/* Filters */}
      <MemberFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        onReset={handleReset}
      />


      {/* Count */}
      <div className="text-sm text-slate-500">
        Showing{" "}
        <span className="font-semibold text-slate-900">
          {filteredMembers.length}
        </span>{" "}
        members
      </div>


      {/* Table */}
      {loading ? (
        <div className="rounded-2xl bg-white p-10 text-center">
          Loading members...
        </div>
      ) : (
        <MemberTable
          members={filteredMembers}
          onDelete={handleDelete}
        />
      )}

    </div>
  );
};

export default Members;