import api from "./api";

// Get all progress records
export const getProgressRecords = async () => {
  const response = await api.get("/progress");
  return response.data;
};

// Get progress by ID
export const getProgressById = async (id) => {
  const response = await api.get(`/progress/${id}`);
  return response.data;
};

// Create progress record
export const createProgress = async (progressData) => {
  const response = await api.post("/progress", progressData);
  return response.data;
};

// Update progress record
export const updateProgress = async (id, progressData) => {
  const response = await api.put(`/progress/${id}`, progressData);
  return response.data;
};

// Delete progress record
export const deleteProgress = async (id) => {
  const response = await api.delete(`/progress/${id}`);
  return response.data;
};

// Get member progress
export const getMemberProgress = async (memberId) => {
  const response = await api.get(`/progress/member/${memberId}`);
  return response.data;
};

// Get logged-in member progress
export const getMyProgress = async () => {
  const response = await api.get("/progress/my");
  return response.data;
};