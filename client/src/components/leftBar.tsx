import { useState } from "react";
import { Button } from "react-bootstrap"

function LeftBar() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="d-flex">
                {/* Botão de menu de hambúrguer */}
                <Button variant="light" onClick={toggleSidebar} className="me-2">
                    <span className="navbar-toggler-icon"></span>
                </Button>

                {/* Sidebar */}
                <div
                    style={{
                        width: isOpen ? '250px' : '0',
                        height: '100vh',
                        transition: 'width 0.3s',
                        backgroundColor: 'white',
                        boxShadow: isOpen ? '2px 0px 5px rgba(0,0,0,0.2)' : 'none',
                    }}
                >
                    <div className="d-flex flex-column align-items-start p-3">
                        <h4 className="mb-4">Financeiro Simões</h4>
                        <Button variant="light" className="text-start w-100 mb-2">Dashboard</Button>
                        <Button variant="light" className="text-start w-100 mb-2">Estatísticas</Button>
                        <Button variant="light" className="text-start w-100 mb-2">Carteira</Button>
                        <Button variant="light" className="text-start w-100">Configurações</Button>
                    </div>
                </div>

                {/* Conteúdo principal */}
                <div
                    style={{
                        marginLeft: isOpen ? '250px' : '0',
                        transition: 'margin-left 0.3s',
                        width: '100%',
                    }}
                >
                    <h1>Conteúdo Principal</h1>
                    <p>Aqui vai o conteúdo da sua aplicação.</p>
                </div>
            </div>
        </>
    )
}

export default LeftBar