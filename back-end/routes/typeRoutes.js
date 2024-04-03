const express = require('express');
const typeControllers = require("../controllers/typeControllers.js");
const router = express.Router();

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

router
  .route("/")
  .get(typeControllers.getAllTypes)
  .post(typeControllers.createNewType)

router
  .route("/:id")
  .get(typeControllers.getTypeById)
  .delete(typeControllers.deleteType)
  .put(typeControllers.updateAType);
module.exports = router;