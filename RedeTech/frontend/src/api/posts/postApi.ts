import type { Post } from '../../types/post'
import { api } from '../http'

export const postApi = {
  getAll: async (): Promise<Post[]> => {
    const response = await api.get('/api/posts')
    return response.data;
  },
  getById: async (id: string): Promise<Post> => {
    const response = await api.get(`/api/posts/${id}`)
    return response.data;
  },
  getByIdUser: async (id: string): Promise<Post[]> => {
    const response = await api.get(`/api/posts/user/${id}`)
    return response.data;
  },
  create: async (data: any): Promise<Post> => {
    const response = await api.post('/api/posts', data)
    return response.data;
  },
  update: async (data: any): Promise<Post> => {
    const response = await api.put(`/api/posts/${data.post}`, data)
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/posts/${id}`)
  },
}
