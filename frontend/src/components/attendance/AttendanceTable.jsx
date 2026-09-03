import MembershipStatus from "../memberships/MembershipStatus";

const AttendanceTable = ({
  attendance = [],
}) => {

  if (!attendance.length) {
    return (
      <div className="rounded-2xl border bg-white p-10 text-center">
        <p className="font-semibold text-slate-800">
          No attendance found
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Attendance records will appear here.
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
                Member
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                Date
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                Time In
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                Time Out
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                Status
              </th>

            </tr>

          </thead>


          <tbody className="divide-y divide-slate-100">

            {attendance.map(
              (record) => (

                <tr
                  key={record._id}
                  className="hover:bg-slate-50"
                >

                  <td className="px-6 py-4">

                    <p className="font-semibold text-slate-900">
                      {record.member?.name ||
                        "Unknown Member"}
                    </p>

                    <p className="text-sm text-slate-500">
                      {record.member?.email ||
                        ""}
                    </p>

                  </td>


                  <td className="px-6 py-4 text-sm text-slate-600">

                    {record.date
                      ? new Date(
                          record.date
                        ).toLocaleDateString()
                      : "—"}

                  </td>


                  <td className="px-6 py-4 text-sm font-medium text-green-600">

                    {record.timeIn
                      ? new Date(
                          record.timeIn
                        ).toLocaleTimeString()
                      : "—"}

                  </td>


                  <td className="px-6 py-4 text-sm font-medium text-orange-600">

                    {record.timeOut
                      ? new Date(
                          record.timeOut
                        ).toLocaleTimeString()
                      : "—"}

                  </td>


                  <td className="px-6 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        record.timeOut
                          ? "bg-green-50 text-green-600"
                          : "bg-yellow-50 text-yellow-600"
                      }`}
                    >
                      {record.timeOut
                        ? "Completed"
                        : "Checked In"}
                    </span>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AttendanceTable;