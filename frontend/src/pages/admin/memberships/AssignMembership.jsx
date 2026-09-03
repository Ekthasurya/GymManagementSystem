import { useEffect, useState } from "react";

import {
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  assignMembership,
} from "../../../services/membershipService";

import {
  getMembershipPlans,
} from "../../../services/membershipService";

import {
  getMembers,
} from "../../../services/memberService";

const AssignMembership = () => {

  const navigate = useNavigate();


  const [members, setMembers] =
    useState([]);

  const [plans, setPlans] =
    useState([]);


  const [form, setForm] =
    useState({
      memberId: "",
      planId: "",
      startDate: "",
    });


  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);


  useEffect(() => {

    const fetchData = async () => {

      try {

        const [
          membersResponse,
          plansResponse,
        ] = await Promise.all([
          getMembers(),
          getMembershipPlans(),
        ]);


        setMembers(
          membersResponse.data ||
            membersResponse
        );


        setPlans(
          plansResponse.data ||
            plansResponse
        );

      } catch (error) {

        toast.error(
          "Failed to load members and plans"
        );

      } finally {

        setLoading(false);

      }

    };


    fetchData();

  }, []);


  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;


    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  const handleSubmit = async (e) => {

    e.preventDefault();


    if (
      !form.memberId ||
      !form.planId ||
      !form.startDate
    ) {

      toast.error(
        "Please fill all required fields"
      );

      return;
    }


    try {

      setSaving(true);


      await assignMembership({
        memberId: form.memberId,
        planId: form.planId,
        startDate: form.startDate,
      });


      toast.success(
        "Membership assigned successfully"
      );


      navigate("/admin/memberships");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to assign membership"
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
    <div className="mx-auto max-w-3xl space-y-6">

      <div>

        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Assign Membership
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Assign a membership plan to a gym member.
        </p>

      </div>


      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >

        <div className="space-y-5">


          {/* Member */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Select Member *
            </label>

            <select
              name="memberId"
              value={form.memberId}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400"
            >

              <option value="">
                Select member
              </option>

              {members.map(
                (member) => (

                  <option
                    key={member._id}
                    value={member._id}
                  >
                    {member.name} —{" "}
                    {member.email}
                  </option>

                )
              )}

            </select>

          </div>


          {/* Plan */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Membership Plan *
            </label>

            <select
              name="planId"
              value={form.planId}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400"
            >

              <option value="">
                Select membership plan
              </option>

              {plans
                .filter(
                  (plan) =>
                    plan.status ===
                    "active"
                )
                .map((plan) => (

                  <option
                    key={plan._id}
                    value={plan._id}
                  >
                    {plan.name} — ₹
                    {plan.price} —{" "}
                    {plan.duration} days
                  </option>

                ))}

            </select>

          </div>


          {/* Start Date */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Start Date *
            </label>

            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
            />

          </div>


          {/* Submit */}
          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl bg-slate-900 py-3 font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
          >
            {saving
              ? "Assigning..."
              : "Assign Membership"}
          </button>

        </div>

      </form>

    </div>
  );
};

export default AssignMembership;