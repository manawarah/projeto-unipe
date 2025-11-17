export interface User {
  _id: string;
  nome: string;
  avatar: string;
  email: string;
  senha: string;
  createdAt?: Date;
  updatedAt?: Date;
}