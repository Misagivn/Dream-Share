const db = require("../config/db");

class Staff {
  constructor(
    email,
    password,
    name,
    phonenumber,
    gender,
    status,
    address
  ) {
    this.email = email,
    this.password = password,
    this.name = name,
    this.phonenumber = phonenumber,
    this.gender = gender,
    this.status = status,
    this.address = address
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
        '2',
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
  UpdatedStaff(id) {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();
    let hh = d.getHours();
    let mi = d.getMinutes();
    let ss = d.getSeconds();

    let updatedDate = `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;

    let sql = `
    UPDATE account SET 
      email = '${this.email}',
      password = '${this.password}',
      name = '${this.name}',
      phonenumber = '${this.phonenumber}',
      gender = '${this.gender}',
      status = '${this.status}',
      address = '${this.address}',
      updated_at ='${updatedDate}'
    WHERE id = ${id}
    `;

    return db.execute(sql);
  }
  static findAll() {
    let sql = "SELECT * FROM account WHERE role_id = 2";
    return db.execute(sql);
  }

  static findStaffById(id){
    let sql = `SELECT * FROM account WHERE id=${id}`;
    return db.execute(sql);
  }

  static deleteStaff(id) {
    let sql = `DELETE FROM account WHERE id = ${id}`;
    return db.execute(sql);
  }
}

module.exports = Staff;