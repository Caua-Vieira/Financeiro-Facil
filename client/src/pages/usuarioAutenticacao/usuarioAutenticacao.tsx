import Icon from '@mdi/react';
import React, { useEffect, useState } from 'react';
import { mdiAccount, mdiEmail, mdiLock, mdiLockCheckOutline } from '@mdi/js';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import ModalRecuperacaoSenha from '../../components/Modais/modalRecSenha';
import Cookies from 'js-cookie';

const Login = () => {
    const [nomeUsuario, setNomeUsuario] = useState<string>('')
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [confirmaSenha, setConfirmaSenha] = useState<string>('')
    const [confirmSenha, setConfirmSenha] = useState<string>()
    const [viewCadastro, setViewCadastro] = useState<boolean>(true)
    const [viewLogin, setViewLogin] = useState<boolean>(false)
    const [viewAlterarSenha, setViewAlterarSenha] = useState<boolean>(true)
    const [nomeBtn, setNomeBtn] = useState<string>("Entrar")
    const [mostraModalRecSenha, setMostraModalRecSenha] = useState<boolean>(false)

    const navigate = useNavigate()
    const { tipoAutenticacao } = useParams()

    async function cadastraUsuario(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (senha !== confirmSenha) {
            return toast.info("As senhas são diferentes")
        } else if (!email) {
            return toast.info("Preencha todas as informações para prosseguir")
        }

        await axios.post(`http://localhost:8000/cadastra/usuario`, {
            nomeUsuario,
            email,
            senha
        }).then((resposta) => {
            toast.success(resposta.data.message)
            setNomeBtn("Entrar")
            setViewLogin(false)
            setViewCadastro(true)
        }).catch((erro) => {
            toast.error(erro.response.data.message)
        })
    }

    async function loginUsuario(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        axios.get(`http://localhost:8000/login/${email}/${senha}`)
            .then((resposta) => {
                toast.success(resposta.data.message)
                sessionStorage.setItem("idUsuario", resposta.data.data)
                navigate("/main/dashboard")
            }).catch((erro) => {
                toast.error(erro.response.data.message)
                setEmail("")
                setSenha("")
            })
    }

    const token = Cookies.get('tokenAcesso');

    async function alterarSenha(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        await axios.put(`http://localhost:8000/alterar/senha`, {
            senha,
            token
        }, {
            headers: {
                Authorization: token
            }
        }).then(function (resposta) {
            toast.success(resposta.data.message)
            navigate("/main/dashboard")
        }).catch(function (erro) {
            toast.error(erro.response.data.message)
            if (erro.response.status === 403) {
                navigate("/")
            }
        })
    }

    useEffect(() => {
        if (tipoAutenticacao === 'alterarSenha') {
            setViewAlterarSenha(false)
            setViewCadastro(true)
            setViewLogin(true)
            setNomeBtn("Confirmar alteração")
            setSenha("")
            setConfirmSenha("")
        }
    }, [])

    return (
        <>
            <div className=" d-flex align-items-center justify-content-center"
                style={{
                    minHeight: '100vh',
                    background: '#121212'
                }}
            >
                <div className="card shadow" style={{ maxWidth: '500px', width: '100%', background: '#1E1E1E', color: '#FFFFFF' }}>
                    <div className="card-body p-5">
                        <div className="text-center mb-4">
                            <h2 className="fw-bold" style={{ color: '#007BFF' }}>Bem-vindo</h2>
                            <p className="text-white">{
                                viewAlterarSenha === false ?
                                    "Altere sua senha"
                                    : viewCadastro ?
                                        "Faça login para acessar o sistema"
                                        : "Realize o cadastro para acessar o sistema"
                            }</p>
                        </div>
                        <form onSubmit={
                            nomeBtn === "Confirmar alteração" ?
                                alterarSenha
                                : nomeBtn === 'Cadastrar' ?
                                    cadastraUsuario
                                    : loginUsuario}
                        >
                            <div className="mb-3" hidden={viewCadastro}>
                                <div className="input-group">
                                    <span className="input-group-text span-login">
                                        <Icon path={mdiAccount} size={1} color="#007BFF" />
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control input-login"
                                        placeholder="Nome do usuário"
                                        value={nomeUsuario}
                                        onChange={(e) => setNomeUsuario(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mb-3" hidden={!viewAlterarSenha}>
                                <div className="input-group">
                                    <span className="input-group-text span-login">
                                        <Icon path={mdiEmail} size={1} color="#007BFF" />
                                    </span>
                                    <input
                                        type="email"
                                        className="form-control input-login"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="input-group">
                                    <span className="input-group-text span-login">
                                        <Icon path={mdiLock} size={1} color="#007BFF" />
                                    </span>
                                    <input
                                        type="password"
                                        className="form-control input-login"
                                        placeholder="Senha"
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mb-3" hidden={!(viewCadastro === false || viewAlterarSenha === false)}>
                                <div className="input-group">
                                    <span className="input-group-text span-login">
                                        <Icon path={mdiLockCheckOutline} size={1} color="#007BFF" />
                                    </span>
                                    <input
                                        type="password"
                                        className="form-control input-login"
                                        placeholder="Confirme sua senha"
                                        value={confirmSenha}
                                        onChange={(e) => setConfirmSenha(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mb-3 form-check" hidden={viewLogin}>
                                <a
                                    href="#"
                                    className="form-check-label"
                                    onClick={() => setMostraModalRecSenha(true)}
                                    style={{ textDecoration: 'none', color: '#007bff', cursor: 'pointer' }}
                                >
                                    Esqueceu sua senha?
                                </a>
                            </div>

                            <div className='row'>
                                <div>
                                    <button type="submit" className="btn btn-primary w-100"
                                        style={{
                                            background: '#007BFF',
                                            border: 'none'
                                        }}>
                                        {nomeBtn}
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="text-center mt-3">
                            <a
                                style={{ cursor: 'pointer', color: '#007BFF' }}
                                hidden={viewLogin}
                                className="text-white"
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
                                style={{ cursor: 'pointer', color: '#007BFF' }}
                                hidden={viewCadastro}
                                className="text-white"
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

            <ModalRecuperacaoSenha
                isOpen={mostraModalRecSenha}
                fecharModal={() => setMostraModalRecSenha(false)}
            />

        </>
    );
};



export default Login;
