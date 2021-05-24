var express = require('express');
const { auth } = require('../controller/auth');
var router = express.Router();

router.use('/',auth,(req,res,next) => {
    console.log(req,res)
    next()
})

module.exports = router