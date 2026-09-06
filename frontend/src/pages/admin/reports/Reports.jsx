import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Users,
  UserRound,
  CreditCard,
  CalendarCheck,
  IndianRupee,
  UserX,
} from "lucide-react";

import { getGymReport } from "../../../services/reportService";

import RevenueChart from "../../../components/dashboard/RevenueChart";
import AttendanceChart from "../../../components/dashboard/AttendanceChart";
import MembershipChart from "../../../components/dashboard/MembershipChart";

const Reports = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const data = await getGymReport();
      setReport(data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load reports"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        Loading reports...
      </div>
    );
  }

  if (!report) {
    return (
      <div className="p-6 text-center text-gray-500">
        No report data available.
      </div>
    );
  }

  const stats = [
    {
      title: "Total Members",
      value: report.totalMembers || 0,
      icon: Users,
    },
    {
      title: "Total Trainers",
      value: report.totalTrainers || 0,
      icon: UserRound,
    },
    {
      title: "Active Memberships",
      value: report.activeMemberships || 0,
      icon: CreditCard,
    },
    {
      title: "Today's Attendance",
      value: report.todayAttendance || 0,
      icon: CalendarCheck,
    },
    {
      title: "Total Revenue",
      value: `₹${(report.totalRevenue || 0).toLocaleString()}`,
      icon: IndianRupee,
    },
    {
      title: "Expired Memberships",
      value: report.expiredMemberships || 0,
      icon: UserX,
    },
  ];

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Reports
        </h1>

        <p className="text-gray-500 mt-1">
          Monitor gym performance and business statistics
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">

        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-white rounded-xl shadow p-5"
            >
              <div className="flex justify-between items-center">

                <div>
                  <p className="text-sm text-gray-500">
                    {item.title}
                  </p>

                  <h2 className="text-2xl font-bold mt-2">
                    {item.value}
                  </h2>
                </div>

                <Icon
                  size={28}
                  className="text-blue-600"
                />

              </div>
            </div>
          );
        })}

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <RevenueChart
          data={report.revenue || []}
        />

        <AttendanceChart
          data={report.attendance || []}
        />

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <MembershipChart
          data={report.memberships || []}
        />

        {/* Membership Summary */}
        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-lg font-semibold mb-5">
            Membership Summary
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">
              <span className="text-gray-500">
                Active
              </span>

              <span className="font-semibold">
                {report.activeMemberships || 0}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">
                Expired
              </span>

              <span className="font-semibold">
                {report.expiredMemberships || 0}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">
                Total
              </span>

              <span className="font-semibold">
                {report.totalMemberships || 0}
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* Recent Payments */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <div className="p-5 border-b">
          <h2 className="text-lg font-semibold">
            Recent Payments
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left">
                  Member
                </th>

                <th className="px-5 py-3 text-left">
                  Amount
                </th>

                <th className="px-5 py-3 text-left">
                  Date
                </th>

                <th className="px-5 py-3 text-left">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>

              {(report.recentPayments || []).map((payment) => (
                <tr
                  key={payment._id}
                  className="border-t"
                >
                  <td className="px-5 py-3">
                    {payment.member?.name || "N/A"}
                  </td>

                  <td className="px-5 py-3">
                    ₹{payment.amount?.toLocaleString() || 0}
                  </td>

                  <td className="px-5 py-3">
                    {payment.paymentDate
                      ? new Date(
                          payment.paymentDate
                        ).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="px-5 py-3">
                    <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                      {payment.status || "Paid"}
                    </span>
                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Reports;