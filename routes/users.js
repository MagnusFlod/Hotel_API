var { canSeeUserList, canSeeUserDetails, checkIfAuthorized, isAdmin } = require("./authMiddlewares")
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var express = require('express');
var router = express.Router();
var db = require("../models");
var UserService = require("../services/UserService")
var userService = new UserService(db);

function myCanSeeUserDetails (req, res, next)
{
  console.log("REQ.USER:", req.user);
  console.log("REQ.PARAMS:", req.params.userId);

  if (req.user != null)
    if(req.user.role === "admin" || req.user.id == req.params.userId)
    {
      next();
      return;
    }

  console.log("REDIRECTING!");
  res.redirect('/login');
}

router.get('/', canSeeUserList, async function(req, res, next)
{
  const users = await userService.getAll();
  res.render('users', { users });
});

/* GET users listing. */
router.get('/:userId', /*myCanSeeUserDetails,*/ async function(req, res, next)
{
  const user = await userService.getOne(req.params.userId);

  if (!user)
  {
    return res.status(404).send("User not found");
  }

  res.json(user);
  /*res.render('userDetails', { user });*/
});


router.delete('/', /*checkIfAuthorized, isAdmin,*/ jsonParser, async function(req, res, next)
{
  let id = req.body.id;
  await userService.deleteUser(id);
  res.end()
});

module.exports = router;
