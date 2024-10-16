import { useEffect, useState } from "react"
import { Card, Col, Row } from "react-bootstrap"
import Tabela from "../../../components/Tabela/Tabela"
import { interfaceTable } from "../../../components/Tabela/TabelaInterface"
import axios from "axios"
import { toast } from "react-toastify"
import ModalDeleteConfirm from "../../../components/Modais/DeleteConfirm"


function Despesas() {

    const [idDespesa, setIdDespesa] = useState<number>()
    const [nomeDespesa, setNomeDespesa] = useState<string>()
    const [valorDespesa, setValorDespesa] = useState<number | string>()
    const [dados, setDados] = useState([])
    const [mostraModalDelete, setMostraModalDelete] = useState<boolean>(false)

    const colunas: interfaceTable[] = [
        { titulo: "Despesa", acesso: "nome_despesa" },
        { titulo: "Valor", acesso: "valor" }
    ]

    async function adicionarDespesa() {
        if (!nomeDespesa || !valorDespesa) {
            return toast.info("Preencha todas as informações para adicionar despesas")
        }

        await axios.post("http://localhost:8000/adicionarDespesas", {
            nomeDespesa,
            valorDespesa
        }).then(function (resposta) {
            toast.success(resposta.data.message)
            setNomeDespesa("")
            setValorDespesa("")
            carregaDespesas()
        }).catch(function (erro) {
            toast.error(erro.response.data.message)
            setNomeDespesa("")
            setValorDespesa("")
        })
    }

    async function carregaDespesas() {
        await axios.get("http://localhost:8000/carregarDespesas")
            .then(function (resposta) {
                setDados(resposta.data.data)
            }).catch(function (erro) {
                setDados([])
                toast.error(erro.response.data.message)
            })
    }

    function excluirDespesas(dados: any) {
        setIdDespesa(dados.id)
        setMostraModalDelete(true)
    }

    async function deletaDespesa() {
        await axios.delete(`http://localhost:8000/deletaDespesa/${idDespesa}`)
            .then(function (resposta) {
                toast.success(resposta.data.message)
            }).catch(function (erro) {
                toast.error(erro.response.data.message)
            }).finally(function () {
                setMostraModalDelete(false)
                carregaDespesas()
            })
    }

    useEffect(() => {
        carregaDespesas()
    }, [])

    return (
        <>

            <h2 className="text-white m-3">Despesas Mensais</h2>
            <div className="p-4 interface-padrao rounded">

                <p className="text-light m-3">
                    Insira suas despesas mensais separadas por categoria. Você pode optar por organizar individualmente ou como casal.
                </p>

                <Row>
                    <Col md={5}>
                        <Card
                            className="shadow-lg p-4 d-flex flex-column justify-content-between"
                            style={{ backgroundColor: '#212529', height: '70vh' }}
                        >

                            <Card.Header className="mb-3" style={{ borderBottom: '2px solid #495057' }}>
                                <h4 className="text-white">Inserir Despesa</h4>
                            </Card.Header>

                            <Card.Body className="flex-grow-1">
                                <div className="form-group mt-3 mb-4">
                                    <label className="text-light">Nome da despesa</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Insira o nome da despesa"
                                        style={{
                                            backgroundColor: '#2E3440',
                                            color: '#ecf0f1',
                                            border: '1px solid #495057',
                                            borderRadius: '5px'
                                        }}
                                        value={nomeDespesa}
                                        onChange={(e) => setNomeDespesa(e.target.value)}
                                    />
                                </div>

                                <div className="form-group mt-5 ">
                                    <label className="text-light">Valor</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Insira sua despesa"
                                        style={{
                                            backgroundColor: '#2E3440',
                                            color: '#ecf0f1',
                                            border: '1px solid #495057',
                                            borderRadius: '5px'
                                        }}
                                        value={valorDespesa}
                                        onChange={(e) => setValorDespesa(parseInt(e.target.value))}
                                    />
                                </div>

                            </Card.Body>

                            <Card.Footer className="mt-3 d-flex justify-content-between" style={{ borderTop: '2px solid #495057' }}>
                                <Row className="w-100">

                                    <Col md={6}>
                                        <button
                                            className="btn btn-secondary w-100"
                                            style={{ backgroundColor: '#2E3440' }}
                                            onClick={() => {
                                                setNomeDespesa("")
                                                setValorDespesa("")
                                            }}
                                        >
                                            Cancelar
                                        </button>
                                    </Col>

                                    <Col md={6}>
                                        <button
                                            className="btn btn-primary w-100"
                                            onClick={adicionarDespesa}
                                        >
                                            Adicionar Despesa
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
                                <h4 className="text-white">Resumo das Despesas</h4>
                            </Card.Header>

                            <Row>
                                <Tabela
                                    coluna={colunas}
                                    dados={dados}
                                    usaDelete={true}
                                    deleteClick={excluirDespesas}
                                    usaTotal={true}
                                    messageTotal="Total das Despesas"
                                    badgeColor="danger"
                                />
                            </Row>

                            <Card.Footer className="mt-3 d-flex justify-content-between" style={{ borderTop: '2px solid #495057' }}>
                                <button className="btn btn-secondary mt-3 w-100" style={{ backgroundColor: '#2E3440' }}>
                                    Visualizar Detalhes
                                </button>
                            </Card.Footer>

                        </Card>
                    </Col>
                </Row>

            </div>

            <ModalDeleteConfirm
                isOpen={mostraModalDelete}
                cancelar={() => setMostraModalDelete(false)}
                confirmar={deletaDespesa}
            />
        </>
    )
}

export default Despesas