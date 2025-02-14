require('dotenv').config();
const express = require("express")
const app = express()

const port = process.env.PORT

const routesUsuarioAutenticacao = require("./routes/usuarioAutenticacao/usuarioAutenticacao.routes")
const routesRendaMensal = require('./routes/dashboard/rendaMensal/rendaMensal.routes');
const routesDashboard = require('./routes/dashboard/dashboard.routes');
const routesDespesas = require('./routes/dashboard/despesas/despesas.routes');
const routesRecuperacaoSenha = require('./routes/recuperacaoSenha/recuperacaoSenha.routes');
const routesPerfil = require('./routes/perfil/perfil.routes');

const cors = require("cors")
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routesUsuarioAutenticacao)
app.use(routesRendaMensal)
app.use(routesDashboard)
app.use(routesDespesas)
app.use(routesRecuperacaoSenha)
app.use(routesPerfil)

app.listen(port, function () {
    console.log(`RODANDO NA PORTA: ` + port)
})