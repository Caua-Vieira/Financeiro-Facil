import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MainPage from './components/mainPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />}>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
