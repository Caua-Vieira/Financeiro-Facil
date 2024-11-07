const express = require("express")
const { carregaInfosDashboard, carregaDadosAnaliseFinanceira, carregaDadosAnaliseGastos } = require("../../controllers/dashboard/dashboard")
const routesDashboard = express.Router()

routesDashboard.get("/carregaInfos/dashboard", carregaInfosDashboard)
routesDashboard.get("/carregaDados/analiseFinanceira", carregaDadosAnaliseFinanceira)
routesDashboard.get("/carregaDados/analiseGastos", carregaDadosAnaliseGastos)

module.exports = routesDashboard

