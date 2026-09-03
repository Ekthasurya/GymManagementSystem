import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import StatCard from "../../components/dashboard/StatCard";
import RevenueChart from "../../components/dashboard/RevenueChart";
import AttendanceChart from "../../components/dashboard/AttendanceChart";
import MembershipChart from "../../components/dashboard/MembershipChart";
import RecentMembers from "../../components/dashboard/RecentMembers";
import RecentPayments from "../../components/dashboard/RecentPayments";

import {
  getDashboardStats,
  getRevenueData,
  getAttendanceData,
  getMembershipData,
  getRecentMembers,
  getRecentPayments,
} from "../../services/dashboardService";

import PageLoader from "../../components/common/PageLoader";

const Dashboard = () => {
  const [loading, setLoading] =
    useState(true);

  const [stats, setStats] =
    useState({});

  const [revenue, setRevenue] =
    useState([]);

  const [attendance, setAttendance] =
    useState([]);

  const [memberships, setMemberships] =
    useState({});

  const [recentMembers, setRecentMembers] =
    useState([]);

  const [recentPayments, setRecentPayments] =
    useState([]);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);

        const [
          statsData,
          revenueData,
          attendanceData,
          membershipData,
          membersData,
          paymentsData,
        ] = await Promise.all([
          getDashboardStats(),
          getRevenueData(),
          getAttendanceData(),
          getMembershipData(),
          getRecentMembers(),
          getRecentPayments(),
        ]);

        setStats(
          statsData.data || statsData
        );

        setRevenue(
          revenueData.data || revenueData
        );

        setAttendance(
          attendanceData.data ||
            attendanceData
        );

        setMemberships(
          membershipData.data ||
            membershipData
        );

        setRecentMembers(
          membersData.data ||
            membersData
        );

        setRecentPayments(
          paymentsData.data ||
            paymentsData
        );

      } catch (error) {
        console.error(
          "Dashboard error:",
          error
        );

        toast.error(
          "Failed to load dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Admin Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Here's what's happening with your
          gym today.
        </p>
      </div>


      {/* Statistics */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">

        <StatCard
          title="Total Members"
          value={stats.totalMembers || 0}
          type="members"
          description="Registered members"
        />

        <StatCard
          title="Active Members"
          value={
            stats.activeMembers || 0
          }
          type="activeMembers"
          description="Currently active"
        />

        <StatCard
          title="Today's Attendance"
          value={
            stats.todayAttendance || 0
          }
          type="attendance"
          description="Members checked in"
        />

        <StatCard
          title="Total Revenue"
          value={`₹${stats.totalRevenue || 0}`}
          type="revenue"
          description="Current revenue"
        />

        <StatCard
          title="Expiring Soon"
          value={
            stats.expiringMemberships || 0
          }
          type="expiring"
          description="Memberships"
        />

      </div>


      {/* Charts */}
      <div className="grid gap-6 xl:grid-cols-2">

        <RevenueChart
          data={revenue}
        />

        <AttendanceChart
          data={attendance}
        />

      </div>


      {/* Membership + Recent */}
      <div className="grid gap-6 xl:grid-cols-3">

        <div className="xl:col-span-1">
          <MembershipChart
            data={memberships}
          />
        </div>

        <div className="xl:col-span-2">
          <RecentMembers
            members={recentMembers}
          />
        </div>

      </div>


      {/* Payments */}
      <RecentPayments
        payments={recentPayments}
      />

    </div>
  );
};

export default Dashboard;