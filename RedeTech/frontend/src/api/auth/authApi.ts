import { api } from '../http';

export const authApi = {
  login: (data: any) => api.post(`/api/auth/login`, data),
  logout: () => api.post('/api/auth/logout'),
  me: () => api.get('/api/auth/me')
};
