// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Helper function to get auth token from localStorage
export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Helper function to set auth token in localStorage
export const setAuthToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

// Helper function to remove auth token from localStorage
export const removeAuthToken = (): void => {
  localStorage.removeItem('authToken');
};

// Helper function to get user data from localStorage
export const getUserData = (): any | null => {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};

// Helper function to set user data in localStorage
export const setUserData = (userData: any): void => {
  localStorage.setItem('userData', JSON.stringify(userData));
};

// Helper function to remove user data from localStorage
export const removeUserData = (): void => {
  localStorage.removeItem('userData');
};

