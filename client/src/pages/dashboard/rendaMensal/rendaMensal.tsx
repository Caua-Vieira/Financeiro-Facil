import { Card, Col, Row } from "react-bootstrap"
import Tabela from "../../../components/Tabela/Tabela"
import { interfaceTable } from "../../../components/Tabela/TabelaInterface"
import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

function RendaMensal() {

    const [fonteRenda, setFonteRenda] = useState<string>()
    const [renda, setRenda] = useState<number>()

    const colunas: interfaceTable[] = [
        { titulo: "Fonte", acesso: "titulo" },
        { titulo: "Renda", acesso: "renda" }
    ]

    async function adicionarRenda() {
        await axios.post(`http://localhost:8000/adicionarRenda`, {
            fonteRenda,
            renda
        }).then(function (resposta) {
            toast.success(resposta.data.message)
        }).catch(function (erro) {
            toast.error(erro.response.data.message)
        })
    }


    return (
        <>
            <h2 className="text-white m-3">Renda Mensal</h2>
            <div className="p-4 interface-padrao rounded">

                <p className="text-light m-3">
                    Insira suas rendas mensais separadas por categoria. Você pode optar por organizar individualmente ou como casal.
                </p>

                <Row>
                    <Col md={5}>
                        <Card
                            className="shadow-lg p-4 d-flex flex-column justify-content-between"
                            style={{ backgroundColor: '#212529', height: '70vh' }}
                        >
                            <Card.Header className="mb-3" style={{ borderBottom: '2px solid #495057' }}>
                                <h4 className="text-white">Inserir Renda</h4>
                            </Card.Header>

                            <Card.Body className="flex-grow-1">
                                <div className="form-group mt-3 mb-4">
                                    <label className="text-light">Fonte</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Insira sua renda principal"
                                        style={{
                                            backgroundColor: '#2E3440',
                                            color: '#ecf0f1',
                                            border: '1px solid #495057',
                                            borderRadius: '5px'
                                        }}
                                    />
                                </div>

                                <div className="form-group mt-5 ">
                                    <label className="text-light">Valor</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Insira sua renda secundária"
                                        style={{
                                            backgroundColor: '#2E3440',
                                            color: '#ecf0f1',
                                            border: '1px solid #495057',
                                            borderRadius: '5px'
                                        }}
                                    />
                                </div>

                            </Card.Body>

                            <Card.Footer className="mt-3 d-flex justify-content-between" style={{ borderTop: '2px solid #495057' }}>
                                <Row className="w-100">

                                    <Col md={6}>
                                        <button
                                            className="btn btn-secondary w-100"
                                            style={{ backgroundColor: '#2E3440' }}
                                        >
                                            Cancelar
                                        </button>
                                    </Col>

                                    <Col md={6}>
                                        <button
                                            className="btn btn-primary w-100"
                                            onClick={adicionarRenda}
                                        >
                                            Adicionar Renda
                                        </button>
                                    </Col>
                                </Row>

                            </Card.Footer>
                        </Card>



                    </Col>


                    <Col md={7}>
                        <Card className="shadow-lg p-4 d-flex flex-column justify-content-between"
                            style={{ backgroundColor: '#212529', height: '70vh' }}>

                            <Card.Header className="mb-3" style={{ borderBottom: '2px solid #495057' }}>
                                <h4 className="text-white">Resumo da Renda</h4>
                            </Card.Header>

                            <Row>
                                <Tabela
                                    coluna={colunas}
                                    dados={[]}
                                />
                            </Row>

                            {/* <ul className="list-group">
                                <li className="list-group-item d-flex justify-content-between align-items-center"
                                    style={{ backgroundColor: '#2E3440', color: '#ecf0f1', border: '1px solid #495057' }}>
                                    Salário
                                    <span className="badge bg-primary rounded-pill">R$ 5.000</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center"
                                    style={{ backgroundColor: '#2E3440', color: '#ecf0f1', border: '1px solid #495057' }}>
                                    Aluguéis
                                    <span className="badge bg-success rounded-pill">R$ 1.200</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center"
                                    style={{ backgroundColor: '#2E3440', color: '#ecf0f1', border: '1px solid #495057' }}>
                                    Investimentos
                                    <span className="badge bg-info rounded-pill">R$ 850</span>
                                </li>
                            </ul> */}

                            <Card.Footer className="mt-3 d-flex justify-content-between" style={{ borderTop: '2px solid #495057' }}>
                                <button className="btn btn-secondary mt-3 w-100" style={{ backgroundColor: '#2E3440' }}>
                                    Visualizar Detalhes
                                </button>

                            </Card.Footer>

                        </Card>
                    </Col>
                </Row>

            </div>


        </>
    )
}

export default RendaMensal