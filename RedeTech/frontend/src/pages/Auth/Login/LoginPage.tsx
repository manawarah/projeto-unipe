import { useForm } from "react-hook-form";
import "./LoginPage.scss";
import Input from "../../../components/Input/Input";
import { Link } from "react-router-dom";
import { authApi } from "../../../api/auth/authApi";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store";
import { fetchMe } from "../../../store/slices/authSlice";
import toast from "react-hot-toast";

type FormData = {
  email: string;
  senha: string;
};

export default function LoginPage() {
  const { register, handleSubmit } = useForm<FormData>();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async(data: FormData) => {
    try {
      await authApi.login(data);
      dispatch(fetchMe());
      window.location.href = "/";
    } catch (error) {
      toast.error("Credenciais inválidas")
    }
  };

  return (
    <div className="login">
      <div className="login__box">
        <h2>Entrar</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="Email"
            {...register("email")}
          />

          <Input
            type="password"
            placeholder="Senha"
            {...register("senha")}
          />

          <button type="submit">Login</button>
        </form>
        <p className="login__register">
          Não tem conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}

