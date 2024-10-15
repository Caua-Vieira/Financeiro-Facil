import React, { useState } from 'react';
import Icon from '@mdi/react';
import {
    mdiCog,
    mdiHomeSearchOutline,
    mdiMenu,
    mdiWallet,
    mdiSwapHorizontal
} from '@mdi/js';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from "../assets/Financeiro.png"


const LeftBar: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    const navigate = useNavigate()
    const location = useLocation()

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
                {/* <div className="dropdown">
                    <a href="#" className="d-flex align-items-center text-white text-decoration-none">
                        <Icon path={mdiLightbulbOnOutline} size={1} />
                        {isSidebarOpen && <span className="ms-2">Light</span>}
                    </a>
                </div> */}
            </div>

        </>
    );
};

export default LeftBar;