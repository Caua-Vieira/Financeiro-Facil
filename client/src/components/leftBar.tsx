import React, { useState } from 'react';
import Icon from '@mdi/react';
import {
    mdiCog,
    mdiHomeSearchOutline,
    mdiMenu,
    mdiWallet,
    mdiSwapHorizontal
} from '@mdi/js';
import { Link, useNavigate } from 'react-router-dom';


const LeftBar: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    const navigate = useNavigate()

    return (
        <>
            <div className={`leftside-menu d-flex flex-column flex-shrink-0 bg-dark text-white ${isSidebarOpen ? 'p-3' : 'p-2'}`} style={{ width: isSidebarOpen ? '280px' : '80px', height: '100vh', transition: 'all 0.3s' }}>
                <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <button className="btn btn-dark p-0" onClick={toggleSidebar}>
                        <Icon path={mdiMenu} size={1} color="white" />
                    </button>
                    {isSidebarOpen && (
                        <img
                            // src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Nestle_logo_2015.svg/2560px-Nestle_logo_2015.svg.png"
                            alt="Logo"
                            className="ms-3"
                            style={{ width: '100px', filter: 'brightness(0) invert(1)' }}
                        />
                    )}
                </div>
                <hr />
                <ul className="mt-2 nav nav-pills flex-column mb-auto">
                    <Link to="/dashboard" className="nav-link active d-flex align-items-center">
                        <Icon path={mdiHomeSearchOutline} size={1} />
                        {isSidebarOpen && <span className="ms-2">Dashboard</span>}
                    </Link>
                    <li className="nav-item">
                        <a href="#" className="nav-link text-white d-flex align-items-center">
                            <Icon path={mdiCog} size={1} />
                            {isSidebarOpen && <span className="ms-2">Configurações</span>}
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link text-white d-flex align-items-center">
                            <Icon path={mdiWallet} size={1} />
                            {isSidebarOpen && <span className="ms-2">Orçamento</span>}
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link text-white d-flex align-items-center">
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