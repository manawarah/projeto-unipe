import { api } from '../http'

export const likeApi = {
  getPostLikes: async (postId: string): Promise<{ totalLikes: number; likedByUser: boolean }> => {
    const response = await api.get(`/api/likes/${postId}`);
    return response.data;
  },

  createLike: async (data: { post: string }): Promise<any> => {
    const response = await api.post('/api/likes', data);
    return response.data;
  },

  deleteLike: async (postId: string): Promise<any> => {
    const response = await api.delete(`/api/likes/${postId}`);
    return response.data;
  },
}
