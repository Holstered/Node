const User = require('../model/user')
const yup = require('yup')
const bcryptjs = require('bcryptjs')

class UserController {
    index(req, res){
        console.log(req.body);
    }

    show(req, res) {
        var users = ["Julia,Jonas,João"]
        return res.status(200).json({
            error: false,
            users
        })
    }

    async store(req, res){

        let schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required(),
        })

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({
                error: true,
                message: "Dados inválidos"
            })
        }

        let userExist = await User.findOne({
            email: req.body.email
        })

        if(userExist){
            return res.status(400).json({
                error: true,
                message: "Este usuário já existe"
            })
        }

        const{name, email, password} = req.body
        const data = {name, email, password}

        data.password = await bcryptjs.hash(data.password, 8)

        await User.create(data, (err) => {
            if(err) return res.status(400).json({
                error: true,
                message: "Erro ao tentar inserir usuario Mongo DB"
            })

            return res.status(200).json({
                error: false,
                message: "Exito ao inserir usuario Mongo DB"
            })
        })
    }
}
module.exports = new UserController()