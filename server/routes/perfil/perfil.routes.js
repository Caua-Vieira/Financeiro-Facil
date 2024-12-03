const express = require("express")
const { atualizarPerfil, carregarDados, verificaPerfilCompleto } = require("../../controllers/perfil/perfil")
const routesPerfil = express.Router()

routesPerfil.put("/atualizarPerfil", atualizarPerfil)
routesPerfil.get("/carregarDados/perfil/:idUsuario", carregarDados)
routesPerfil.get("/verificaPerfil/:idUsuario", verificaPerfilCompleto)

module.exports = routesPerfil