export class NewUserDTO {
  nome: string;
  email: string;
  senha: string;
  avatar?: string;

  constructor(nome: string, email: string, senha: string, avatar?: string) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.avatar = avatar;
  }
}
