import axiosInstance from "./axiosInstance";

/**
 * Fetch all courses/blogs
 * @param {Object} params - Query parameters (skip, limit, etc.)
 * @returns {Promise} Array of courses/blogs
 */
export const getAllCourses = async (params = {}) => {
  try {
    const response = await axiosInstance.get("/courseapi", { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetch all movies
 * @returns {Promise} Array of movies
 */
export const getAllMovies = async () => {
  try {
    const response = await axiosInstance.get("/getallmovie");
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Add a new course/comment
 * @param {Object} courseData - Course/comment data
 * @returns {Promise} API response with created data
 */
export const addCourse = async (courseData) => {
  try {
    const response = await axiosInstance.post("/courseapi", courseData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete a course/comment by ID
 * @param {string} id - Course/comment ID
 * @returns {Promise} API response
 */
export const deleteCourse = async (id) => {
  try {
    const response = await axiosInstance.delete(`/courseapi/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Update a course/comment by ID
 * @param {string} id - Course/comment ID
 * @param {Object} courseData - Updated course data
 * @returns {Promise} API response
 */
export const updateCourse = async (id, courseData) => {
  try {
    const response = await axiosInstance.put(`/courseapi/${id}`, courseData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
