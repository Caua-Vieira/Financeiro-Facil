require('dotenv').config();
const express = require("express")
const app = express()

const port = process.env.PORT

const routesUsuarioAutenticacao = require("./routes/usuarioAutenticacao/usuarioAutenticacao.routes")

const cors = require("cors")
app.use(cors())

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(routesUsuarioAutenticacao)

app.listen(port, function () {
    console.log(`RODANDO NA PORTA: http://localhost:` + port)
})