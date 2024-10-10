const express = require("express")
const { adicionarRenda, carregaRendas } = require("../../../controllers/dashboard/rendaMensal/rendaMensal")
const routesRendaMensal = express.Router()

routesRendaMensal.post("/adicionarRenda", adicionarRenda)
routesRendaMensal.get("/carregaRendas", carregaRendas)

module.exports = routesRendaMensal