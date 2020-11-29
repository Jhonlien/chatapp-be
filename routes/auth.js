const router = require('express').Router()
const { login, register, deleteUser } = require('../controllers/authController')
const { validate } = require('../validators/')
const { rules: registrationRules } = require('../validators/auth/register')
const { rules: loginRules } = require('../validators/auth/login')


router.post('/login',[loginRules, validate],login)

router.post('/register',[registrationRules, validate], register)

router.post('/delete', deleteUser)

module.exports = router