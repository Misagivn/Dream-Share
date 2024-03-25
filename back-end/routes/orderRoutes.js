const express = require('express');
const router = express.Router();
const orderControllers = require("../controllers/orderControllers.js");

router
.route("/")
.get(orderControllers.getAllOrders)
.post(orderControllers.createNewOrders);

router
.route("/:id")
.get(orderControllers.getOrderById)
.put(orderControllers.UpdateAnOrder)
.delete(orderControllers.deleteOrder)

router
.route('/complete/:id')
.put(orderControllers.completeOrder)

router
.route('/cancel/:id')
.put(orderControllers.cancelOrder)
module.exports = router;