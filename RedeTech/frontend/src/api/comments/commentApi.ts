import { api } from '../http';

export const commentApi = {
  getByPostId: (id: string) => api.get(`/api/comments/post/${id}`),
  create: (data: any) => api.post('/api/comments', data),
  update: (data: any) => api.put(`/api/comments/${data.comment}`, data),
  delete: (id: string) => api.delete(`/api/comments/${id}`),
};
