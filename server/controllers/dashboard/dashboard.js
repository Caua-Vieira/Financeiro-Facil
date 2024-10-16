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

module.exports = {
    carregaInfosDashboard
}