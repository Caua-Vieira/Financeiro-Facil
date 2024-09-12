import React, { useEffect } from 'react';
import { Icon } from '@mdi/react';
import { mdiCurrencyUsd, mdiChartLine, mdiBank, mdiCreditCardOutline, mdiHeartPulse, mdiAccountGroup, mdiHomeCity, mdiCashMultiple } from '@mdi/js';

function Dashboard() {

    useEffect(() => {
        console.log("renderizou ")
    }, [])

    return (
        <>
            <div className="p-4" style={{ backgroundColor: '#2c3e50', minHeight: '100vh', color: '#ecf0f1' }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Gestão Financeira</h2>
                    <div>
                        <button className="btn btn-outline-light me-2">Filtrar</button>
                        <button className="btn btn-primary">Ver tudo</button>
                    </div>
                </div>

                <div className="row g-4">
                    <div className="col-md-3">
                        <div className="card bg-primary text-white">
                            <div className="card-body">
                                <h5 className="card-title">Renda Mensal</h5>
                                <p className="card-text fs-4">R$ 12.500,00</p>
                                <Icon path={mdiCurrencyUsd} size={1.5} className="position-absolute bottom-0 end-0 m-2" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card" style={{ backgroundColor: '#34495e', color: '#ecf0f1' }}>
                            <div className="card-body">
                                <h5 className="card-title">Renda Extra</h5>
                                <p className="card-text fs-4">R$ 5.430,00</p>
                                <Icon path={mdiChartLine} size={1.5} className="position-absolute bottom-0 end-0 m-2" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card" style={{ backgroundColor: '#34495e', color: '#ecf0f1' }}>
                            <div className="card-body">
                                <h5 className="card-title">Investimento CDB</h5>
                                <p className="card-text fs-4">R$ 650,00</p>
                                <Icon path={mdiBank} size={1.5} className="position-absolute bottom-0 end-0 m-2" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card" style={{ backgroundColor: '#34495e', color: '#ecf0f1' }}>
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
                        <div className="card" style={{ backgroundColor: '#34495e', color: '#ecf0f1' }}>
                            <div className="card-body">
                                <h5 className="card-title">Seguro de vida</h5>
                                <p className="card-text fs-4">R$ 95,00</p>
                                <Icon path={mdiHeartPulse} size={1.5} className="position-absolute bottom-0 end-0 m-2" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card" style={{ backgroundColor: '#34495e', color: '#ecf0f1' }}>
                            <div className="card-body">
                                <h5 className="card-title">Plano de saúde familiar</h5>
                                <p className="card-text fs-4">R$ 430,10</p>
                                <Icon path={mdiAccountGroup} size={1.5} className="position-absolute bottom-0 end-0 m-2" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card" style={{ backgroundColor: '#34495e', color: '#ecf0f1' }}>
                            <div className="card-body">
                                <h5 className="card-title">Fundos Imobiliários</h5>
                                <p className="card-text fs-4">R$ 800,75</p>
                                <Icon path={mdiHomeCity} size={1.5} className="position-absolute bottom-0 end-0 m-2" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card" style={{ backgroundColor: '#34495e', color: '#ecf0f1' }}>
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
                        <div className="card" style={{ backgroundColor: '#34495e', color: '#ecf0f1' }}>
                            <div className="card-body">
                                <h5 className="card-title">Análise Financeira</h5>
                                <p className="text-muted">Gráfico de barras aqui</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card" style={{ backgroundColor: '#34495e', color: '#ecf0f1' }}>
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