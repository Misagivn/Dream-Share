const express = require('express');
const accountControllers = require("../controllers/accountControllers.js");
const router = express.Router();
const jwt = require("jsonwebtoken");
require('dotenv').config();


function authenticationTokenUser(req, res, next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(token == null) return res.sendStatus(401)
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, account) => {
    if(err || account.role != 3) return res.sendStatus(403)
    // console.log(role)
    req.account = account
    next()
  })
}

router
  .route("/")
  .post(accountControllers.checkAccount)

router
  .route("/create") 
  .post(accountControllers.createAccount)

router
  .route("/:accEmail")
  .get(accountControllers.checkExist)

router
  .route("/addWallet/:id/:money")
  .put(authenticationTokenUser ,accountControllers.addWallet)

router
  .route("/updateWallet/:id/:money")
  .put(authenticationTokenUser, accountControllers.updateWallet)

module.exports = router;