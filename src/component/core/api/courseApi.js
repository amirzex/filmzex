import axiosInstance from "./axiosInstance";

/**
 * Fetch all movies
 * @param {Object} params - Query parameters (skip, limit, etc.)
 * @returns {Promise} Array of movies
 */
export const getAllCourses = async (params = {}) => {
  try {
    const response = await axiosInstance.get("/getallmovie", { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetch all movies (alias)
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
 * Fetch a single movie by ID
 * @param {string} id - Movie ID
 * @returns {Promise} Movie object
 */
export const getMovieById = async (id) => {
  try {
    const response = await axiosInstance.get(`/getallmovie/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Update a movie by ID (used to persist embedded comments)
 * @param {string} id - Movie ID
 * @param {Object} movieData - Full/partial movie object to update
 * @returns {Promise} Updated movie object
 */
export const updateMovie = async (id, movieData) => {
  try {
    const response = await axiosInstance.put(`/getallmovie/${id}`, movieData);
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
