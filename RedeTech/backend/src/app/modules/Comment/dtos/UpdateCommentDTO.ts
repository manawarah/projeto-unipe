export class UpdateCommentDTO {
  content: string;
  comment: string;

  constructor(comment: any) {
    this.content = comment.content;
    this.comment = comment.comment;
  }
}
