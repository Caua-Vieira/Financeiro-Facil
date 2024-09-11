import React, { useState } from 'react';
import { RxHome } from "react-icons/rx";
import Icon from '@mdi/react';
import {
    mdiFinance,
    mdiHomeSearchOutline,
    mdiFileDocumentCheckOutline,
    mdiCashMultiple,
    mdiMenu
} from '@mdi/js';

const LeftBar: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className={`col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-white shadow-sm ${isSidebarOpen ? '' : 'sidebar-collapsed'}`}>
                        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-3 min-vh-100">
                            <div className="d-flex justify-content-center align-items-center pb-3 w-100">
                                <img
                                    src="your-logo-url-here"
                                    alt="Logo"
                                    className={`img-fluid mb-2 ${isSidebarOpen ? '' : 'd-none'}`}
                                    style={{ width: '150px' }}
                                />
                                <button className="btn btn-light" onClick={toggleSidebar} style={{ marginLeft: 'auto' }}>
                                    <Icon path={mdiMenu} size={1} />
                                </button>
                            </div>
                            <ul className="mt-3 nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start w-100" id="menu">
                                <li className="nav-item w-100">
                                    <a href="#" className={`nav-link w-100 ${isSidebarOpen ? 'text-white' : 'text-muted'}`} style={{ backgroundColor: isSidebarOpen ? '#007bff' : 'transparent' }}>
                                        <Icon path={mdiHomeSearchOutline} size={1} />
                                        <span className={`ms-1 ${isSidebarOpen ? 'd-inline' : 'd-none'}`}>Dashboard</span>
                                    </a>
                                </li>
                                <li className="nav-item w-100">
                                    <a href="#" className={`nav-link w-100 ${isSidebarOpen ? 'text-muted' : 'text-muted'}`}>
                                        <Icon path={mdiFinance} size={1} />
                                        <span className={`ms-1 ${isSidebarOpen ? 'd-inline' : 'd-none'}`}>Estatísticas</span>
                                    </a>
                                </li>
                                <li className="nav-item w-100">
                                    <a href="#" className={`nav-link w-100 ${isSidebarOpen ? 'text-muted' : 'text-muted'}`}>
                                        <Icon path={mdiFileDocumentCheckOutline} size={1} />
                                        <span className={`ms-1 ${isSidebarOpen ? 'd-inline' : 'd-none'}`}>Relatórios</span>
                                    </a>
                                </li>
                                <li className="nav-item w-100">
                                    <a href="#" className={`nav-link w-100 ${isSidebarOpen ? 'text-muted' : 'text-muted'}`}>
                                        <Icon path={mdiCashMultiple} size={1} />
                                        <span className={`ms-1 ${isSidebarOpen ? 'd-inline' : 'd-none'}`}>Orçamentos</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* <div className="col py-3">Content area...</div> */}
                </div>
            </div>

        </>
    );
};

export default LeftBar;