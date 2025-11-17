import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Home/HomePage'
import LoginPage from './pages/Auth/Login/LoginPage'
import Layout from './components/Layout/Layout'
import RegisterPage from './pages/Auth/Register/RegisterPage'
import ProfilePage from './pages/Profile/ProfilePage'
import { Toaster } from 'react-hot-toast'
import ConfiguracoesPage from './pages/Configuracoes/ConfiguracoesPage'

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/profile/:id' element={<ProfilePage />} />
            <Route path='/configuracoes' element={<ConfiguracoesPage />} />
          </Route>
        </Routes>
      </ BrowserRouter>
    </>
  )
}

export default App
