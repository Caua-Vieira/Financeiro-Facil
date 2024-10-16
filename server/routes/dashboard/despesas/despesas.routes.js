const express = require("express")
const { adicionarDespesas, carregarDespesas, excluirDespesa } = require("../../../controllers/dashboard/despesas/despesas")
const routesDespesas = express.Router()

routesDespesas.post("/adicionarDespesas", adicionarDespesas)
routesDespesas.get("/carregarDespesas", carregarDespesas)
routesDespesas.delete("/deletaDespesa/:idDespesa", excluirDespesa)

module.exports = routesDespesas

