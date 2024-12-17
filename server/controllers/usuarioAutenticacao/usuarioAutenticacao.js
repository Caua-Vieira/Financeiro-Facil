const db = require("../../config/database")
const { criptografarSenha, validaSenha } = require("../../security/criptografia")
const { resgatarDadosToken } = require("../../security/token")

async function cadastraUsuario(req, res) {
    try {
        const {
            nomeUsuario,
            email,
            senha
        } = req.body

        const verificaEmail = await db.query(`
        SELECT email FROM usuarios WHERE email = '${email}'    
        `)

        if (verificaEmail.rows.length != 0) {
            res.status(409).send({
                message: "E-mail já cadastrado"
            })
        } else {

            const senhaCriptografada = await criptografarSenha(senha)

            await db.query(`
            INSERT INTO usuarios (
            nome,
            email,
            senha
            ) VALUES (
            '${nomeUsuario}',
            '${email}',
            '${senhaCriptografada}' 
            )
            `)

            res.status(200).send({
                message: "Usuário cadastrado com sucesso!"
            })
        }
    } catch (error) {
        res.status(500).send({
            message: "Ocorreu um erro ao tentar cadastrar usuário",
            error: error.message
        })
    }
}

async function login(req, res) {
    try {
        const {
            email,
            senha
        } = req.params

        const verificaLogin = await db.query(`
        SELECT id, nome, email, senha FROM usuarios WHERE email = '${email}'    
        `)

        if (verificaLogin.rows.length == 0) {
            return res.status(404).send({
                message: "Usuário inexistente"
            })
        } else {

            const verificaSenha = await validaSenha(senha, verificaLogin.rows[0].senha)

            if (verificaSenha) {

                res.status(200).send({
                    message: `Bem-vindo(a) ${verificaLogin.rows[0].nome}`,
                    data: verificaLogin.rows[0].id
                })
            } else {
                res.status(401).send({
                    message: "Senha incorreta"
                })
            }
        }

    } catch (error) {
        res.status(500).send({
            message: "Ocorreu um erro ao tentar realizar login"
        })
    }
}

async function alterarSenha(req, res) {
    try {
        const {
            senha,
            token
        } = req.body

        const dadosToken = resgatarDadosToken(token)
        const idUsuario = dadosToken.idUsuario

        const senhaCriptografada = await criptografarSenha(senha)

        await db.query(`
        UPDATE usuarios
        SET senha = '${senhaCriptografada}'
        WHERE id = ${idUsuario}
        `)

        res.status(200).send({
            message: "Senha alterada com sucesso!"
        })

    } catch (error) {
        res.status(500).send({
            message: "Ocorreu um erro ao tentar alterar senha"
        })
    }
}

module.exports = {
    cadastraUsuario,
    login,
    alterarSenha
}