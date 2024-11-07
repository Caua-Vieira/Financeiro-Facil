const db = require("../../config/database")

async function carregaInfosDashboard(req, res) {
    try {

        const buscaRendaMensal = await db.query(`
        SELECT SUM(renda_mensal) as renda_mensal FROM renda    
        `)

        const buscaDespesaMensal = await db.query(`
        SELECT SUM(valor) as despesa_mensal FROM despesas    
        `)

        res.status(200).send({
            message: "Renda mensal encontrada",
            rendaMensal: buscaRendaMensal.rows[0]?.renda_mensal,
            despesaMensal: buscaDespesaMensal.rows[0]?.despesa_mensal
        })

    } catch (error) {
        res.status(500).send({
            message: "Ocorreu um erro ao buscar informações do dashboard"
        })
    }
}

async function carregaDadosAnaliseFinanceira(req, res) {
    try {

        const buscaRendas = await db.query(`
        SELECT fonte_renda, renda_mensal, data_criacao FROM renda    
        `)

        if (buscaRendas.rows.length == 0) {
            res.status(404).send({
                message: "Não há nenhuma renda cadastrada"
            })
        } else {
            res.status(200).send({
                message: "Rendas encontradas",
                data: buscaRendas.rows
            })
        }

    } catch (error) {
        res.status(500).send({
            message: "Ocorreu um erro ao carregar dados para análise de rendas"
        })
    }
}

async function carregaDadosAnaliseGastos(req, res) {
    try {

        const buscaGastos = await db.query(`
        SELECT nome_despesa, valor, categoria FROM despesas
        `)

        if (buscaGastos.rows.length == 0) {
            res.status(404).send({
                message: "Não há gastos cadastrados"
            })
        } else {
            res.status(200).send({
                message: "Gastos encontrados",
                data: buscaGastos.rows
            })
        }

    } catch (error) {
        res.status(500).send({
            message: "Ocorreu um erro ao carregar dados para análise de gastos"
        })
    }
}

module.exports = {
    carregaInfosDashboard,
    carregaDadosAnaliseFinanceira,
    carregaDadosAnaliseGastos
}