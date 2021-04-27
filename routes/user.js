var express = require('express');
var router = express.Router();
const auth = require('../controller/auth')

router.post('/auth',auth.auth);
router.get('/gAuth',auth.gAuth);
router.post('/valid',auth.valid);
router.post('/login',auth.login);
router.post('/register',auth.signup);

module.exports = router