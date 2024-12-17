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
        SELECT fonte_renda, separar_rendas, responsavel
        FROM renda 
        WHERE fonte_renda = '${fonteRenda}'
        ${separarRendas ? `AND responsavel = '${responsavel}'` : ''}    
        `)

        if (verificaFonte.rows.length != 0) {
            if (verificaFonte.rows[0]?.separar_rendas && verificaFonte.rows[0]?.responsavel == responsavel) {
                return res.status(409).send({
                    message: 'Renda já cadastrada para este responsável'
                })
            } else {

                const rendaJaCadastrada = verificaFonte.rows.some(item => !item.separar_rendas)

                if (rendaJaCadastrada) {
                    return res.status(409).send({
                        message: "Renda já cadastrada"
                    })
                }
            }
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
        res.status(500).send({
            message: "Ocorreu um erro ao tentar adicionar renda"
        })
    }
}

async function carregaRendas(req, res) {
    try {

        const buscaRendasCadastradas = await db.query(`
        SELECT id, fonte_renda, renda_mensal, separar_rendas, responsavel FROM renda   
        `)

        if (buscaRendasCadastradas.rows.length == 0) {
            res.status(404).send({
                message: "Não há nenhuma renda cadastrada"
            })
        } else {

            const rendasAtualizadas = buscaRendasCadastradas.rows.map(item => {

                let responsavel
                if (item.responsavel) {
                    responsavel = item.responsavel.charAt(0).toUpperCase() + item.responsavel.slice(1).toLowerCase();
                }

                return {
                    ...item,
                    responsavel: responsavel
                }
            })

            res.status(200).send({
                message: "Rendas encontradas",
                data: rendasAtualizadas
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
