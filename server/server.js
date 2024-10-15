require('dotenv').config();
const express = require("express")
const app = express()

const port = process.env.PORT

const routesUsuarioAutenticacao = require("./routes/usuarioAutenticacao/usuarioAutenticacao.routes")
const routesRendaMensal = require('./routes/dashboard/rendaMensal/rendaMensal.routes');
const routesDashboard = require('./routes/dashboard/dashboard.routes');

const cors = require("cors")
app.use(cors())

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(routesUsuarioAutenticacao)
app.use(routesRendaMensal)
app.use(routesDashboard)

app.listen(port, function () {
    console.log(`RODANDO NA PORTA: http://localhost:` + port)
})