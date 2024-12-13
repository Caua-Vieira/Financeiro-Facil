import { Card, Col, Row } from "react-bootstrap"
import Tabela from "../../../components/Tabela/Tabela"
import { interfaceTable } from "../../../components/Tabela/TabelaInterface"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import ModalDeleteConfirm from "../../../components/Modais/modalDeleteConfirm"
import { FaFileExcel, FaFilePdf } from "react-icons/fa";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import ModalCarregando from "../../../components/Modais/modalCarregando"
import InputValor from "../../../components/Inputs/inputValor"

function RendaMensal() {

    const [fonteRenda, setFonteRenda] = useState<string>()
    const [renda, setRenda] = useState<number | string>('')
    const [dados, setDados] = useState([])
    const [idFonteRenda, setIdFonteRenda] = useState<number>()
    const [mostraModalDelete, setMostraModalDelete] = useState<boolean>(false)
    const [separarRendas, setSepararRendas] = useState<boolean>(false);
    const [responsavel, setResponsavel] = useState<string>('');
    const [mostraModalCarregando, setMostraModalCarregando] = useState<boolean>(false)

    const colunas: interfaceTable[] = [
        { titulo: "Fonte", acesso: "fonte_renda" },
        { titulo: "Renda", acesso: "renda_mensal" }
    ]

    const colunasRendasSeparadas: interfaceTable[] = [
        { titulo: "Fonte", acesso: "fonte_renda" },
        { titulo: "Renda", acesso: "renda_mensal" },
        { titulo: "Responsável", acesso: "responsavel" }
    ]

    const [colunaUtilizada, setColunaUtilizada] = useState<interfaceTable[]>(colunas)

    const actions = [
        {
            icon: <FaFileExcel />,
            name: 'Excel',
            onClick: gerarExcelRendas
        },
        { icon: <FaFilePdf />, name: 'PDF' }
    ];

    async function adicionarRenda() {
        if (!fonteRenda || !renda || (separarRendas && (!responsavel || responsavel === 'Selecione...'))) {
            return toast.info("Preencha todas as informações para adicionar a renda")
        }

        await axios.post(`http://localhost:8000/adicionarRenda`, {
            fonteRenda,
            renda,
            separarRendas,
            responsavel
        }).then(function (resposta) {
            toast.success(resposta.data.message)
            setFonteRenda("")
            setRenda("")
            carregaRendas()
        }).catch(function (erro) {
            toast.error(erro.response.data.message)
        })
    }

    async function carregaRendas() {
        await axios.get(`http://localhost:8000/carregaRendas`)
            .then(function (resposta) {
                setDados(resposta.data.data)

                const temRendasSeparadas = resposta.data.data.some((item: any) => item.separar_rendas);

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

    function excluirFonteRenda(dados: any) {
        setIdFonteRenda(dados.id)
        setMostraModalDelete(true)
    }

    async function deletaRenda() {
        await axios.delete(`http://localhost:8000/deletaRenda/${idFonteRenda}`)
            .then(function (resposta) {
                toast.success(resposta.data.message)
            }).catch(function (erro) {
                toast.error(erro.response.data.message)
            }).finally(function () {
                setMostraModalDelete(false)
                carregaRendas()
            })
    }

    async function gerarExcelRendas() {
        if (dados.length === 0) {
            return toast.info("Nenhuma renda encontrada");
        } else {
            setMostraModalCarregando(true);
            // Criar uma nova planilha
            const ws = XLSX.utils.aoa_to_sheet([]);

            // Definir o cabeçalho
            const header = [
                "Fonte de Renda",
                "Renda Mensal"
            ];
            XLSX.utils.sheet_add_aoa(ws, [header], { origin: "A1" });

            // Adicionar os dados dos usuários ao array
            const dataRows = dados.map((item: any) => [
                item.fonte_renda,
                item.renda_mensal
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
            FileSaver.saveAs(blob, "Rendas.xlsx");
        }
        setMostraModalCarregando(false);
    }

    useEffect(() => {
        carregaRendas()
    }, [])

    return (
        <>
            <h2 className="text-white m-3">Renda Mensal</h2>
            <div className="p-4 interface-padrao rounded">

                <Row className="align-items-center">
                    <Col>
                        <p className="text-light m-3">
                            Insira suas rendas mensais separadas por categoria. Você pode optar por organizar individualmente ou como casal.
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
                            style={{ backgroundColor: '#212529', height: '70vh' }}
                        >
                            <Card.Header style={{ borderBottom: '2px solid #495057' }}>
                                <h4 className="text-white">Inserir Renda</h4>
                            </Card.Header>

                            <Card.Body className="flex-grow-1">
                                <div className="form-group">
                                    <label className="text-light">Deseja separar rendas do casal?</label>
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="separarRendas"
                                            checked={separarRendas}
                                            onChange={() => setSepararRendas(!separarRendas)}
                                        />
                                        <label className="form-check-label text-light" htmlFor="separarRendas">
                                            {separarRendas ? "Sim" : "Não"}
                                        </label>
                                    </div>
                                </div>

                                {separarRendas && (
                                    <div className="form-group mt-4">
                                        <label className="text-light">Selecione de quem é a renda:</label>
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

                                <div className="form-group mt-4">
                                    <label className="text-light">Fonte</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Insira sua fonte de renda"
                                        style={{
                                            backgroundColor: '#2E3440',
                                            color: '#ecf0f1',
                                            border: '1px solid #495057',
                                            borderRadius: '5px'
                                        }}
                                        value={fonteRenda}
                                        onChange={(e) => setFonteRenda(e.target.value)}
                                    />
                                </div>

                                <div className="form-group mt-4">
                                    <InputValor
                                        valor={renda}
                                        setValor={setRenda}
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
                                                setRenda("")
                                                setFonteRenda("")
                                                setResponsavel("")
                                                setSepararRendas(false)
                                            }}
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
                                    coluna={colunaUtilizada}
                                    dados={dados}
                                    usaDelete={true}
                                    deleteClick={excluirFonteRenda}
                                    usaTotal={true}
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

            <ModalDeleteConfirm
                isOpen={mostraModalDelete}
                cancelar={() => setMostraModalDelete(false)}
                confirmar={deletaRenda}
            />

            <ModalCarregando
                isOpen={mostraModalCarregando}
                mensagem="Carregando..."
            />

        </>
    )
}

export default RendaMensal