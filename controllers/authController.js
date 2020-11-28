const User = require('../models').User
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/app')

exports.login = async (req, res) => {
    const {email, password} = req.body

    try{
        // const crypto = require('crypto').randomBytes(64).toString('hex');
        const user = await User.findOne({
            where : {
                email
            }
        })

        if(!user) 
            return res.status(404).json({message: "User Not Found"})
        
        if(!bcrypt.compareSync(password, user.password)) 
            return res.status(404).json({message: "Incorrect Password"})

        const userToken = generateToken(user)
        return res.send(userToken)
    }
    catch(e){
        res.status(500).json({message: e.message})
    }
}

exports.register = async (req, res) => {
    console.log(req.body.firstName)
    try{
        // const user = await User.create({
        //     firstName : req.body.firstName,
        //     lastName : req.body.lastName,
        //     email : req.body.email,
        //     password : bcrypt.hashSync(req.body.password,10),
        //     gender : req.body.gender,
        // })

        // OR

        // jika menggunakan ini inisialisasi hash password pada model user | cek di models/user.js
        const user = await User.create(req.body) 
        const userToken = generateToken(user.get())
        return res.send(userToken)
    }
    catch(e){
        res.status(500).json({message: e.message})
    }
}

const generateToken = (user) => {
    delete user.password
    const token = jwt.sign(user, config.appKey , {expiresIn: 86400})
    return {user, token}
}

exports.deleteUser = async (req, res) => {
    try{
        const user = await User.destroy({
            where:{
                id: req.body.id
            }
        })
        res.status(200).json({message: "successfully deleted"});
    }
    catch(e){
        res.status(500).json({message: e.message})
    }
}