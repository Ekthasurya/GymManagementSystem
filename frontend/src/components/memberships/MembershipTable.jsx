import {
  Pencil,
  Trash2,
} from "lucide-react";

import { Link } from "react-router-dom";

const MembershipTable = ({
  plans,
  onDelete,
}) => {
  if (!plans.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
        <p className="font-semibold text-slate-800">
          No membership plans found
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Create your first membership plan.
        </p>
      </div>
    );
  }


  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="w-full min-w-[800px]">

          <thead className="bg-slate-50">

            <tr>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                Plan
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                Duration
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                Price
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                Status
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase text-slate-500">
                Actions
              </th>

            </tr>

          </thead>


          <tbody className="divide-y divide-slate-100">

            {plans.map((plan) => (

              <tr
                key={plan._id}
                className="hover:bg-slate-50"
              >

                <td className="px-6 py-4">

                  <p className="font-semibold text-slate-900">
                    {plan.name}
                  </p>

                  <p className="text-sm text-slate-500">
                    {plan.description || "—"}
                  </p>

                </td>


                <td className="px-6 py-4 text-sm text-slate-600">
                  {plan.duration} days
                </td>


                <td className="px-6 py-4 font-semibold text-slate-800">
                  ₹{plan.price}
                </td>


                <td className="px-6 py-4">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      plan.status === "active"
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {plan.status}
                  </span>

                </td>


                <td className="px-6 py-4">

                  <div className="flex justify-end gap-2">

                    <Link
                      to={`/admin/memberships/${plan._id}/edit`}
                      className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Pencil size={17} />
                    </Link>

                    <button
                      onClick={() =>
                        onDelete(plan._id)
                      }
                      className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default MembershipTable;