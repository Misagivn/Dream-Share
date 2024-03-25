const db = require("../config/db");

class Category {
  constructor(
    name,
    description,
    status
  ) {
    this.name = name,
    this.description = description,
    this.status = status
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
    INSERT INTO category (
        name, 
        description, 
        status, 
        created_at
    ) VALUES (
        '${this.name}',
        '${this.description}',
        'Active',
        '${createdDate}'
    )
    `;
    return db.execute(sql);
  }
  static findAll() {
    let sql = "SELECT * FROM category";
    return db.execute(sql);
  }

  static deleteCategory(id) {
    let sql = `DELETE FROM category WHERE id=${id}`
    return db.execute(sql)
  }
  static findCategoryById(id) {
    let sql = `SELECT * FROM category WHERE id=${id}`;
    return db.execute(sql);
  }

  UpdatedACategory(id) {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();
    let hh = d.getHours();
    let mi = d.getMinutes();
    let ss = d.getSeconds();

    let updatedDate = `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;

    let sql = `
    UPDATE category SET
      name = '${this.name}',
      description = '${this.description}', 
      status = '${this.status}',
      updated_at = '${updatedDate}'
    WHERE id = ${id}
    `;

    return db.execute(sql);
  }
}

module.exports = Category;