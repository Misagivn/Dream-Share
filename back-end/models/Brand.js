const db = require("../config/db");

class Brand {
  static findAll() {
    let sql = "SELECT * FROM brand";
    return db.execute(sql);
  }
}

module.exports = Brand;