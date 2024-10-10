const db = require("../../../config/database")

async function adicionarRenda(req, res) {
    try {
        const { fonteRenda, renda } = req.body

        await db.query(`
        INSERT INTO rendaMensal (
        fonte_renda,
        renda
        ) VALUES (
        '${fonteRenda}',
        ${renda} 
        )
        `)

        res.status(200).send({
            message: "Renda inserida com sucesso"
        })

    } catch (error) {
        res.status(500).send({
            message: "Ocorreu um erro ao tentar adicionar renda"
        })
    }
}

module.exports = {
    adicionarRenda
}
