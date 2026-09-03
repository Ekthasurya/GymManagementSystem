import {
  Pencil,
  Trash2,
  Clock,
  IndianRupee,
} from "lucide-react";

import { Link } from "react-router-dom";

const MembershipCard = ({
  plan,
  onDelete,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-xl font-bold text-slate-900">
            {plan.name}
          </h3>

          <span
            className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
              plan.status === "active"
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-600"
            }`}
          >
            {plan.status}
          </span>

        </div>

      </div>


      <div className="mt-6 grid grid-cols-2 gap-4">

        <div className="rounded-xl bg-slate-50 p-4">

          <div className="flex items-center gap-2 text-slate-400">
            <Clock size={16} />

            <span className="text-xs">
              Duration
            </span>
          </div>

          <p className="mt-1 font-semibold text-slate-900">
            {plan.duration} days
          </p>

        </div>


        <div className="rounded-xl bg-slate-50 p-4">

          <div className="flex items-center gap-2 text-slate-400">
            <IndianRupee size={16} />

            <span className="text-xs">
              Price
            </span>
          </div>

          <p className="mt-1 font-semibold text-slate-900">
            ₹{plan.price}
          </p>

        </div>

      </div>


      {plan.description && (
        <p className="mt-5 text-sm leading-6 text-slate-500">
          {plan.description}
        </p>
      )}


      {plan.features?.length > 0 && (

        <ul className="mt-5 space-y-2">

          {plan.features.map(
            (feature, index) => (
              <li
                key={index}
                className="text-sm text-slate-600"
              >
                ✓ {feature}
              </li>
            )
          )}

        </ul>

      )}


      <div className="mt-6 flex gap-2">

        <Link
          to={`/admin/memberships/${plan._id}/edit`}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-100 py-3 text-sm font-semibold text-slate-700"
        >
          <Pencil size={16} />
          Edit
        </Link>

        <button
          onClick={() => onDelete(plan._id)}
          className="rounded-xl bg-red-50 px-4 py-3 text-red-600 hover:bg-red-100"
        >
          <Trash2 size={17} />
        </button>

      </div>

    </div>
  );
};

export default MembershipCard;