import api from "./api";

/* =========================================
   MEMBERSHIP PLAN MANAGEMENT
========================================= */

// Get all membership plans
export const getMembershipPlans = async () => {
  const response = await api.get("/memberships/plans");

  return response.data;
};


// Get single membership plan
export const getMembershipPlanById = async (id) => {
  const response = await api.get(
    `/memberships/plans/${id}`
  );

  return response.data;
};


// Create membership plan
export const createMembershipPlan = async (planData) => {
  const response = await api.post(
    "/memberships/plans",
    planData
  );

  return response.data;
};


// Update membership plan
export const updateMembershipPlan = async (
  id,
  planData
) => {
  const response = await api.put(
    `/memberships/plans/${id}`,
    planData
  );

  return response.data;
};


// Delete membership plan
export const deleteMembershipPlan = async (id) => {
  const response = await api.delete(
    `/memberships/plans/${id}`
  );

  return response.data;
};


/* =========================================
   MEMBER MEMBERSHIP
========================================= */

// Assign membership to member
export const assignMembership = async (membershipData) => {
  const response = await api.post(
    "/memberships/assign",
    membershipData
  );

  return response.data;
};


// Get member's current membership
export const getMemberMembership = async (memberId) => {
  const response = await api.get(
    `/memberships/member/${memberId}`
  );

  return response.data;
};


// Renew membership
export const renewMembership = async (
  membershipId,
  renewalData
) => {
  const response = await api.put(
    `/memberships/${membershipId}/renew`,
    renewalData
  );

  return response.data;
};


// Check membership expiry
export const checkMembershipExpiry = async () => {
  const response = await api.get(
    "/memberships/expiry"
  );

  return response.data;
};