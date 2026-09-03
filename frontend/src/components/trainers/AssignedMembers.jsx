import {
  UserCircle,
  Trash2,
} from "lucide-react";

const AssignedMembers = ({
  members = [],
  onRemove,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-100 p-6">

        <h2 className="text-lg font-semibold text-slate-900">
          Assigned Members
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Members assigned to this trainer.
        </p>

      </div>

      {members.length === 0 ? (

        <div className="p-10 text-center">

          <UserCircle
            size={45}
            className="mx-auto text-slate-300"
          />

          <p className="mt-3 text-sm text-slate-500">
            No members assigned.
          </p>

        </div>

      ) : (

        <div className="divide-y divide-slate-100">

          {members.map((member) => (

            <div
              key={member._id}
              className="flex items-center justify-between p-5"
            >

              <div className="flex items-center gap-3">

                <UserCircle
                  size={42}
                  className="text-slate-300"
                />

                <div>

                  <p className="font-medium text-slate-900">
                    {member.name}
                  </p>

                  <p className="text-sm text-slate-500">
                    {member.email}
                  </p>

                </div>

              </div>

              <button
                onClick={() =>
                  onRemove(member._id)
                }
                className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                title="Remove member"
              >
                <Trash2 size={17} />
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default AssignedMembers;