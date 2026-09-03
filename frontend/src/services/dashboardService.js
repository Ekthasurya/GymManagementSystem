import api from "./api";

// Get dashboard statistics
export const getDashboardStats = async () => {
  const response = await api.get(
    "/dashboard/stats"
  );

  return response.data;
};


// Get revenue data
export const getRevenueData = async () => {
  const response = await api.get(
    "/dashboard/revenue"
  );

  return response.data;
};


// Get attendance data
export const getAttendanceData = async () => {
  const response = await api.get(
    "/dashboard/attendance"
  );

  return response.data;
};


// Get membership data
export const getMembershipData = async () => {
  const response = await api.get(
    "/dashboard/memberships"
  );

  return response.data;
};


// Get recent members
export const getRecentMembers = async () => {
  const response = await api.get(
    "/dashboard/recent-members"
  );

  return response.data;
};


// Get recent payments
export const getRecentPayments = async () => {
  const response = await api.get(
    "/dashboard/recent-payments"
  );

  return response.data;
};