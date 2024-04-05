const express = require('express');
const brandControllers = require("../controllers/brandControllers.js");
const router = express.Router();

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

function authenticationToken(req, res, next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(token == null) return res.sendStatus(401)
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, account) => {
    if(err || account.role === null) return res.sendStatus(403)
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
  .route("/")
  .get(brandControllers.getAllBrands)
  .post(brandControllers.createNewBrand)

router
  .route("/:id")
  .delete(brandControllers.deleteBrand)
  .get(brandControllers.getBrandById)
  .put(brandControllers.updateABrand)
module.exports = router;