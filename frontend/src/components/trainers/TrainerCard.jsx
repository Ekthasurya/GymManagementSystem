import {
  UserCircle,
  Eye,
  Pencil,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";

const TrainerCard = ({ trainer }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-start gap-4">

        <UserCircle
          size={55}
          className="text-slate-300"
        />

        <div className="flex-1">

          <div className="flex items-start justify-between gap-2">

            <div>
              <h3 className="font-semibold text-slate-900">
                {trainer.name}
              </h3>

              <p className="text-sm text-slate-500">
                {trainer.email}
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                trainer.status === "active"
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {trainer.status}
            </span>

          </div>

        </div>

      </div>

      <div className="mt-5 space-y-2 text-sm text-slate-600">

        <p>
          <span className="font-medium">
            Specialization:
          </span>{" "}
          {trainer.specialization ||
            "—"}
        </p>

        <p>
          <span className="font-medium">
            Experience:
          </span>{" "}
          {trainer.experience
            ? `${trainer.experience} years`
            : "—"}
        </p>

      </div>

      <div className="mt-5 flex gap-2">

        <Link
          to={`/admin/trainers/${trainer._id}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-100 py-2 text-sm font-medium"
        >
          <Eye size={16} />
          View
        </Link>

        <Link
          to={`/admin/trainers/${trainer._id}/edit`}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 py-2 text-sm font-medium text-white"
        >
          <Pencil size={16} />
          Edit
        </Link>

      </div>

    </div>
  );
};

export default TrainerCard;