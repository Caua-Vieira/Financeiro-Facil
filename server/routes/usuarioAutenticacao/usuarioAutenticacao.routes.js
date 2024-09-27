const express = require("express")
const { cadastraUsuario, login } = require("../../controllers/usuarioAutenticacao/usuarioAutenticacao")
const routesUsuarioAutenticacao = express.Router()

routesUsuarioAutenticacao.post("/cadastra/usuario", cadastraUsuario)
routesUsuarioAutenticacao.get("/login/:email/:senha", login)


module.exports = routesUsuarioAutenticacao