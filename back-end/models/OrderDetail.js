const db = require("../config/db.js");

class OrderDetail {
  constructor(
    order_Id,
    product_id,
    price,
    quantity
  ) {
    (this.order_Id = order_Id),
    (this.product_id = product_id),
    (this.price = price),
    (this.quantity = quantity)
  }

  save() {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();
    let hh = d.getHours();
    let mi = d.getMinutes();
    let ss = d.getSeconds();

    let createdDate = `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;

    let sql = `
    INSERT INTO order_detail (
        order_id,
        product_id,
        quantity,
        price
    ) VALUES (
        '${this.order_Id}',
        '${this.product_id}',
        '${this.quantity}',
        '${this.price}'
        )
    `;
    return db.execute(sql);
  }


  static findOrderDetailById(id) {
    let sql = `SELECT * FROM order_detail WHERE order_id=${id}`;
    return db.execute(sql);
  }

  static deleteOrder(id) {
    let sql = `DELETE  FROM order_detail WHERE order_id=${id}`;
    return db.execute(sql);
  }

  UpdatedAnOrder(id) {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();
    let hh = d.getHours();
    let mi = d.getMinutes();
    let ss = d.getSeconds();

    let updatedDate = `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;

    let sql = `
    UPDATE order1 (
      account_id, 
      account_name, 
      account_email, 
      account_phone,
      shipping_address,
      created_at,
      payment_method,
      total_price,
      status
    ) SET (
      '${this.account_id}',
      '${this.account_name}',
      '${this.account_email}',
      '${this.account_phone}',
      '${this.shipping_address}',
      '${updatedDate}',
      '${this.payment_method}',
      '${this.total_price}',
      '${this.status}'
    ) WHERE id = ${id}
    `;

    return db.execute(sql);
  }
  static getAccId(id) {
    let sql = `SELECT id FROM order1 WHERE account_id=${id} ORDER BY created_at DESC LIMIT 1`;
    return db.execute(sql);
  }
}
module.exports = OrderDetail;
