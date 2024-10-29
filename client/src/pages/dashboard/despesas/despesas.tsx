import { useEffect, useState } from "react"
import { Card, Col, Row } from "react-bootstrap"
import Tabela from "../../../components/Tabela/Tabela"
import { interfaceTable } from "../../../components/Tabela/TabelaInterface"
import axios from "axios"
import { toast } from "react-toastify"
import ModalDeleteConfirm from "../../../components/Modais/modalDeleteConfirm"
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material"
import { FaFileExcel, FaFilePdf } from "react-icons/fa"


function Despesas() {

    const [idDespesa, setIdDespesa] = useState<number>()
    const [nomeDespesa, setNomeDespesa] = useState<string>()
    const [valorDespesa, setValorDespesa] = useState<number | string>()
    const [categoria, setCategoria] = useState<string>()
    const [dados, setDados] = useState([])
    const [mostraModalDelete, setMostraModalDelete] = useState<boolean>(false)
    const [separarDespesas, setSepararDespesas] = useState<boolean>(false);
    const [responsavel, setResponsavel] = useState<string>('');

    const colunas: interfaceTable[] = [
        { titulo: "Despesa", acesso: "nome_despesa" },
        { titulo: "Valor", acesso: "valor" }
    ]

    const actions = [
        { icon: <FaFileExcel />, name: 'Excel' },
        { icon: <FaFilePdf />, name: 'PDF' }
    ];

    async function adicionarDespesa() {
        if (!nomeDespesa || !valorDespesa) {
            return toast.info("Preencha todas as informações para adicionar despesas")
        }

        await axios.post("http://localhost:8000/adicionarDespesas", {
            nomeDespesa,
            valorDespesa,
            categoria,
            separarDespesas,
            responsavel
        }).then(function (resposta) {
            toast.success(resposta.data.message)
            setNomeDespesa("")
            setValorDespesa("")
            setCategoria("")
            carregaDespesas()
        }).catch(function (erro) {
            toast.error(erro.response.data.message)
            setNomeDespesa("")
            setValorDespesa("")
            setCategoria("")
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



                <Row className="align-items-center">
                    <Col>
                        <p className="text-light m-3">
                            Insira suas despesas mensais separadas por categoria. Você pode optar por organizar individualmente ou como casal.
                        </p>
                    </Col>
                    <Col xs="auto">
                        <SpeedDial
                            ariaLabel="SpeedDial example"
                            icon={<SpeedDialIcon />}
                            FabProps={{ size: "large" }}
                            direction="left"
                            sx={{ position: "relative" }}
                        >
                            {actions.map((action) => (
                                <SpeedDialAction
                                    key={action.name}
                                    icon={action.icon}
                                    tooltipTitle={action.name}
                                />
                            ))}
                        </SpeedDial>
                    </Col>
                </Row>


                <Row>
                    <Col md={5}>
                        <Card
                            className="shadow-lg p-4 d-flex flex-column justify-content-between"
                            style={{ backgroundColor: '#212529', height: '73vh' }}
                        >

                            <Card.Header style={{ borderBottom: '2px solid #495057' }}>
                                <h4 className="text-white">Inserir Despesa</h4>
                            </Card.Header>

                            <Card.Body className="flex-grow-1">
                                <div className="form-group">
                                    <label className="text-light">Deseja separar despesas do casal?</label>
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="separarDespesas"
                                            checked={separarDespesas}
                                            onChange={() => setSepararDespesas(!separarDespesas)}
                                        />
                                        <label className="form-check-label text-light" htmlFor="separarDespesas">
                                            {separarDespesas ? "Sim" : "Não"}
                                        </label>
                                    </div>
                                </div>

                                {separarDespesas && (
                                    <div className="form-group mt-1">
                                        <label className="text-light">Selecione de quem é a despesa:</label>
                                        <select
                                            className="form-control"
                                            style={{
                                                backgroundColor: '#2E3440',
                                                color: '#ecf0f1',
                                                border: '1px solid #495057',
                                                borderRadius: '5px',
                                                transition: 'border-color 0.3s ease',
                                                outline: 'none',
                                            }}
                                            value={responsavel}
                                            onChange={(e) => setResponsavel(e.target.value)}
                                        >
                                            <option>Selecione...</option>
                                            <option value="homem">Homem</option>
                                            <option value="mulher">Mulher</option>
                                        </select>
                                    </div>
                                )}

                                <div className="form-group mt-3">
                                    <label className="text-light">Nome da despesa</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Insira o nome da despesa"
                                        autoFocus
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

                                <div className="form-group mt-3">
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

                                <div className="form-group mt-3">
                                    <label className="text-light">Categoria</label>
                                    <select
                                        className="form-control"
                                        style={{
                                            backgroundColor: '#2E3440',
                                            color: '#ecf0f1',
                                            border: '1px solid #495057',
                                            borderRadius: '5px',
                                            transition: 'border-color 0.3s ease',
                                            outline: 'none',
                                        }}
                                        value={categoria}
                                        onChange={(e) => setCategoria(e.target.value)}
                                    >
                                        <option>Selecione...</option>
                                        <option>Moradia</option>
                                        <option>Alimentação</option>
                                        <option>Lazer</option>
                                        <option>Transporte</option>
                                        <option>Educação</option>
                                        <option>Saúde</option>
                                        <option>Outro</option>
                                    </select>
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
                                                setCategoria("")
                                                setResponsavel("")
                                                setSepararDespesas(false)
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
                            style={{ backgroundColor: '#212529', height: '73vh' }}>

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
                                // badgeColor="danger"
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