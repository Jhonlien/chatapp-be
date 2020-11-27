const router = require('express').Router()

router.post('/login',(req,res) => {
    return res.send(['login', req.body])
})


router.post('/register',(req,res) => {
    res.send('register route')
})

module.exports = router