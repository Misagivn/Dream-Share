const OrderDetail = require("../models/OrderDetail.js");

exports.createNewOrderDetails = async (req, res, next) => {
    let orderId = req.params.orderId;
  try {
    let {
      order_id,
      product_id,
      quantity,
      price
    } = req.body;
    let orderDetail = new OrderDetail(
      order_id = orderId,
      product_id,
      quantity,
      price
    );

    orderDetail = await orderDetail.save();
    res.status(201).json({
      message: "Order has been created successfully!",
      data: orderDetail,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getOrderDetailById = async (req, res, next) => {
  try {
    let orderId = req.params.id;
    let [orderDetails, _] = await OrderDetail.findOrderDetailById(orderId);

    res.status(200).json({ count: orderDetails.length, orderDetails});
  } catch (error) {
    console.log(error);
    next(error);
  }
}
exports.deleteOrderDetails = async  (req, res, next) => {
  try{
    let orderId = req.params.id;
    let [orderDetails, _] = await OrderDetail.deleteOrder(orderId);
    res.status(200).json({message:"Delete Successfully!"});
  } catch(error) {
    console.log(error);
    next(error);
  }
}
// exports.UpdateAnOrder = async (req, res, next) => {
//   try {
//     let orderId = req.params.id;
//     let {
//       account_id,
//       account_name,
//       account_email,
//       account_phone,
//       shipping_address,
//       created_at,
//       payment_method,
//       total_price,
//       status,
//     } = req.body;
//     let order = new Order(
//       account_id,
//       account_name,
//       account_email,
//       account_phone,
//       shipping_address,
//       created_at,
//       payment_method,
//       total_price,
//       status
//     );
//     order = await order.UpdatedAnOrder(orderId);
//     res.status(201).json({ message: "Update Successfully!", data: order });
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// }
exports.getOrderFromAcc = async  (req, res, next) => {
    try{
      let accId = req.params.accId;
      let [orderId, _] = await OrderDetail.getAccId(accId);
      res.status(200).json({message:"Acc Id is:", orderId});
    } catch(error) {
      console.log(error);
      next(error);
    }
  }