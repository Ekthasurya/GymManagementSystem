import { useState } from "react";

import toast from "react-hot-toast";

import {
  renewMembership,
} from "../../services/membershipService";

const RenewMembership = ({
  membership,
  onRenewed,
}) => {
  const [loading, setLoading] =
    useState(false);

  const [days, setDays] =
    useState(
      membership?.plan?.duration || 30
    );


  const handleRenew = async () => {

    if (!days || days <= 0) {
      toast.error(
        "Enter a valid duration"
      );

      return;
    }


    try {

      setLoading(true);


      const response =
        await renewMembership(
          membership._id,
          {
            duration: Number(days),
          }
        );


      toast.success(
        "Membership renewed successfully"
      );


      if (onRenewed) {
        onRenewed(
          response.data || response
        );
      }

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to renew membership"
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h3 className="text-lg font-semibold text-slate-900">
        Renew Membership
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        Extend the member's current membership.
      </p>


      <div className="mt-5">

        <label className="mb-2 block text-sm font-medium text-slate-700">
          Renewal Duration (Days)
        </label>

        <input
          type="number"
          min="1"
          value={days}
          onChange={(e) =>
            setDays(e.target.value)
          }
          className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
        />

      </div>


      <button
        onClick={handleRenew}
        disabled={loading}
        className="mt-5 w-full rounded-xl bg-slate-900 py-3 font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
      >
        {loading
          ? "Renewing..."
          : "Renew Membership"}
      </button>

    </div>
  );
};

export default RenewMembership;