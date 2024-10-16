import React, { useEffect, useState } from 'react';
import { Icon } from '@mdi/react';
import { mdiCurrencyUsd, mdiChartLine, mdiBank, mdiCreditCardOutline, mdiHeartPulse, mdiAccountGroup, mdiHomeCity, mdiCashMultiple, mdiCurrencyUsdOff } from '@mdi/js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Dashboard() {

    const [rendaMensal, setRendaMensal] = useState<string>()
    const [despesaMensal, setDespesaMensal] = useState<string>()

    const navigate = useNavigate()

    async function carregaInfosDashboard() {
        await axios.get(`http://localhost:8000/carregaInfos/dashboard`)
            .then(function (resposta) {
                setRendaMensal(Number(resposta.data.rendaMensal).toLocaleString('pt-BR', { minimumFractionDigits: 2 }))
                setDespesaMensal(Number(resposta.data.despesaMensal).toLocaleString('pt-BR', { minimumFractionDigits: 2 }))
            }).catch(function (erro) {
                toast.error(erro.response.data.message)
            })
    }

    useEffect(() => {
        carregaInfosDashboard()
    }, [])

    return (
        <>
            <h2 className='text-white m-3 '>Gestão Financeira</h2>
            <div
                className="p-4 interface-padrao rounded"
            >
                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>
                        <button className="btn btn-outline-light me-2">Filtrar</button>
                        <button className="btn btn-primary">Ver tudo</button>
                    </div>
                </div>

                <div className="row g-4">
                    <div className="col-md-3">
                        {/* Card azul */}
                        <div className="card text-white card-hover card-hover-primary pb-4" onClick={() => navigate("/main/dashboard/rendaMensal")}>
                            <div className="card-body">
                                <h5 className="card-title">Renda Mensal</h5>
                                <p className="card-text fs-4">{`R$ ${rendaMensal}`}</p>
                                <Icon path={mdiCurrencyUsd} size={1.5} className="position-absolute bottom-0 end-0 m-2" />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        {/* Card cinza */}
                        <div className="card text-white card-hover card-hover-gray pb-4" onClick={() => navigate("/main/dashboard/despesas")}>
                            <div className="card-body">
                                <h5 className="card-title">Despesas</h5>
                                <p className="card-text fs-4">{`R$ ${despesaMensal}`}</p>
                                <Icon path={mdiCurrencyUsdOff} size={1.5} className="position-absolute bottom-0 end-0 m-2" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-white card-hover-gray pb-4">
                            <div className="card-body">
                                <h5 className="card-title">Investimento CDB</h5>
                                <p className="card-text fs-4">R$ 650,00</p>
                                <Icon path={mdiBank} size={1.5} className="position-absolute bottom-0 end-0 m-2" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-white card-hover card-hover-gray pb-4">
                            <div className="card-body">
                                <h5 className="card-title">Título de Capitalização</h5>
                                <p className="card-text fs-4">R$ 70,00</p>
                                <Icon path={mdiCreditCardOutline} size={1.5} className="position-absolute bottom-0 end-0 m-2" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row g-4 mt-2">
                    <div className="col-md-3">
                        <div className="card text-white card-hover card-hover-gray pb-4">
                            <div className="card-body">
                                <h5 className="card-title">Seguro de vida</h5>
                                <p className="card-text fs-4">R$ 95,00</p>
                                <Icon path={mdiHeartPulse} size={1.5} className="position-absolute bottom-0 end-0 m-2" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-white card-hover card-hover-gray pb-4">
                            <div className="card-body">
                                <h5 className="card-title">Plano de saúde familiar</h5>
                                <p className="card-text fs-4">R$ 430,10</p>
                                <Icon path={mdiAccountGroup} size={1.5} className="position-absolute bottom-0 end-0 m-2" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-white card-hover card-hover-gray pb-4">
                            <div className="card-body">
                                <h5 className="card-title">Fundos Imobiliários</h5>
                                <p className="card-text fs-4">R$ 800,75</p>
                                <Icon path={mdiHomeCity} size={1.5} className="position-absolute bottom-0 end-0 m-2" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-white card-hover card-hover-gray pb-4">
                            <div className="card-body">
                                <h5 className="card-title">Empréstimo Consignado</h5>
                                <p className="card-text fs-4">R$ 619,90</p>
                                <Icon path={mdiCashMultiple} size={1.5} className="position-absolute bottom-0 end-0 m-2" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-md-8">
                        <div className="card text-white card-hover card-hover-gray pb-4">
                            <div className="card-body">
                                <h5 className="card-title">Análise Financeira</h5>
                                <p className="text-muted">Gráfico de barras aqui</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card text-white card-hover card-hover-gray pb-4">
                            <div className="card-body">
                                <h5 className="card-title">Análise de Gastos</h5>
                                <p className="text-muted">Gráfico de pizza aqui</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>

    );
};

export default Dashboard;