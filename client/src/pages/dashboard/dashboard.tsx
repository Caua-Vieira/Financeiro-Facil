import React, { useEffect, useState } from 'react';
import { Icon } from '@mdi/react';
import { mdiCurrencyUsd, mdiChartLine, mdiBank, mdiCreditCardOutline, mdiHeartPulse, mdiAccountGroup, mdiHomeCity, mdiCashMultiple, mdiCurrencyUsdOff } from '@mdi/js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

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

    async function carregaDadosAnaliseFinanceira() {
        await axios.get(`http://localhost:8000/carregaDados/analiseFinanceira`)
            .then(function (resposta) {
                console.log(resposta)
            }).catch(function (erro) {
                toast.error(erro.response.data.message)
            })
    }

    useEffect(() => {
        carregaInfosDashboard()
    }, [])

    const options: ApexOptions = {
        series: [
            {
                name: 'Inflation',
                data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
            },
        ],
        chart: {
            height: 150,
            type: 'bar',
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                dataLabels: {
                    position: 'top',
                },
            },
        },
        dataLabels: {
            enabled: true,
            formatter: (val: number) => `${val}%`,
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ['#304758'],
            },
        },
        xaxis: {
            categories: [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
            ],
            position: 'top',
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            crosshairs: {
                fill: {
                    type: 'gradient',
                    gradient: {
                        colorFrom: '#D8E3F0',
                        colorTo: '#BED1E6',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                    },
                },
            },
            tooltip: {
                enabled: true,
            },
        },
        yaxis: {
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
                formatter: (val: number) => `${val}%`,
            },
        },
        title: {
            text: 'Monthly Inflation in Argentina, 2002',
            floating: true,
            offsetY: 330,
            align: 'center',
            style: {
                color: '#444',
            },
        },
    };

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
                        <div className="card text-white card-hover card-hover-primary pb-4" onClick={() => navigate("/main/dashboard/rendaMensal")}>
                            <div className="card-body">
                                <h5 className="card-title">Renda Mensal</h5>
                                <p className="card-text fs-4">{`R$ ${rendaMensal}`}</p>
                                <Icon path={mdiCurrencyUsd} size={1.5} className="position-absolute bottom-0 end-0 m-2" />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
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
                {/* <div className="row g-4 mt-2">
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
                </div> */}

                <div className="row mt-4">
                    <div className="col-md-6">
                        <div className="card text-white card-hover card-hover-gray pb-4">
                            <div className="card-body">
                                <h5 className="card-title">Análise Financeira</h5>
                                <p className="text-muted">Gráfico de barras aqui</p>
                                <Chart options={options} series={options.series} type="bar" height={200} />
                            </div>
                        </div>
                    </div >
                    <div className="col-md-4">
                        <div className="card text-white card-hover card-hover-gray pb-4">
                            <div className="card-body">
                                <h5 className="card-title">Análise de Gastos</h5>
                                <p className="text-muted">Gráfico de pizza aqui</p>
                            </div>
                        </div>
                    </div>
                </div >

            </div >
        </>

    );
};

export default Dashboard;