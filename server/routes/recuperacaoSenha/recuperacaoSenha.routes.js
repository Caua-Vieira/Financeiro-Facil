const express = require("express")
const { enviarEmailRecSenha } = require("../../controllers/recuperacaoSenha/recuperacaoSenha")
const routesRecuperacaoSenha = express.Router()

routesRecuperacaoSenha.post("/enviarEmail/recuperacaoSenha", enviarEmailRecSenha)

module.exports = routesRecuperacaoSenha