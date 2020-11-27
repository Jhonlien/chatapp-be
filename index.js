require('dotenv').config();

const 
        config  = require('./config/app')
        express = require('express'),
        app     = express()
        port    = config.appPort


app.get('/',(req,res) => {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`Server running on ${port} port`);
})