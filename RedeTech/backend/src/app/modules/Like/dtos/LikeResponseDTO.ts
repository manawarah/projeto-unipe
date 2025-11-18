export class LikeResponseDTO {
    _id: string;
    post: string;
    user: string;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(user: any) {
        this._id = user._id.toString();
        this.post = user.post;
        this.user = user.user;
        this.updatedAt = user.updatedAt;
        this.createdAt = user.createdAt;
    }
}
