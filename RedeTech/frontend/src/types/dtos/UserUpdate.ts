import type { User } from "../User";

export interface UserUpdate extends User {
    repeteSenha: string
}