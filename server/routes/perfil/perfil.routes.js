const express = require("express")
const { atualizarPerfil, carregarDados } = require("../../controllers/perfil/perfil")
const routesPerfil = express.Router()

routesPerfil.put("/atualizarPerfil", atualizarPerfil)
routesPerfil.get("/carregarDados/perfil/:idUsuario", carregarDados)

module.exports = routesPerfil