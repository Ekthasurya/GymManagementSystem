import {
  Eye,
  Pencil,
  Trash2,
  UserCircle,
} from "lucide-react";

import { Link } from "react-router-dom";

const TrainerTable = ({
  trainers,
  onDelete,
}) => {
  if (!trainers.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">

        <UserCircle
          size={45}
          className="mx-auto text-slate-300"
        />

        <h3 className="mt-4 font-semibold text-slate-800">
          No trainers found
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Try changing your search.
        </p>

      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="w-full min-w-[1000px]">

          <thead className="border-b border-slate-200 bg-slate-50">

            <tr>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                Trainer
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                Phone
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                Specialization
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                Experience
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

            {trainers.map((trainer) => (

              <tr
                key={trainer._id}
                className="transition hover:bg-slate-50"
              >

                <td className="px-6 py-4">

                  <div className="flex items-center gap-3">

                    <UserCircle
                      size={42}
                      className="text-slate-300"
                    />

                    <div>

                      <p className="font-semibold text-slate-900">
                        {trainer.name}
                      </p>

                      <p className="text-sm text-slate-500">
                        {trainer.email}
                      </p>

                    </div>

                  </div>

                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {trainer.phone || "—"}
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {trainer.specialization || "—"}
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {trainer.experience
                    ? `${trainer.experience} years`
                    : "—"}
                </td>

                <td className="px-6 py-4">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      trainer.status ===
                      "active"
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {trainer.status ||
                      "inactive"}
                  </span>

                </td>

                <td className="px-6 py-4">

                  <div className="flex justify-end gap-2">

                    <Link
                      to={`/admin/trainers/${trainer._id}`}
                      className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                      title="View"
                    >
                      <Eye size={17} />
                    </Link>

                    <Link
                      to={`/admin/trainers/${trainer._id}/edit`}
                      className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                      title="Edit"
                    >
                      <Pencil size={17} />
                    </Link>

                    <button
                      onClick={() =>
                        onDelete(
                          trainer._id
                        )
                      }
                      className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                      title="Delete"
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

export default TrainerTable;