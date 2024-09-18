import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MainPage from './components/mainPage';
import Dashboard from './pages/dashboard/dashboard';
import Login from './pages/login/login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redireciona automaticamente para a tela de login ao acessar a raiz */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Tela de login */}
        <Route path="/login" element={<Login />} />

        {/* Página principal com as rotas aninhadas */}
        <Route path="/main" element={<MainPage />}>
          {/* O Dashboard é carregado dentro de MainPage */}
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
