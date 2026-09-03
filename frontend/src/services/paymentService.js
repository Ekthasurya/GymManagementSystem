import api from "./api";

// ==========================================
// GET ALL PAYMENTS - ADMIN
// ==========================================

export const getAllPayments = async (params = {}) => {
  const response = await api.get("/payments", {
    params,
  });

  return response.data;
};


// ==========================================
// CREATE PAYMENT - ADMIN
// ==========================================

export const createPayment = async (paymentData) => {
  const response = await api.post(
    "/payments",
    paymentData
  );

  return response.data;
};


// ==========================================
// GET PAYMENT BY ID
// ==========================================

export const getPaymentById = async (paymentId) => {
  const response = await api.get(
    `/payments/${paymentId}`
  );

  return response.data;
};


// ==========================================
// UPDATE PAYMENT
// ==========================================

export const updatePayment = async (
  paymentId,
  paymentData
) => {
  const response = await api.put(
    `/payments/${paymentId}`,
    paymentData
  );

  return response.data;
};


// ==========================================
// DELETE PAYMENT
// ==========================================

export const deletePayment = async (paymentId) => {
  const response = await api.delete(
    `/payments/${paymentId}`
  );

  return response.data;
};


// ==========================================
// GET MEMBER PAYMENTS - ADMIN
// ==========================================

export const getMemberPayments = async (
  memberId,
  params = {}
) => {
  const response = await api.get(
    `/payments/member/${memberId}`,
    {
      params,
    }
  );

  return response.data;
};


// ==========================================
// GET MY PAYMENTS - MEMBER
// ==========================================

export const getMyPayments = async (
  params = {}
) => {
  const response = await api.get(
    "/payments/my",
    {
      params,
    }
  );

  return response.data;
};


// ==========================================
// GET PAYMENT RECEIPT
// ==========================================

export const getPaymentReceipt = async (
  paymentId
) => {
  const response = await api.get(
    `/payments/${paymentId}/receipt`
  );

  return response.data;
};