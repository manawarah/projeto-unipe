import { UserResponseDTO } from "../../User/dtos/UserResponseDTO";

export class LoginResponseDTO {
    token: string;
    user: UserResponseDTO;

    constructor(token: string, user: UserResponseDTO) {
        this.token = token;
        this.user = user;
    }
    
}