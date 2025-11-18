export class NewCommentDTO {
  content: string;
  post: string;

  constructor(comment: any) {
    this.content = comment.content;
    this.post = comment.post;
  }
}
