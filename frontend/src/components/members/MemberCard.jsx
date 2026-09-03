import {
  UserCircle,
  Eye,
  Pencil,
} from "lucide-react";

import { Link } from "react-router-dom";

const MemberCard = ({ member }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-center gap-4">

        <UserCircle
          size={48}
          className="text-slate-300"
        />

        <div className="flex-1">
          <h3 className="font-semibold text-slate-900">
            {member.name}
          </h3>

          <p className="text-sm text-slate-500">
            {member.email}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            member.status === "active"
              ? "bg-green-50 text-green-600"
              : "bg-red-50 text-red-600"
          }`}
        >
          {member.status || "inactive"}
        </span>

      </div>

      <div className="mt-5 flex gap-2">

        <Link
          to={`/admin/members/${member._id}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-100 py-2 text-sm font-medium"
        >
          <Eye size={16} />
          View
        </Link>

        <Link
          to={`/admin/members/${member._id}/edit`}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 py-2 text-sm font-medium text-white"
        >
          <Pencil size={16} />
          Edit
        </Link>

      </div>

    </div>
  );
};

export default MemberCard;