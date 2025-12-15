// API Configuration
// In production, if VITE_API_URL is not set, use the same domain (Vercel deployment)
const getApiUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // For Vercel deployment, use relative path if same domain
  if (import.meta.env.PROD) {
    return '/api';
  }
  
  // Default for local development
  return 'http://localhost:3000/api';
};

export const API_BASE_URL = getApiUrl();

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

