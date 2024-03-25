const db = require("../config/db");

class Type {
  static findAll() {
    let sql = "SELECT * FROM type";
    return db.execute(sql);
  }
  static findTypeById(id) {
    let sql = `SELECT * FROM type WHERE id=${id}`;
    return db.execute(sql);
  }
}

module.exports = Type;
