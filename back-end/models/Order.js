const db = require("../config/db.js");

class Order {
  constructor(
    account_id,
    account_name,
    account_email,
    account_phone,
    shipping_address,
    created_at,
    payment_method,
    total_price,
    status
  ) {
    (this.account_id = account_id),
      (this.account_name = account_name),
      (this.account_email = account_email),
      (this.account_phone = account_phone),
      (this.shipping_address = shipping_address),
      (this.created_at = created_at),
      (this.payment_method = payment_method),
      (this.total_price = total_price),
      (this.status = status);
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
    INSERT INTO order1 (
        account_id, 
        account_name, 
        account_email, 
        account_phone,
        shipping_address,
        created_at,
        payment_method,
        total_price,
        status
    ) VALUES (
        '${this.account_id}',
        '${this.account_name}',
        '${this.account_email}',
        '${this.account_phone}',
        '${this.shipping_address}',
        '${createdDate}',
        '${this.payment_method}',
        '${this.total_price}',
        '${this.status}'
        )
    `;
    return db.execute(sql);
  }

  static findAll() {
    let sql = "SELECT * FROM order1";
    return db.execute(sql);
  }

  static findOrderById(id) {
    let sql = `SELECT * FROM order1 WHERE id=${id}`;
    return db.execute(sql);
  }

  static deleteOrder(id) {
    let sql1 = `DELETE FROM order_detail WHERE order_id=${id}`
    let sql2 = `DELETE FROM order1 WHERE id=${id}`
    return db.execute(sql1), db.execute(sql2);
  }

  UpdatedAnOrder(id) {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();

    let updatedDate = `${yyyy}-${mm}-${dd}`;

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
}
module.exports = Order;
