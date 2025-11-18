export class UserResponseDTO {
    _id: string;
    nome: string;
    email: string;
    avatar?: string;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(user: any) {
        this._id = user._id;
        this.nome = user.nome;
        this.email = user.email;
        this.avatar = user.avatar;
        this.updatedAt = user.updatedAt;
        this.createdAt = user.createdAt;
    }
}
