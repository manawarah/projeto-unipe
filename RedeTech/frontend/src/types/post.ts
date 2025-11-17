import type { Comment } from "./Comment";
import type { User } from "./User";

export interface Post {
  _id: string;
  user: User;
  content: string;
  timestamp: string;
  likes: number;
  retweets: number;
  comments: Comment[];
}
