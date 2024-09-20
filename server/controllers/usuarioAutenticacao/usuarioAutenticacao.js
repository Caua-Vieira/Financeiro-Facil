// const db = require("")

async function cadastraUsuario(req, res) {
    try {
        const {
            email,
            senha
        } = req.body

        // await db.query(`
        // INSERT INTO usuarios (
        // email,
        // senha,
        // data_cadastro
        // ) VALUES (
        // '${email}',
        // '${senha}',
        // CURRENT_TIMESTAMP 
        // )
        // `)

        res.status(200).send({
            message: "Usuário cadastrado com sucesso!"
        })

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