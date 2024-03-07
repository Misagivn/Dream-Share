const db = require("../config/db");

class Staff {
  static findAll() {
    let sql = "SELECT * FROM account WHERE role_id = 2";
    return db.execute(sql);
  }
}

module.exports = Staff;