import { UserResponseDTO } from "../../User/dtos/UserResponseDTO";

export class CommentResponseDTO {
  id: string;
  user: UserResponseDTO;
  content: string;
  timestamp: Date;
  likes: number;
  liked: boolean;

  constructor(comment: any) {
    this.id = comment._id.toString();
    this.content = comment.content;
    this.timestamp = comment.timestamp;
    this.likes = comment.likes;
    this.liked = comment.liked;
    if (comment.user && typeof comment.user === 'object') {
      this.user = new UserResponseDTO(comment.user);
    } else {
      this.user = new UserResponseDTO({ _id: comment.user });
    }
  }
}
