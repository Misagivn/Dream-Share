const db = require("../config/db");

class Account {
  constructor(email, password, name, phonenumber, gender, address) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.phonenumber = phonenumber;
    this.gender = gender;
    this.address = address;
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
    INSERT INTO account (
      role_id,
      email,
      password,
      name,
      phonenumber,
      gender,
      status,
      address,
      created_at
    ) VALUES (
        '1',
        '${this.email}',
        '${this.password}',
        '${this.name}',
        '${this.phonenumber}',
        '${this.gender}',
        'Active',
        '${this.address}',
        '${createdDate}'
    )
    `;
    return db.execute(sql);
  }
  checkAccount() {
    let sql = `SELECT * FROM account WHERE email='${this.email}' AND password='${this.password}'`;
    return db.execute(sql);
  }

  static findAccountByEmail(accEmail) {
    let sql = `SELECT * FROM account WHERE email = '${accEmail}'`;
    return db.execute(sql);
  }

  addToWallet(id, money) {
    let sql = `
    UPDATE account SET wallet = wallet + ${money} WHERE id = ${id}
    `;
    return db.execute(sql);
  }
  updateToWallet(id, money) {
    let sql = `
    UPDATE account SET wallet = wallet - ${money} WHERE id = ${id}
    `;
    return db.execute(sql);
  }
}

module.exports = Account;
