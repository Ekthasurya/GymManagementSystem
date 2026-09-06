import api from "./api";

// Get complete gym report
export const getGymReport = async () => {
  const response = await api.get("/reports");
  return response.data;
};

// Get membership report
export const getMembershipReport = async () => {
  const response = await api.get("/reports/memberships");
  return response.data;
};

// Get attendance report
export const getAttendanceReport = async () => {
  const response = await api.get("/reports/attendance");
  return response.data;
};

// Get revenue report
export const getRevenueReport = async () => {
  const response = await api.get("/reports/revenue");
  return response.data;
};