import Icon from '@mdi/react';
import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { mdiAccount, mdiLock } from '@mdi/js';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log('Login com:', email, password);
    };


    return (
        <div className="login-container d-flex align-items-center justify-content-center"
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(200deg, #343A40, #1C4B9B)',
            }}>
            <div className="card shadow" style={{ maxWidth: '500px', width: '100%' }}>
                <div className="card-body p-5">
                    <div className="text-center mb-4">
                        <h2 className="fw-bold" style={{ color: '#1C4B9B' }}>Bem-vindo</h2>
                        <p className="text-muted">Faça login para acessar o sistema</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <div className="input-group">
                                <span className="input-group-text">
                                    <Icon path={mdiAccount} size={1} />
                                </span>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="input-group">
                                <span className="input-group-text">
                                    <Icon path={mdiLock} size={1} />
                                </span>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="rememberMe" />
                            <label className="form-check-label" htmlFor="rememberMe">Lembrar-me</label>
                        </div>
                        <button type="submit" className="btn btn-primary w-100" onClick={() => navigate("/main/dashboard")}
                            style={{
                                background: 'linear-gradient(200deg, #343A40, #1C4B9B)',
                                border: 'none'
                            }}>
                            Entrar
                        </button>
                    </form>
                    <div className="text-center mt-3">
                        <a href="#" className="text-muted">Esqueceu sua senha?</a>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default Login;
