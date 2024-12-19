require('dotenv').config();
const pg = require("pg")
const { Client } = pg

const dbconnection = new Client({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT_DB,
    database: process.env.DATABASE
})

dbconnection.connect().then(() => {

    console.log("Conectado ao banco com sucesso.")
}).catch((erro) => {

    console.log(erro)
})

module.exports = dbconnection