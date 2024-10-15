const express = require("express")
const { adicionarRenda, carregaRendas, deletaRenda } = require("../../../controllers/dashboard/rendaMensal/rendaMensal")
const routesRendaMensal = express.Router()

routesRendaMensal.post("/adicionarRenda", adicionarRenda)
routesRendaMensal.get("/carregaRendas", carregaRendas)
routesRendaMensal.delete("/deletaRenda/:idFonteRenda", deletaRenda)

module.exports = routesRendaMensal