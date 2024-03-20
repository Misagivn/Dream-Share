const express = require('express');
const router = express.Router();
const orderDetailControllers = require("../controllers/orderDetailControllers.js");

router
.route("/:orderId")
.post(orderDetailControllers.createNewOrderDetails);

router
.route("/:id")
.get(orderDetailControllers.getOrderDetailById)
// .put(orderDetailControllers.UpdateAnOrder)
.delete(orderDetailControllers.deleteOrderDetails);

router
.route("/getOrder/:accId")
.get(orderDetailControllers.getOrderFromAcc)

module.exports = router;