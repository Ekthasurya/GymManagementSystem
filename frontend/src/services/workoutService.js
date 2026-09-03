import api from "./api";

/* =========================================
   WORKOUT PLANS
========================================= */

// Get all workouts
export const getWorkouts = async () => {
  const response = await api.get("/workouts");

  return response.data;
};


// Get single workout
export const getWorkoutById = async (id) => {
  const response = await api.get(
    `/workouts/${id}`
  );

  return response.data;
};


// Create workout
export const createWorkout = async (workoutData) => {
  const response = await api.post(
    "/workouts",
    workoutData
  );

  return response.data;
};


// Update workout
export const updateWorkout = async (
  id,
  workoutData
) => {
  const response = await api.put(
    `/workouts/${id}`,
    workoutData
  );

  return response.data;
};


// Delete workout
export const deleteWorkout = async (id) => {
  const response = await api.delete(
    `/workouts/${id}`
  );

  return response.data;
};


/* =========================================
   MEMBER WORKOUTS
========================================= */

// Get workouts assigned to a member
export const getMemberWorkouts = async (
  memberId
) => {
  const response = await api.get(
    `/workouts/member/${memberId}`
  );

  return response.data;
};


// Assign workout to member
export const assignWorkout = async (
  workoutData
) => {
  const response = await api.post(
    "/workouts/assign",
    workoutData
  );

  return response.data;
};


// Get logged-in member workouts
export const getMyWorkouts = async () => {
  const response = await api.get(
    "/workouts/my"
  );

  return response.data;
};


/* =========================================
   WORKOUT COMPLETION
========================================= */

// Mark workout completed
export const completeWorkout = async (
  workoutId,
  data = {}
) => {
  const response = await api.post(
    `/workouts/${workoutId}/complete`,
    data
  );

  return response.data;
};