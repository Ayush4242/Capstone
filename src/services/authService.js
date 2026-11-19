import API from './api';

export const authService = {
  // Register a new user
  register: async (userData) => {
    const response = await API.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('floatchat_token', response.data.token);
      localStorage.setItem('floatchat_user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Login existing user
  login: async (credentials) => {
    const response = await API.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('floatchat_token', response.data.token);
      localStorage.setItem('floatchat_user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Get current user profile
  getCurrentUser: async () => {
    const response = await API.get('/auth/me');
    return response.data;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('floatchat_token');
    localStorage.removeItem('floatchat_user');
  },
};
