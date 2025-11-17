import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { postApi } from '../api/posts/postApi'
import type { Post } from '../types/post'

export function usePosts() {
  return useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: postApi.getAll,
  })
}

export function usePost(id: string) {
  return useQuery<Post>({
    queryKey: ['post', id],
    queryFn: () => postApi.getById(id),
    enabled: !!id, 
  })
}

export function useUpdatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { post: string; content: string }) => postApi.update(data),
    onSuccess: (updatedPost: Post) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.setQueryData(['post', updatedPost.id], updatedPost);
    },
  });
}

export function usePostsByUser(id: string) {
  return useQuery<Post[]>({
    queryKey: ['posts', 'user', id],
    queryFn: () => postApi.getByIdUser(id),
    enabled: !!id,
  });
}


export function useCreatePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: postApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

export function useDeletePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: postApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}
