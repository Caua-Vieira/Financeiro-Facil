const db = require("../../config/database")

async function atualizarPerfil(req, res) {
    try {

        const {
            idUsuario,
            avatar,
            nomeUsuario,
            profissao,
            dataNascimento,
            endereco,
            numero,
            cep,
            genero,
            perfilFinanceiro
        } = req.body

        console.log(req.body)

        console.log(`
            UPDATE usuarios 
        SET avatar = '${avatar}',
            nome = '${nomeUsuario}',
            profissao = '${profissao}',
            data_nascimento = '${dataNascimento}',
            endereco = '${endereco}',
            telefone = ${numero},
            cep = ${cep},
            genero = ${genero},
            perfil_financeiro = '${perfilFinanceiro}'
        WHERE id = ${idUsuario}
        `)

        await db.query(`
        UPDATE usuarios 
        SET avatar = '${avatar}',
            nome = '${nomeUsuario}',
            profissao = '${profissao}',
            data_nascimento = '${dataNascimento}',
            endereco = '${endereco}',
            telefone = ${numero},
            cep = ${cep},
            genero = '${genero}',
            perfil_financeiro = '${perfilFinanceiro}'
        WHERE id = ${idUsuario}
        `)

        res.status(200).send({
            message: "Perfil atualizado com sucesso"
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            message: "Ocorreu um erro ao atualizar perfil: " + error.message
        })
    }
}

async function carregarDados(req, res) {
    try {

        const { idUsuario } = req.params

        const buscaDadosUsuario = await db.query(`
        SELECT * FROM usuarios WHERE id = ${idUsuario}    
        `)

        if (buscaDadosUsuario.rows.length == 0) {
            res.status(404).send({
                message: "Não foram encontrados dados para o usuário"
            })
        } else {
            res.status(200).send({
                data: buscaDadosUsuario.rows
            })
        }

    } catch (error) {
        res.status(500).send({
            message: "Ocorreu um erro ao carregar dados do perfil: " + error.message
        })
    }
}

module.exports = {
    atualizarPerfil,
    carregarDados
}