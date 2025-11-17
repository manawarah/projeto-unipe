import { useForm } from "react-hook-form";
import "./Configuracoes.scss";
import { userApi } from "../../api/users/userApi";
import Input from "../../components/Input/Input";
import type { UserUpdate } from "../../types/dtos/UserUpdate";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMe } from "../../store/slices/authSlice";

export default function ConfiguracoesPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<UserUpdate>();

  const senha = watch("senha");
  const repeteSenha = watch("repeteSenha");

  useEffect(() => {
    if (user) {
      setValue("_id", user._id);
      setValue("nome", user.nome);
      setValue("email", user.email);
    }
  }, [user, setValue]);

  const onSubmit = async (data: UserUpdate) => {
    if (senha && senha !== repeteSenha) {
      toast.error("As senhas não coincidem");
      return;
    }

    try {
      await userApi.update(data);
      dispatch(fetchMe());
      navigate(`/configuracoes`);
      toast.success("Perfil atualizado com sucesso");
    } catch {
      toast.error("Ocorreu algum erro ao atualizar o perfil. Tente novamente mais tarde");
    }
  };

  const deletarConta = async () => {
    if (!user?._id) return;

    const confirmado = confirm("Tem certeza que deseja deletar sua conta? Essa ação é irreversível.");
    if (!confirmado) return;

    try {
      await userApi.delete(user._id);
      toast.success("Conta deletada com sucesso");
      window.location.href = "/login";
    } catch {
      toast.error("Erro ao deletar a conta. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="register">
      <div className="register__box">
        <h2>Atualizar dados</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input type="hidden" {...register("_id")} />

          <Input
            type="text"
            placeholder="Nome"
            {...register("nome", { required: "Nome é obrigatório" })}
            error={errors?.nome?.message || null}
          />

          <Input
            type="email"
            placeholder="Email"
            {...register("email")}
            disabled
          />

          <Input
            type="password"
            placeholder="Nova senha"
            {...register("senha", {
              minLength: { value: 6, message: "Mínimo 6 caracteres" },
            })}
            error={errors?.senha?.message || null}
          />

          <Input
            type="password"
            placeholder="Repita a nova senha"
            {...register("repeteSenha")}
          />

          <button
            type="submit"
            disabled={!isDirty}
            style={{
              opacity: !isDirty ? 0.6 : 1,
              cursor: !isDirty ? "not-allowed" : "pointer",
            }}
          >
            Atualizar
          </button>
        </form>

        <h2>Deletar Conta</h2>
        <p>Ao deletar sua conta, todos os seus dados serão permanentemente removidos do sistema. Essa ação é irreversível e não poderá ser desfeita.</p>
        <button className="btn_danger" onClick={deletarConta}>
          Deletar Conta
        </button>
      </div>
    </div>
  );
}
