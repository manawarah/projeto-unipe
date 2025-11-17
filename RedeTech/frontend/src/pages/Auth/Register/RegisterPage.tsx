import { useForm } from "react-hook-form";
import "./RegisterPage.scss";
import Input from "../../../components/Input/Input";
import type { User } from "../../../types/User";
import { Link, useNavigate } from "react-router-dom";
import { userApi } from "../../../api/users/userApi";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<User>();
  const navigate = useNavigate();

  const senha = watch("senha");

  const onSubmit = async (data: User) => {
    try {
      await userApi.create(data);
      toast.success("Usuário criado com sucesso! Faça login para continuar");
      navigate("/login");
    } catch (error) {
      toast.error("Ocorreu algum erro ao criar o usuário");
    }
  };

  return (
    <div className="register">
      <div className="register__box">
        <h2>Criar conta</h2>
        <form onSubmit={handleSubmit(onSubmit)}>

          <Input
            type="text"
            placeholder="Nome"
            {...register("nome", { required: "Nome é obrigatório" })}
            error={errors?.nome?.message || null}
          />

          <Input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email é obrigatório",
              pattern: { value: /^\S+@\S+$/i, message: "Email inválido" },
            })}
            error={errors?.email?.message || null}
          />

          <Input
            type="password"
            placeholder="Senha"
            {...register("senha", {
              required: "Senha é obrigatória",
              minLength: { value: 6, message: "Mínimo 6 caracteres" },
            })}
            error={errors?.senha?.message || null}
          />

          <Input
            type="password"
            placeholder="Repita a senha"
            {...register("confirmarSenha", {
              required: "Confirme a senha",
              validate: value =>
                value === senha || "As senhas não coincidem",
            })}
            error={errors?.confirmarSenha?.message || null}
          />

          <button type="submit">Cadastrar</button>
        </form>

        <p className="login__register">
          Já tem conta? <Link to="/login">Faça login</Link>
        </p>
      </div>
    </div>
  );
}
