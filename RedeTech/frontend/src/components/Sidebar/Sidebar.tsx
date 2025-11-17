import { Home, User, LogIn, UserPlus, LogOut, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import "./Sidebar.scss";
import { authApi } from "../../api/auth/authApi";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { useEffect } from "react";
import { fetchMe, logout } from "../../store/slices/authSlice";

export default function Sidebar() {

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);


  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  const sair = async () => {
    try {   
      await authApi.logout();
      dispatch(logout());
      window.location.href = "/login";
    } catch (error) {
      
    }
  }

  return (
    <aside className="sidebar">
      <ul>
        <li>
          <Link to="/">
            <Home size={20} color="white" />
            <span>Home</span>
          </Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to={`/profile/${user._id}`}>
                <User size={20} color="white" />
                <span>Meu Perfil</span>
              </Link>
            </li>
            <li>
              <Link to={`/configuracoes`}>
                <Settings size={20} color="white" />
                <span>Configurações</span>
              </Link>
            </li>
            <li>
              <a href="#" onClick={() => sair()}>
                <LogOut size={20} color="white" />
                <span>Sair</span>
              </a>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <LogIn size={20} color="white" />
                <span>Entrar</span>
              </Link>
            </li>
            <li>
              <Link to="/register">
                <UserPlus size={20} color="white" />
                <span>Criar Conta</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
}
