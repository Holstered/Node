const jwt = require('jsonwebtoken')
const config = require('../../config/auth')
const {promisify} = require('util')

module.exports = async (req, res, next) => {
    const auth = req.headers.authorization
    if(!auth){
        return res.status(400).json({
            error: true,
            code: 401,
            message: "O token de autenticação não existe"
        })
    }
    const [,token] = auth.split(" ")
    //next()
    try{

        const decoded = await promisify(jwt.verify)( token , config.secret)

        if(!decoded){
            return res.status(400).json({
                error: true,
                code: 403,
                message: "O token está expirado"
            })
        }else{
            req.user_id = decoded.id
        }
    }catch(error){
        return res.status(400).json({
            error: true,
            code: 403,
            message: "O token está inválido"
        })
    }
}