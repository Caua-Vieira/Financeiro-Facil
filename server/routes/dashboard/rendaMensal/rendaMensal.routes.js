const express = require("express")
const { adicionarRenda } = require("../../../controllers/dashboard/rendaMensal/rendaMensal")
const routesRendaMensal = express.Router()

routesRendaMensal.post("/adicionarRenda", adicionarRenda)


module.exports = routesRendaMensal