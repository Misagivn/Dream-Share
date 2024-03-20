const Order = require("../models/Order.js");

exports.getAllOrders = async (req, res, next) => {
  try {
    const [orders, _] = await Order.findAll();
    res.status(200).json({ count: orders.length, orders });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.createNewOrders = async (req, res, next) => {
  try {
    let {
      account_id,
      account_name,
      account_email,
      account_phone,
      shipping_address,
      created_at,
      payment_method,
      total_price,
      status,
    } = req.body;
    let order = new Order(
      account_id,
      account_name,
      account_email,
      account_phone,
      shipping_address,
      created_at,
      payment_method,
      total_price,
      status
    );

    order = await order.save();
    res.status(201).json({
      message: "Order has been created successfully!",
      data: order,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    let orderId = req.params.id;
    let [order, _] = await Order.findOrderById(orderId);

    res.status(200).json({ order: order[0] });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
exports.deleteOrder = async  (req, res, next) => {
  try{
    let orderId = req.params.id;
    let [order, _] = await Order.deleteOrder(orderId);
    res.status(200).json({message:"Delete Successfully!"});
  } catch(error) {
    console.log(error);
    next(error);
  }
}
exports.UpdateAnOrder = async (req, res, next) => {
  try {
    let orderId = req.params.id;
    let {
      account_id,
      account_name,
      account_email,
      account_phone,
      shipping_address,
      created_at,
      payment_method,
      total_price,
      status,
    } = req.body;
    let order = new Order(
      account_id,
      account_name,
      account_email,
      account_phone,
      shipping_address,
      created_at,
      payment_method,
      total_price,
      status
    );
    order = await order.UpdatedAnOrder(orderId);
    res.status(201).json({ message: "Update Successfully!", data: order });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
