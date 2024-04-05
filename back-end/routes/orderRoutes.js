const express = require("express");
const router = express.Router();
const orderControllers = require("../controllers/orderControllers.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticationToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, account) => {
    if (err || account.role === null) return res.sendStatus(403);
    // console.log(role)
    req.account = account;
    next();
  });
}
function authenticationTokenUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, account) => {
    if (err || account.role !== 3) return res.sendStatus(403);
    // console.log(role)
    req.account = account;
    next();
  });
}

function authenticationTokenAdmin(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, account) => {
    if (err || account.role === 3) return res.sendStatus(403);
    // console.log(role)
    req.account = account;
    next();
  });
}

router
  .route("/")
  .get(authenticationToken, orderControllers.getAllOrders)
  .post(authenticationTokenUser, orderControllers.createNewOrders);

router
  .route("/:id")
  .get(orderControllers.getOrderById)
  .put(orderControllers.UpdateAnOrder)
  .delete(authenticationTokenAdmin ,orderControllers.deleteOrder);

router.route("/complete/:id").put(authenticationTokenAdmin, orderControllers.completeOrder);

router.route("/cancel/:id").put(authenticationTokenAdmin ,orderControllers.cancelOrder);
module.exports = router;
