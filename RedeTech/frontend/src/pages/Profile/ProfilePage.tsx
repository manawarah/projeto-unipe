import { useEffect, useState } from "react";
import "./ProfilePage.scss";
import { formatDateTime } from "../../utils/helpers";
import { usePostsByUser } from "../../hooks/usePosts";
import PostBox from "../../components/PostBox/PostBox";
import { useParams } from "react-router-dom";
import type { Post } from "../../types/post";
import { userApi } from "../../api/users/userApi";
import type { User } from "../../types/User";

export default function ProfilePage() {

  const { id } = useParams<{ id: string }>();

  if(!id) return null;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function busca() {
      const data = await userApi.getById(id!);
      setUser(data.data);
    }

    if (id) busca();
  }, [id]);


  const { data: posts, isLoading } = usePostsByUser(id!);
  const [activeTab, setActiveTab] = useState<"posts">("posts");

  return (
    <div className="user-profile">
      <div className="user-profile__header">
        <div className="user-profile__name">
          <h2>{user?.nome}</h2>
          <p><strong>Id:</strong> @{user?._id}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Membro desde:</strong> {formatDateTime(user?.createdAt)}</p>
        </div>
      </div>

      <div className="user-profile__tabs">
        <button
          className={activeTab === "posts" ? "active" : ""}
          onClick={() => setActiveTab("posts")}
        >
          Postagens
        </button>
      </div>

      <div className="user-profile__content">

        {activeTab === "posts" && (
          <div className="user-profile__posts">
            {posts && posts.length > 0 ? (
              posts.map((post: Post) => <PostBox key={post._id} post={post} />)
            ) : (
              <p>Nenhum post encontrado.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
