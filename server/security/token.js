const jwt = require("jsonwebtoken")

function criarJWT(idUsuario) {
    try {
        const token = jwt.sign({ user_id: idUsuario }, process.env.CHAVE_JWT, { expiresIn: '10m' })

        return token;
    } catch (error) {
        throw new Error('Erro ao gerar token: ' + error.message);
    }
}

function verificaJWT(req, res, next) {
    try {
        const authorization = req.headers.authorization

        if (!authorization) {
            return res.status(403).send({
                message: "Token inválido"
            })
        }
        jwt.verify(authorization, process.env.CHAVE_JWT, function (erro) {
            if (erro) {
                return res.status(403).send({
                    message: "Token inválido"
                })
            } else {
                next()
            }
        })

    } catch (error) {
        res.status(500).send({
            message: 'Erro ao verificar token: ' + error.message
        });
    }
}

function resgatarDadosToken(token) {
    try {
        const tokenDecodificado = jwt.verify(token, process.env.CHAVE_JWT);

        if (!tokenDecodificado) {
            throw new Error("Token inválido")
        }

        const idUsuario = tokenDecodificado.user_id;

        return {
            idUsuario: idUsuario,
        };
    } catch (error) {
        throw new Error('Erro ao decodificar token: ' + error.message);
    }
}

module.exports = {
    criarJWT,
    verificaJWT,
    resgatarDadosToken
}