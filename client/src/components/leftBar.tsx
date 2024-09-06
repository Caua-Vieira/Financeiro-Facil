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
                            <div className="d-flex justify-content-between align-items-center pb-3">
                                <img
                                    src="your-logo-url-here"
                                    alt="Logo"
                                    className={`img-fluid mb-2 ${isSidebarOpen ? '' : 'd-none'}`} // Hide logo if sidebar is collapsed
                                    style={{ width: '150px' }}
                                />
                                <button className="btn btn-light" onClick={toggleSidebar}>
                                    <Icon path={mdiMenu} size={1} />
                                </button>
                            </div>
                            <ul className="mt-3 nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                <li className="nav-item">
                                    <a href="#" className={`nav-link ${isSidebarOpen ? 'text-white bg-danger rounded' : 'text-muted'}`}>
                                        <Icon path={mdiHomeSearchOutline} size={1} /><span className={`w-100 ms-1 ${isSidebarOpen ? 'd-inline' : 'd-none'}`}>Dashboard</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className={`nav-link ${isSidebarOpen ? 'text-muted' : 'text-muted'}`}>
                                        <Icon path={mdiFinance} size={1} /> <span className={`ms-1 ${isSidebarOpen ? 'd-inline' : 'd-none'}`}>Estatísticas</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className={`nav-link ${isSidebarOpen ? 'text-muted' : 'text-muted'}`}>
                                        <Icon path={mdiFileDocumentCheckOutline} size={1} /><span className={`ms-1 ${isSidebarOpen ? 'd-inline' : 'd-none'}`}>Relatórios</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className={`nav-link ${isSidebarOpen ? 'text-muted' : 'text-muted'}`}>
                                        <Icon path={mdiCashMultiple} size={1} /><span className={`ms-1 ${isSidebarOpen ? 'd-inline' : 'd-none'}`}>Orçamentos</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col py-3">Content area...</div>
                </div>
            </div>
        </>
    );
};

export default LeftBar;