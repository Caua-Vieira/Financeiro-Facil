import axios from "axios";
import { useState } from "react";
import { Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import ModalCarregando from "./modalCarregando";

interface RecuperacaoSenhaProps {
    isOpen: boolean;
    fecharModal: () => void
}

const ModalRecuperacaoSenha: React.FC<RecuperacaoSenhaProps> = ({
    isOpen,
    fecharModal
}) => {
    const [email, setEmail] = useState<string>()
    const [mostraModalCarregando, setMostraModalCarregando] = useState<boolean>(false)

    async function enviarEmail() {
        if (!email) {
            return toast.info("Preencha o e-mail para recuperação de senha")
        }

        setMostraModalCarregando(true)
        await axios.post(`http://localhost:8000/enviarEmail/recuperacaoSenha`, {
            email
        }).then(function (resposta) {
            toast.success(resposta.data.message)
        }).catch(function (erro) {
            toast.error(erro.response.data.message)
        }).finally(function () {
            setMostraModalCarregando(false)
        })
    }

    return (
        <>
            <Modal className="rounded" show={isOpen} centered>
                <Modal.Header className="modal-custom-bg">
                    <Modal.Title>Recuperação de senha</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-custom-bg">
                    <Row className="mt-2 mb-3">
                        <div className="form-group">
                            <label className="text-light">E-mail</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Insira seu e-mail"
                                style={{
                                    backgroundColor: '#2E3440',
                                    color: '#ecf0f1',
                                    border: '1px solid #495057',
                                    borderRadius: '5px'
                                }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </Row>
                </Modal.Body>
                <Modal.Footer className="modal-custom-bg">
                    <Row className="w-100 d-flex justify-content-between">
                        <div className="col-6 text-center">
                            <button onClick={fecharModal} className="w-100 btn btn-danger">Cancelar</button>
                        </div>
                        <div className="col-6 text-center">
                            <button onClick={enviarEmail} className="w-100 btn btn-primary">Confirmar</button>
                        </div>
                    </Row>
                </Modal.Footer>
            </Modal>

            <ModalCarregando
                isOpen={mostraModalCarregando}
                mensagem="Carregando..."
            />
        </>
    )
}

export default ModalRecuperacaoSenha