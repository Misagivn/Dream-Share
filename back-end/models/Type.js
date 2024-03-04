const db = require("../config/db");

class Type {
  static findAll() {
    let sql = "SELECT * FROM type";
    return db.execute(sql);
  }
}

module.exports = Type;
