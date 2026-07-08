import axiosInstance from "./axiosInstance";

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise} API response with user and token
 */
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/courseapi", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
