const express = require("express")
const { cadastraUsuario, login, alterarSenha } = require("../../controllers/usuarioAutenticacao/usuarioAutenticacao")
const { verificaJWT } = require("../../security/token")
const routesUsuarioAutenticacao = express.Router()

routesUsuarioAutenticacao.post("/cadastra/usuario", cadastraUsuario)
routesUsuarioAutenticacao.get("/login/:email/:senha", login)
routesUsuarioAutenticacao.put("/alterar/senha", verificaJWT, alterarSenha)

module.exports = routesUsuarioAutenticacao