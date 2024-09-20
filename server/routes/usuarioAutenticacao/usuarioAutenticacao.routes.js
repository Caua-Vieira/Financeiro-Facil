const express = require("express")
const { cadastraUsuario } = require("../../controllers/usuarioAutenticacao/usuarioAutenticacao")
const routesUsuarioAutenticacao = express.Router()

routesUsuarioAutenticacao.post("/cadastra/usuario", cadastraUsuario)

module.exports = routesUsuarioAutenticacao