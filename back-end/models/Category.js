const db = require("../config/db");

class Category {
  static findAll() {
    let sql = "SELECT * FROM category";
    return db.execute(sql);
  }
}

module.exports = Category;