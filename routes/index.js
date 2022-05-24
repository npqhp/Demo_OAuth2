var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user === undefined) return res.redirect('/login');
  res.status(200).json(req.user);
});

module.exports = router;
