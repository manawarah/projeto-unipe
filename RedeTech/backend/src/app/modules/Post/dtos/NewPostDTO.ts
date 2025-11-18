export class NewPostDTO {
  user: string; 
  content: string;   

  constructor(data: {
    user: string;
    content: string;
  }) {
    this.user = data.user;
    this.content = data.content;
  }
}
