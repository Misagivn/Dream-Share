const express = require('express');
const staffControllers = require("../controllers/staffControllers.js");
const router = express.Router();
const jwt = require("jsonwebtoken");
require('dotenv').config();

function authenticationTokenUser(req, res, next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(token == null) return res.sendStatus(401)
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, account) => {
    if(err || account.role === 3) return res.sendStatus(403)
    // console.log(role)
    req.account = account
    next()
  })
}

function authenticationTokenAdmin(req, res, next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(token == null) return res.sendStatus(401)
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, account) => {
    if(err || account.role === 3) return res.sendStatus(403)
    // console.log(role)
    req.account = account
    next()
  })
}

router
  .route("/consoleLogin")
  .post(staffControllers.getStaffLogin)

router
  .route("/")
  .get(staffControllers.getAllStaffs)
  .post(staffControllers.createNewStaffs)

router
  .route("/:id")
  .get(staffControllers.getStaffById)
  .delete(staffControllers.deleteStaff)
  .put(staffControllers.updateStaff);
module.exports = router;