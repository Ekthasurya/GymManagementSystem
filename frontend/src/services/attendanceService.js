import api from "./api";

/* =========================================
   QR
========================================= */

// Get gym QR information
export const getAttendanceQR = async () => {
  const response = await api.get("/attendance/qr");

  return response.data;
};


/* =========================================
   SCAN
========================================= */

// Scan attendance QR
export const scanAttendance = async (qrData) => {
  const response = await api.post(
    "/attendance/scan",
    qrData
  );

  return response.data;
};


/* =========================================
   ATTENDANCE
========================================= */

// Get today's attendance
export const getTodayAttendance = async () => {
  const response = await api.get(
    "/attendance/today"
  );

  return response.data;
};


// Get all attendance
export const getAllAttendance = async (params = {}) => {
  const response = await api.get(
    "/attendance",
    {
      params,
    }
  );

  return response.data;
};


// Get member attendance
export const getMemberAttendance = async (
  memberId,
  params = {}
) => {
  const response = await api.get(
    `/attendance/member/${memberId}`,
    {
      params,
    }
  );

  return response.data;
};


// Get logged-in member attendance
export const getMyAttendance = async (
  params = {}
) => {
  const response = await api.get(
    "/attendance/my",
    {
      params,
    }
  );

  return response.data;
};