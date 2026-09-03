import api from "./api";

/* =========================================
   DIET PLAN MANAGEMENT
========================================= */

// Get all diet plans
export const getDietPlans = async () => {
  const response = await api.get("/diet-plans");

  return response.data;
};


// Get diet plan by ID
export const getDietPlanById = async (id) => {
  const response = await api.get(
    `/diet-plans/${id}`
  );

  return response.data;
};


// Create diet plan
export const createDietPlan = async (dietData) => {
  const response = await api.post(
    "/diet-plans",
    dietData
  );

  return response.data;
};


// Update diet plan
export const updateDietPlan = async (
  id,
  dietData
) => {
  const response = await api.put(
    `/diet-plans/${id}`,
    dietData
  );

  return response.data;
};


// Delete diet plan
export const deleteDietPlan = async (id) => {
  const response = await api.delete(
    `/diet-plans/${id}`
  );

  return response.data;
};


/* =========================================
   MEMBER DIET PLANS
========================================= */

// Get member's diet plans
export const getMemberDietPlans = async (
  memberId
) => {
  const response = await api.get(
    `/diet-plans/member/${memberId}`
  );

  return response.data;
};


// Get logged-in member's current diet
export const getMyDietPlan = async () => {
  const response = await api.get(
    "/diet-plans/my"
  );

  return response.data;
};