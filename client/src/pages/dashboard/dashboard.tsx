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
    const [dadosAnaliseRendas, setDadosAnaliseRendas] = useState<any[]>([])

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
                setDadosAnaliseRendas(resposta.data.data)
            }).catch(function (erro) {
                toast.error(erro.response.data.message)
            })
    }

    async function carregaDadosAnaliseGastos() {
        await axios.get(`http://localhost:8000/carregaDados/analiseGastos`)
            .then(function (resposta) {
                console.log(resposta)
            }).catch(function (erro) {
                toast.error(erro.response.data.message)
            })
    }

    useEffect(() => {
        carregaInfosDashboard()
        carregaDadosAnaliseFinanceira()
        carregaDadosAnaliseGastos()
    }, [])

    const labels = dadosAnaliseRendas.map(item => item.fonte_renda);
    const values = dadosAnaliseRendas.map(item => parseFloat(item.renda_mensal));

    const options: ApexOptions = {
        series: [
            {
                name: 'Renda Mensal',
                data: values,
            },
        ],
        chart: {
            height: 150,
            type: 'bar',
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                dataLabels: {
                    position: 'top',
                },
                colors: {
                    ranges: [
                        {
                            from: 0,
                            to: 10000,
                            color: '#3399ff',
                        },
                    ],
                },
            },
        },
        dataLabels: {
            enabled: true,
            formatter: (val: number) => `R$ ${val.toFixed(2)}`,
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ['#FFFFFF'],
            },
        },
        xaxis: {
            categories: labels,
            labels: {
                style: {
                    colors: Array(labels.length).fill('#FFFFFF'),
                    fontSize: '12px',
                },
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            labels: {
                formatter: (val) => `R$ ${val.toFixed(2)}`,
                style: {
                    colors: ['#FFFFFF'],
                    fontSize: '12px',
                },
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        grid: {
            padding: {
                top: 1,
            },
        },
        tooltip: {
            enabled: true,
            theme: 'dark',
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
                                <Chart options={options} series={options.series} type="bar" height={220} />
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