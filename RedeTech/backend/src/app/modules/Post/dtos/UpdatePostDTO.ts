export class UpdatePostDTO {
  post: string;
  content: string;   

  constructor(data: {
    post: string;
    content: string;
  }) {
    this.post = data.post;
    this.content = data.content;
  }
}
