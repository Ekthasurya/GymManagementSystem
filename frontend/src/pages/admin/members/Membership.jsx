import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import {
  getMemberMembership,
} from "../../services/membershipService";

import MembershipStatus from "../../components/memberships/MembershipStatus";

import RenewMembership from "../../components/memberships/RenewMembership";

import { useAuth } from "../../hooks/useAuth";

const Membership = () => {

  const { user } = useAuth();

  const [membership, setMembership] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    const fetchMembership =
      async () => {

        try {

          const response =
            await getMemberMembership(
              user._id
            );

          setMembership(
            response.data ||
              response
          );

        } catch (error) {

          toast.error(
            error.response?.data?.message ||
              "Failed to load membership"
          );

        } finally {

          setLoading(false);

        }

      };


    if (user?._id) {
      fetchMembership();
    }

  }, [user]);


  if (loading) {

    return (
      <div className="p-10 text-center">
        Loading membership...
      </div>
    );

  }


  if (!membership) {

    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">

        <h2 className="text-xl font-semibold text-slate-900">
          No Active Membership
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          You currently don't have a membership.
        </p>

      </div>
    );

  }


  const plan =
    membership.plan || {};


  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-2xl font-bold text-slate-900">
          My Membership
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View your current gym membership.
        </p>

      </div>


      {/* Membership Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex items-start justify-between">

          <div>

            <p className="text-sm text-slate-500">
              Current Plan
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              {plan.name ||
                "Membership"}
            </h2>

          </div>


          <MembershipStatus
            startDate={
              membership.startDate
            }
            endDate={
              membership.endDate
            }
            status={
              membership.status
            }
          />

        </div>


        <div className="mt-8 grid gap-5 sm:grid-cols-3">

          <div>

            <p className="text-xs uppercase text-slate-400">
              Start Date
            </p>

            <p className="mt-1 font-semibold text-slate-800">
              {membership.startDate
                ? new Date(
                    membership.startDate
                  ).toLocaleDateString()
                : "—"}
            </p>

          </div>


          <div>

            <p className="text-xs uppercase text-slate-400">
              Expiry Date
            </p>

            <p className="mt-1 font-semibold text-slate-800">
              {membership.endDate
                ? new Date(
                    membership.endDate
                  ).toLocaleDateString()
                : "—"}
            </p>

          </div>


          <div>

            <p className="text-xs uppercase text-slate-400">
              Price
            </p>

            <p className="mt-1 font-semibold text-slate-800">
              ₹{plan.price || 0}
            </p>

          </div>

        </div>

      </div>


      {/* Renew */}
      <RenewMembership
        membership={membership}
        onRenewed={setMembership}
      />

    </div>
  );
};

export default Membership;