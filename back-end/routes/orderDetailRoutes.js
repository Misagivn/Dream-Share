const express = require('express');
const router = express.Router();
const orderDetailControllers = require("../controllers/orderDetailControllers.js");
const jwt = require("jsonwebtoken");
require('dotenv').config();

function authenticationTokenUser(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, account) => {
      if(err || account.role !== 3) return res.sendStatus(403)
      // console.log(role)
      req.account = account
      next()
    })
  }

router
.route("/:orderId")
.post(authenticationTokenUser, orderDetailControllers.createNewOrderDetails);

router
.route("/:id")
.get(orderDetailControllers.getOrderDetailById)
// .put(orderDetailControllers.UpdateAnOrder)
.delete(orderDetailControllers.deleteOrderDetails);

router
.route("/getOrder/:accId")
.get(orderDetailControllers.getOrderFromAcc)

module.exports = router;