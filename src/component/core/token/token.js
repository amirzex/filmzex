// tokenService.js

const TOKEN_KEY = "user_token";

/**
 * Save token to localStorage
 * @param {string} token - The token to store
 */
export const saveToken = (token) => {
  if (typeof token === "string" && token.trim() !== "") {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

/**
 * Retrieve token from localStorage
 * @returns {string|null} - The stored token or null if not found
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Remove token from localStorage
 */
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * Check if a token exists
 * @returns {boolean}
 */
export const hasToken = () => {
  return !!getToken();
};
