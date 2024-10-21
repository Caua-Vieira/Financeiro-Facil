const db = require("../../../config/database")


async function adicionarDespesas(req, res) {
    try {
        const {
            nomeDespesa,
            valorDespesa,
            categoria
        } = req.body

        const verificaDespesa = await db.query(`
        SELECT nome_despesa FROM despesas WHERE nome_despesa = '${nomeDespesa}'    
        `)

        if (verificaDespesa.rows.length != 0) {
            res.status(409).send({
                message: "Despesa já criada"
            })
        } else {

            await db.query(`
            INSERT INTO despesas (
            nome_despesa,
            valor,
            categoria
            ) VALUES (
            '${nomeDespesa}',
            ${valorDespesa},
            '${categoria}'
            )
            `)

            res.status(200).send({
                message: "Despesa inserida com sucesso!"
            })
        }

    } catch (error) {
        res.status(500).send({
            messsage: "Ocorreu um erro ao tentar adicionar despesa"
        })
    }
}

async function carregarDespesas(req, res) {
    try {

        const buscaDespesas = await db.query(`
        SELECT id, nome_despesa, valor, categoria FROM despesas    
        `)

        if (buscaDespesas.rows.length == 0) {
            res.status(404).send({
                message: "Não há despesas cadastradas"
            })
        } else {
            res.status(200).send({
                message: "Despesas encontradas com sucesso",
                data: buscaDespesas.rows
            })
        }

    } catch (error) {
        res.status(500).send({
            message: "Ocorreu um erro ao carregar despesas"
        })
    }
}

async function excluirDespesa(req, res) {
    try {

        const { idDespesa } = req.params

        await db.query(`
        DELETE FROM despesas WHERE id = ${idDespesa}    
        `)

        res.status(200).send({
            message: "Despesa excluída com sucesso"
        })

    } catch (error) {
        res.status(500).send({
            message: "Ocorreu um erro ao tentar excluir despesa"
        })
    }
}

module.exports = {
    adicionarDespesas,
    carregarDespesas,
    excluirDespesa
}