import { UserResponseDTO } from "../../User/dtos/UserResponseDTO";

export class PostResponseDTO {
  _id: string;
  user: UserResponseDTO;
  content: string;
  timestamp: Date;
  likes: number;
  retweets: number;

  constructor(post: any) {
    this._id = post._id;
    this.user = new UserResponseDTO(post.user || {}); 
    this.content = post.content;
    this.timestamp = post.timestamp;
    this.likes = post.likes || 0;
    this.retweets = post.retweets || 0;
   }
}