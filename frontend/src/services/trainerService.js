import api from "./api";

// Get all trainers
export const getTrainers = async (params = {}) => {
  const response = await api.get("/trainers", {
    params,
  });

  return response.data;
};

// Get trainer by ID
export const getTrainerById = async (id) => {
  const response = await api.get(`/trainers/${id}`);

  return response.data;
};

// Create trainer
export const createTrainer = async (trainerData) => {
  const response = await api.post(
    "/trainers",
    trainerData
  );

  return response.data;
};

// Update trainer
export const updateTrainer = async (
  id,
  trainerData
) => {
  const response = await api.put(
    `/trainers/${id}`,
    trainerData
  );

  return response.data;
};

// Delete trainer
export const deleteTrainer = async (id) => {
  const response = await api.delete(
    `/trainers/${id}`
  );

  return response.data;
};

// Assign member to trainer
export const assignMemberToTrainer = async (
  trainerId,
  memberId
) => {
  const response = await api.post(
    `/trainers/${trainerId}/assign-member`,
    {
      memberId,
    }
  );

  return response.data;
};

// Remove member from trainer
export const removeMemberFromTrainer = async (
  trainerId,
  memberId
) => {
  const response = await api.delete(
    `/trainers/${trainerId}/members/${memberId}`
  );

  return response.data;
};

// Get trainer's assigned members
export const getAssignedMembers = async (
  trainerId
) => {
  const response = await api.get(
    `/trainers/${trainerId}/members`
  );

  return response.data;
};