const db = require("../config/db");

class Account {
  constructor(
    email,
    password
  ){
    this.email = email
    this.password = password
  }
  checkAccount() {
    let sql = `SELECT * FROM account WHERE email='${this.email}' AND password='${this.password}'`
    return db.execute(sql);
  }
}

module.exports = Account;
