const db = require("../../config/database")
const { criptografarSenha } = require("../../security/criptografia")

async function cadastraUsuario(req, res) {
    try {
        const {
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
                email,
                senha
                ) VALUES (
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

module.exports = {
    cadastraUsuario
}