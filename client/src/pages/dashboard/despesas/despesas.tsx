import { useEffect, useState } from "react"
import { Card, Col, Row } from "react-bootstrap"
import Tabela from "../../../components/Tabela/Tabela"
import { interfaceTable } from "../../../components/Tabela/TabelaInterface"
import axios from "axios"
import { toast } from "react-toastify"
import ModalDeleteConfirm from "../../../components/Modais/modalDeleteConfirm"
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material"
import { FaFileExcel, FaFilePdf } from "react-icons/fa"
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import ModalCarregando from "../../../components/Modais/modalCarregando"
import InputValor from "../../../components/Inputs/inputValor"

function Despesas() {

    const [idDespesa, setIdDespesa] = useState<number>()
    const [nomeDespesa, setNomeDespesa] = useState<string>()
    const [valorDespesa, setValorDespesa] = useState<number | string>('')
    const [categoria, setCategoria] = useState<string>()
    const [dados, setDados] = useState([])
    const [mostraModalDelete, setMostraModalDelete] = useState<boolean>(false)
    const [separarDespesas, setSepararDespesas] = useState<boolean>(false);
    const [responsavel, setResponsavel] = useState<string>('');
    const [mostraModalCarregando, setMostraModalCarregando] = useState<boolean>(false)

    const colunas: interfaceTable[] = [
        { titulo: "Despesa", acesso: "nome_despesa" },
        { titulo: "Valor", acesso: "valor" }
    ]

    const colunasRendasSeparadas: interfaceTable[] = [
        { titulo: "Despesa", acesso: "nome_despesa" },
        { titulo: "Valor", acesso: "valor" },
        { titulo: "Responsável", acesso: "responsavel" }
    ]

    const [colunaUtilizada, setColunaUtilizada] = useState<interfaceTable[]>(colunas)

    const actions = [
        {
            icon: <FaFileExcel />,
            name: 'Excel',
            onClick: gererExcelDespesas
        },
        { icon: <FaFilePdf />, name: 'PDF' }
    ];

    function adicionarDespesa() {
        if (!nomeDespesa || !valorDespesa) {
            return toast.info("Preencha todas as informações para adicionar despesas")
        }

        axios.post("http://localhost:8000/adicionarDespesas", {
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

    function carregaDespesas() {
        axios.get("http://localhost:8000/carregarDespesas")
            .then(function (resposta) {
                setDados(resposta.data.data)

                const temRendasSeparadas = resposta.data.data.some((item: any) => item.separar_despesas);

                if (temRendasSeparadas) {
                    setColunaUtilizada(colunasRendasSeparadas)
                } else {
                    setColunaUtilizada(colunas)
                }

            }).catch(function (erro) {
                setDados([])
                // toast.error(erro.response.data.message)
            })
    }

    function excluirDespesas(dados: any) {
        setIdDespesa(dados.id)
        setMostraModalDelete(true)
    }

    function deletaDespesa() {
        axios.delete(`http://localhost:8000/deletaDespesa/${idDespesa}`)
            .then(function (resposta) {
                toast.success(resposta.data.message)
            }).catch(function (erro) {
                toast.error(erro.response.data.message)
            }).finally(function () {
                setMostraModalDelete(false)
                carregaDespesas()
            })
    }

    function gererExcelDespesas() {
        if (dados.length === 0) {
            return toast.info("Nenhuma despesa encontrada");
        } else {
            setMostraModalCarregando(true);
            // Criar uma nova planilha
            const ws = XLSX.utils.aoa_to_sheet([]);

            // Definir o cabeçalho
            const header = [
                "Nome",
                "Valor",
                "Categoria"
            ];
            XLSX.utils.sheet_add_aoa(ws, [header], { origin: "A1" });

            // Adicionar os dados dos usuários ao array
            const dataRows = dados.map((item: any) => [
                item.nome_despesa,
                item.valor,
                item.categoria
            ]);

            // Adicionar os dados ao arquivo Excel
            XLSX.utils.sheet_add_aoa(ws, dataRows, { origin: "A2" });

            // Criar um novo livro de Excel
            const wb = XLSX.utils.book_new();

            // Adicionar a planilha ao livro de Excel
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

            // Configurar opções de escrita, incluindo o tipo de livro e o tipo de saída
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

            // Criar um Blob a partir do buffer de Excel
            const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            // Salvar o Blob como um arquivo Excel
            FileSaver.saveAs(blob, "Despesas.xlsx");
        }
        setMostraModalCarregando(false);
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
                                    onClick={action.onClick}
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
                                    <InputValor
                                        valor={valorDespesa}
                                        setValor={setValorDespesa}
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
                                    coluna={colunaUtilizada}
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

            <ModalCarregando
                isOpen={mostraModalCarregando}
                mensagem="Carregando..."
            />
        </>
    )
}

export default Despesas