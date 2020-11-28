const router = require('express').Router()
const {login,register,deleteUser} = require('../controllers/authController');

router.post('/login', login)
router.post('/register',register)
router.post('/delete', deleteUser)

module.exports = router