const db = require("../../config/database")
const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587, // Porta 587 para STARTTLS
    secure: false, // false para STARTTLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false // Ignorar erros de certificados (opcional)
    }
});

async function enviarEmailRecSenha(req, res) {
    try {

        const { email } = req.body

        const verificaEmail = await db.query(`
        SELECT email FROM usuarios WHERE email = '${email}'    
        `)

        if (verificaEmail.rows.length == 0) {
            return res.status(404).send({
                message: "E-mail não cadastrado"
            })
        }

        const emailOptions = {
            from: `Financeiro Fácil <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Confirmação de alteração de senha',
            text: `
            --Financeiro Fácil--\n
            
            Olá, este é um e-mail automático, por favor não responda!\n
            Entre no link abaixo para alterar a senha da sua conta: 
            
            \n\nhttp://localhost:3000/usuario/autenticacao/alterarSenha
            `
        }

        transport.sendMail(emailOptions, (error, info) => {
            if (error) {
                console.log(error.message)
                res.status(500).send({
                    message: "Erro ao tentar enviar e-mail"
                })
            } else {
                res.status(200).send({
                    message: "E-mail de confirmação enviado com sucesso"
                })
            }
        })

    } catch (error) {
        res.status(500).send({
            message: "Ocorreu um erro ao tentar enviar e-mail de recuperação de senha"
        })
    }
}

module.exports = {
    enviarEmailRecSenha
}