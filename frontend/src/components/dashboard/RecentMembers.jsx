import { Link } from "react-router-dom";
import { UserCircle } from "lucide-react";

const RecentMembers = ({
  members = [],
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="flex items-center justify-between border-b border-slate-100 p-6">

        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Recent Members
          </h2>

          <p className="text-sm text-slate-500">
            Recently registered members
          </p>
        </div>

        <Link
          to="/admin/members"
          className="text-sm font-semibold text-slate-900 hover:underline"
        >
          View All
        </Link>

      </div>

      <div className="divide-y divide-slate-100">

        {members.length === 0 ? (
          <p className="p-6 text-center text-sm text-slate-500">
            No members found.
          </p>
        ) : (
          members.map((member) => (
            <div
              key={member._id}
              className="flex items-center justify-between p-5"
            >

              <div className="flex items-center gap-3">

                <UserCircle
                  size={40}
                  className="text-slate-300"
                />

                <div>
                  <p className="font-medium text-slate-900">
                    {member.name}
                  </p>

                  <p className="text-xs text-slate-500">
                    {member.email}
                  </p>
                </div>

              </div>

              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
                Member
              </span>

            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default RecentMembers;