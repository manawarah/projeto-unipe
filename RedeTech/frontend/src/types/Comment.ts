import type { Post } from "./post";
import type { User } from "./User";

export interface Comment {
  id: string;
  user: User;
  post: Post
  content: string;
  timestamp: string;
  likes: number;
  liked?: boolean;
}