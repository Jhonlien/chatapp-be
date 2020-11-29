const { validationResult } = require("express-validator")

exports.validate = (req,res,next) => {
    const err = validationResult(req)
    console.log(err.array())
    if(!err.isEmpty()){ // error is not empty ? 
        return res.status(400).json({ errors : err.array() })
    }
    next()
}