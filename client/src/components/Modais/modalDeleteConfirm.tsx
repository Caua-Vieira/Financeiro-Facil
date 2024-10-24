import { mdiHelp } from "@mdi/js"
import Icon from "@mdi/react"
import { Modal, Row } from "react-bootstrap"

interface DeleteConfirmProps {
    isOpen: boolean;
    cancelar: () => void
    confirmar: () => void
}

const ModalDeleteConfirm: React.FC<DeleteConfirmProps> = ({
    isOpen,
    cancelar,
    confirmar
}) => {

    return (
        <>
            <Modal className="rounded" show={isOpen} centered>
                <Modal.Body className="rounded modal-custom-bg">
                    <div className="col-lg col-mg col-sm text-center">
                        <Icon path={mdiHelp} size={2} />
                    </div>

                    <div className="mt-4 mb-2 text-center col-lg-12 col-md-12 col-sm">
                        <h4>Tem certeza que deseja excluir </h4>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-custom-bg">
                    <Row className="w-100 d-flex justify-content-between">
                        <div className="col-6 text-center">
                            <button onClick={cancelar} className="w-100 btn btn-danger">Cancelar</button>
                        </div>
                        <div className="col-6 text-center">
                            <button onClick={confirmar} className="w-100 btn btn-primary">Confirmar</button>
                        </div>
                    </Row>
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default ModalDeleteConfirm