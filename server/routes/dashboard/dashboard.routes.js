const express = require("express")
const { carregaInfosDashboard } = require("../../controllers/dashboard/dashboard")
const routesDashboard = express.Router()

routesDashboard.get("/carregaInfos/dashboard", carregaInfosDashboard)
routesDashboard.get("/carregaDados/analiseFinanceira")

module.exports = routesDashboard

