import "./Feed.scss"
import { useSelector } from "react-redux"
import type { RootState } from "../../store"
import PostBox from "../PostBox/PostBox"
import CreatePost from "../CreatePost/CreatePost"
import { usePosts } from "../../hooks/usePosts"
import type { Post } from "../../types/post"

export default function Feed() {
  const user = useSelector((state: RootState) => state.auth.user)
  const { data: posts, isLoading, isError } = usePosts();

  if (isLoading) return <main className="feed">Carregando...</main>
  if (isError) return <main className="feed">Erro ao carregar posts.</main>

  return (
    <main className="feed">
      {user && (
        <div className="feed-create-post">
          <CreatePost />
        </div>
      )}

      {posts && posts.length > 0 ? (
        posts.map((post: Post) => <PostBox key={post._id} post={post} />)
      ) : (
        <p>Nenhum post encontrado.</p>
      )}
    </main>
  )
}
