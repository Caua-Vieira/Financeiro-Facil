const express = require("express")
const { carregaInfosDashboard } = require("../../controllers/dashboard/dashboard")
const routesDashboard = express.Router()

routesDashboard.get("/carregaInfos/dashboard", carregaInfosDashboard)

module.exports = routesDashboard

