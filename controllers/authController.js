const User = require('../models').User
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
exports.login = async (req, res) => {
    const {email, password} = req.body

    try{
        const user = await User.findOne({
            where : {
                email
            },
            attributes: {
            }
        })

        if(!user) return res.status(404).json({message: "User Not Found"})
        
        if(!bcrypt.compareSync(password, user.password)) return res.status(404).json({message: "Incorrect Password"})

        const userToken = generateToken(user)
        return res.send(userToken)
    }
    catch(e){
        res.status(500).json({message: e.message})
    }
}

exports.register = async (req, res) => {
    
}

const generateToken = (user) => {
    delete user.password

    const token = jwt.sign(user.toJSON(), 'secret', {expiresIn: 86400})

    return {...user, ...{token}}
}