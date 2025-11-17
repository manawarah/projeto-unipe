import type { User } from '../../types/User';
import { api } from '../http';

export const userApi = {
  getAll: (): Promise<User[]> => api.get('/api/users'),
  getById: (id: string) => api.get(`/api/users/${id}`),
  getByName: (name: string) => api.get(`/api/users?prefix=${name}`),
  create: (data: any) => api.post('/api/users', data),
  update: (data: any) => api.put(`/api/users/${data._id}`, data),
  delete: (id: string) => api.delete(`/api/users/${id}`),
};
