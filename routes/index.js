const router = require('express').Router()

router.use(require('./auth'))

router.get('/',(req,res) => {
    res.send('home route')
})

module.exports = router