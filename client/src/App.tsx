import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MainPage from './components/mainPage';
import Dashboard from './pages/dashboard/dashboard';
import Login from './pages/usuarioAutenticacao/usuarioAutenticacao';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RendaMensal from './pages/dashboard/rendaMensal/rendaMensal';
import Despesas from './pages/dashboard/despesas/despesas';
import Perfil from './pages/perfil/perfil';

function App() {
  return (
    <>
      <ToastContainer
        autoClose={2000}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/usuario/autenticacao/autenticacao" />} />

          <Route path="/usuario/autenticacao/:tipoAutenticacao" element={<Login />} />

          <Route path="/main" element={<MainPage />}>
            <Route path="dashboard" element={<Dashboard />} />

            <Route path='dashboard/rendaMensal' element={<RendaMensal />} />
            <Route path='dashboard/despesas' element={<Despesas />} />

            <Route path='perfil/usuario' element={<Perfil />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
