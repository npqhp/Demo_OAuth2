var express = require('express');
const path = require("path");
var router = express.Router();
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname,'../page/login.html'));
});

router.post('/', function(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    let id = -1;
    if (username === 'admin' && password === 'admin') id = 0;
    if (username === 'customer' && password === 'customer') id = 1;

    if (id === (-1)) {
        return res.status(201).json({
            message: "Not found Account"
        })
    }

    var token = jwt.sign({
        id: id
    }, 'id');
    res.status(200).json({
        message: 'Login success',
        token: token
    })
});

module.exports = router;
