import React, { useEffect, useState } from 'react';
import Icon from '@mdi/react';
import {
    mdiCog,
    mdiHomeSearchOutline,
    mdiMenu,
    mdiWallet,
    mdiSwapHorizontal,
    mdiLogout,
    mdiAccount
} from '@mdi/js';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from "../assets/Financeiro.png"
import axios from 'axios';
import { toast } from 'react-toastify';


const LeftBar: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);
    const [infosPendentes, setInfosPendentes] = useState<boolean>(false)
    const [avatar, setAvatar] = useState<string>()

    const navigate = useNavigate()
    const location = useLocation()

    const idUsuario = sessionStorage.getItem("idUsuario") || ""

    async function verificaPerfilCompleto() {
        await axios.get(`http://localhost:8000/verificaPerfil/${idUsuario}`)
            .then(function (resposta) {
                if (!(resposta.data.data[0].profissao)) {
                    setInfosPendentes(true)
                }

                if (resposta.data.data[0].avatar) {
                    setAvatar(resposta.data.data[0].avatar)
                }
            }).catch(function (erro) {
                setAvatar("")
                toast.error(erro.response.data.message)
            })
    }

    useEffect(() => {
        verificaPerfilCompleto()
    }, [])

    return (
        <>
            <div className={`leftside-menu d-flex flex-column flex-shrink-0 bg-dark text-white ${isSidebarOpen ? 'p-3' : 'p-2'}`} style={{ width: isSidebarOpen ? '280px' : '80px', transition: 'all 0.3s' }}>
                <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    {isSidebarOpen && (
                        <img
                            src={Logo}
                            alt="Logo"
                            className="ms-3 logo-sidebar"
                        />
                    )}
                </div>

                <hr />
                <ul className="mt-2 nav nav-pills flex-column mb-auto">
                    <Link
                        to="/main/dashboard"
                        className={`nav-link text-white d-flex align-items-center custom-nav-link ${location.pathname == '/main/dashboard' ? 'active' : ''}`}
                    >
                        <Icon path={mdiHomeSearchOutline} size={1} />
                        {isSidebarOpen && <span className="ms-2">Dashboard</span>}
                    </Link>
                    <li className="nav-item">
                        <a href="#" className="nav-link text-white d-flex align-items-center custom-nav-link">
                            <Icon path={mdiCog} size={1} />
                            {isSidebarOpen && <span className="ms-2">Configurações</span>}
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link text-white d-flex align-items-center custom-nav-link">
                            <Icon path={mdiWallet} size={1} />
                            {isSidebarOpen && <span className="ms-2">Orçamento</span>}
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link text-white d-flex align-items-center custom-nav-link">
                            <Icon path={mdiSwapHorizontal} size={1} />
                            {isSidebarOpen && <span className="ms-2">Movimentações</span>}
                        </a>
                    </li>
                </ul>

                <hr />
                <div>
                    <button
                        className="d-flex align-items-center w-100 text-white custom-nav-link mb-2 position-relative"
                        onClick={() => navigate("/main/perfil/usuario")}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                    >
                        {avatar && avatar.trim() !== "" ? (
                            <img
                                src={`data:image/png;base64,${avatar}`}
                                alt="Avatar do usuário"
                                className="rounded-circle"
                                style={{ width: '24px', height: '24px', objectFit: 'cover' }}
                            />
                        ) : (
                            <Icon path={mdiAccount} size={1} />
                        )}
                        <span className="ms-2">Perfil</span>

                        {infosPendentes &&
                            <span
                                className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger"
                                title="Preencha as informações pendentes"
                                style={{ zIndex: '1' }}
                            >
                                !
                            </span>
                        }
                    </button>

                    <hr className="text-secondary" />

                    <button
                        className="d-flex align-items-center w-100 text-white custom-nav-link"
                        onClick={() => {
                            sessionStorage.clear()
                            navigate("/")
                        }}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                    >
                        <Icon path={mdiLogout} size={1} />
                        {isSidebarOpen && <span className="ms-2">Sair</span>}
                    </button>
                </div>
            </div>


        </>
    );
};

export default LeftBar;