const db = require("../config/db");

class Product {
  constructor(
    type_id,
    brand_id,
    cate_id,
    code,
    name,
    description,
    highlight,
    quantity,
    size,
    color,
    status,
    price,
    image
  ) {
    this.type_id = type_id;
    this.brand_id = brand_id;
    this.cate_id = cate_id;
    this.code = code;
    this.name = name;
    this.description = description;
    this.highlight = highlight;
    this.quantity = quantity;
    this.size = size;
    this.color = color;
    this.status = status;
    this.price = price;
    this.image = image;
  }
  save() {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();

    let createdDate = `${yyyy}-${mm}-${dd}`;

    let sql = `
    INSERT INTO product (
        type_id, 
        brand_id, 
        cate_id, 
        code, 
        name, 
        description, 
        highlight, 
        quantity, 
        size, 
        color, 
        status,
        created_at,
        price,
        image
    ) VALUES (
        '${this.type_id}',
        '${this.brand_id}',
        '${this.cate_id}',
        '${this.code}',
        '${this.name}',
        '${this.description}',
        '${this.highlight}',
        '${this.quantity}',
        '${this.size}',
        '${this.color}',
        '${this.status}',
        '${createdDate}',
        '${this.price}',
        '${this.image}'
    )
    `;
    return db.execute(sql);
  }

  static findAll() {
    let sql = "SELECT * FROM product";
    return db.execute(sql);
  }

  static findProductById(id) {
    let sql = `SELECT * FROM product WHERE id=${id}`;
    return db.execute(sql);
  }

  UpdatedAProduct(id) {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();

    let updatedDate = `${yyyy}-${mm}-${dd}`;

    let sql = `
    UPDATE product (
        type_id, 
        brand_id, 
        cate_id, 
        code, 
        name, 
        description, 
        highlight, 
        quantity, 
        size, 
        color, 
        status,
        updated_at,
        image
    ) SET (
        '${this.type_id}',
        '${this.brand_id}',
        '${this.cate_id}',
        '${this.code}',
        '${this.name}',
        '${this.description}',
        '${this.highlight}',
        '${this.quantity}',
        '${this.size}',
        '${this.color}',
        '${this.status}',
        '${updatedDate}'
    ) WHERE id = ${id}
    `;

    return db.execute(sql);
  }

  static deleteProduct(id) {
    let sql = `DELETE FROM product WHERE id = ${id}`;
    return db.execute(sql);
  }

  static findProductByName(productName) {
    let sql = `SELECT * FROM product WHERE name LIKE '%${productName}%'`;
    return db.execute(sql);
  }
}

module.exports = Product;
