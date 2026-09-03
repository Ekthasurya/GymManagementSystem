import api from "./api";

// Login
export const loginUser = async (credentials) => {
  const response = await api.post(
    "/auth/login",
    credentials
  );

  return response.data;
};

// Register
export const registerUser = async (userData) => {
  const response = await api.post(
    "/auth/register",
    userData
  );

  return response.data;
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Get current user
export const getStoredUser = () => {
  const user = localStorage.getItem("user");

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch (error) {
    localStorage.removeItem("user");
    return null;
  }
};

// Save authentication data
export const saveAuthData = (data) => {
  if (data.token) {
    localStorage.setItem(
      "token",
      data.token
    );
  }

  if (data.user) {
    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );
  }
};

// Forgot Password
export const forgotPassword = async (email) => {
  const response = await api.post(
    "/auth/forgot-password",
    { email }
  );

  return response.data;
};


// Reset Password
export const resetPassword = async (
  token,
  password
) => {
  const response = await api.post(
    `/auth/reset-password/${token}`,
    { password }
  );

  return response.data;
};