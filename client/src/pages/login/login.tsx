import Icon from '@mdi/react';
import React, { useState } from 'react';
import { mdiAccount, mdiLock, mdiLockCheckOutline } from '@mdi/js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [confirmSenha, setConfirmSenha] = useState<string>()
    const [viewCadastro, setViewCadastro] = useState<boolean>(true)
    const [viewLogin, setViewLogin] = useState<boolean>(false)
    const [nomeBtn, setNomeBtn] = useState<string>("Entrar")

    const navigate = useNavigate()

    async function cadastraUsuario(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (senha !== confirmSenha) {
            return toast.info("As senhas são diferentes")
        } else if (!email) {
            return toast.info("Preencha todas as informações para prosseguir")
        }

        await axios.post(`http://localhost:8000/cadastra/usuario`, {
            email,
            senha
        }).then((resposta) => {
            toast.success(resposta.data.message)
            navigate("/main/dashboard")
        }).catch((erro) => {
            toast.error(erro.response.data.message)
        })
    }

    function loginUsuario(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

    }

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
                        <p className="text-muted">{
                            viewCadastro ?
                                "Faça login para acessar o sistema"
                                : "Realize o cadastro para acessar o sistema"
                        }</p>
                    </div>
                    <form onSubmit={nomeBtn === "Cadastrar" ? cadastraUsuario : loginUsuario}>
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
                                // required
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
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                // required
                                />
                            </div>
                        </div>
                        <div className="mb-3" hidden={viewCadastro}>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <Icon path={mdiLockCheckOutline} size={1} />
                                </span>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Confirme sua senha"
                                    value={confirmSenha}
                                    onChange={(e) => setConfirmSenha(e.target.value)}
                                // required
                                />
                            </div>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="rememberMe" />
                            <label className="form-check-label" htmlFor="rememberMe">Lembrar-me</label>
                        </div>
                        <div className='row'>
                            <div>
                                <button type="submit" className="btn btn-primary w-100"
                                    style={{
                                        background: 'linear-gradient(200deg, #343A40, #1C4B9B)',
                                        border: 'none'
                                    }}>
                                    {nomeBtn}
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="text-center mt-3">
                        <a
                            style={{ cursor: 'pointer' }}
                            hidden={viewLogin}
                            className="text-muted"
                            onClick={() => {
                                setViewCadastro(false)
                                setViewLogin(true)
                                setNomeBtn("Cadastrar")
                            }}
                        >
                            Não possui cadastro?
                        </a>
                    </div>
                    <div className="text-center mt-3">
                        <a
                            style={{ cursor: 'pointer' }}
                            hidden={viewCadastro}
                            className="text-muted"
                            onClick={() => {
                                setViewCadastro(true)
                                setViewLogin(false)
                                setNomeBtn("Login")
                            }}
                        >
                            Já possui login?
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default Login;
