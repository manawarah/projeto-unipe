import { useState } from 'react'
import './CreatePost.scss'
import { useCreatePost } from '../../hooks/usePosts'
import toast from 'react-hot-toast'

export type PostPayload = { text: string }

export default function CreatePost({
  onPost,
  placeholder = 'No que você está pensando?',
}: {
  onPost?: (p: PostPayload) => void
  placeholder?: string
}) {
  const [content, setContent] = useState('');
  const { mutate: createPost, isPending } = useCreatePost();

  const submit = () => {
    if (!content.trim()) return;

    createPost(
      { content },
      {
        onSuccess: () => {
          toast.success('Sua postagem foi publicada com sucesso!')
          setContent('');
          if (onPost) onPost({ text: content })
        },
      onError: () => {
        toast.error('Ocorreu algum erro ao criar postagem. Tente novamente mais tarde')
      }
      }
    );
  }

  return (
    <div className="pc-simple">
      <textarea
        className="pc-simple-textarea"
        placeholder={placeholder}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="pc-simple-actions">
        <button
          className="pc-simple-btn"
          onClick={submit}
          disabled={!content.trim() || isPending}
        >
          {isPending ? 'Enviando...' : 'Criar postagem'}
        </button>
      </div>
    </div>
  )
}
