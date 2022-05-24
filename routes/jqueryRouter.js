var express = require('express');
const path = require("path");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname,'../public/javascripts/jquery-3.6.0.min.js'));
});

module.exports = router;
