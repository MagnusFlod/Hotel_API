var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next)
{
  res.render('index', { title: 'Express', username: req.user?.username});
});

router.get('/profile', (req, res) =>
{
  res.json(req.oidc.user);
});

module.exports = router;
