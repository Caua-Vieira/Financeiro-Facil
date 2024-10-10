const db = require("../../../config/database")

async function adicionarRenda(req, res) {
    try {
        const { fonteRenda, renda } = req.body
        console.log(req.body)

        await db.query(`
        INSERT INTO renda (
        fonte_renda,
        renda_mensal
        ) VALUES (
        '${fonteRenda}',
        ${renda} 
        )
        `)

        res.status(200).send({
            message: "Renda inserida com sucesso"
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            message: "Ocorreu um erro ao tentar adicionar renda"
        })
    }
}

async function carregaRendas(req, res) {
    try {

        const buscaRendasCadastradas = await db.query(`
        SELECT fonte_renda, renda_mensal FROM renda   
        `)

        if (buscaRendasCadastradas.rows.length == 0) {
            res.status(404).send({
                message: "Não há nenhuma renda cadastrada"
            })
        } else {
            res.status(200).send({
                message: "Rendas encontradas",
                data: buscaRendasCadastradas.rows
            })
        }

    } catch (error) {
        res.status(500).send({
            message: "Ocorreu um erro ao tentar carregar rendas"
        })
    }
}

module.exports = {
    adicionarRenda,
    carregaRendas
}
