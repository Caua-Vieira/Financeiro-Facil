const db = require("../../../config/database")

async function adicionarRenda(req, res) {
    try {
        const {
            fonteRenda,
            renda,
            separarRendas,
            responsavel
        } = req.body

        const verificaFonte = await db.query(`
        SELECT fonte_renda 
        FROM renda 
        WHERE fonte_renda = '${fonteRenda}'
        ${separarRendas ? `AND responsavel = '${responsavel}'` : ''}    
        `)

        if (verificaFonte.rows.length != 0) {
            return res.status(409).send({
                message: 'Renda já cadastrada'
            })
        }

        const sqlInsert = await db.query(`
        INSERT INTO renda (
            fonte_renda,
            renda_mensal,
            separar_rendas
        ) VALUES (
            '${fonteRenda}',
            ${renda},
            ${separarRendas}
        ) RETURNING id;
        `)

        if (separarRendas) {
            await db.query(`
            UPDATE renda
            SET responsavel = '${responsavel}'
            WHERE id = ${sqlInsert.rows[0].id} 
            `)
        }

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
        SELECT id, fonte_renda, renda_mensal FROM renda   
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

async function deletaRenda(req, res) {
    try {

        const { idFonteRenda } = req.params

        await db.query(`
        DELETE FROM renda WHERE id = ${idFonteRenda}
        `)

        res.status(200).send({
            message: "Renda excluída com sucesso"
        })

    } catch (error) {
        res.status(500).send({
            message: "Ocorreu um erro ao tentar excluir renda"
        })
    }
}

module.exports = {
    adicionarRenda,
    carregaRendas,
    deletaRenda
}
