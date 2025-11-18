export class LikeForPostResponseDTO {
    post: string;          
    totalLikes: number;    
    likedByUser: boolean;    

    constructor(postId: string, totalLikes: number, likedByUser: boolean) {
        this.post = postId;
        this.totalLikes = totalLikes;
        this.likedByUser = likedByUser;
    }
}
