const User = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../../config/auth')

class LoginCrontroller{
    async index(req, res){

        const { email, password } = req.body

        const userExist = await User.findOne({email})
        if(!userExist){
            return res.status(400).json({
                erro:true,
                message: "Usuario não existe"
            })
        }

        if(!(await bcrypt.compare(password, userExist.password))){
            return res.status(400).json({
                erro:true,
                message: "A senha está inválida"
            })
        }

        return res.status(200).json({
            user:{
                name: userExist.name,
                email: userExist.email
            },
            token: jwt.sign({id: userExist._id}, config.secret, {expiresIn: config.expireIN})
        })
    }
}

module.exports = new LoginCrontroller()