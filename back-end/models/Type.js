const db = require("../config/db");

class Type {
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
    INSERT INTO type (
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
    let sql = "SELECT * FROM type";
    return db.execute(sql);
  }
  static findTypeById(id) {
    let sql = `SELECT * FROM type WHERE id=${id}`;
    return db.execute(sql);
  }

  static deleteType(id) {
    let sql = `DELETE FROM type WHERE id=${id}`
    return db.execute(sql)
  }

  UpdatedAType(id) {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();
    let hh = d.getHours();
    let mi = d.getMinutes();
    let ss = d.getSeconds();

    let updatedDate = `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;

    let sql = `
    UPDATE type SET
      name = '${this.name}',
      description = '${this.description}', 
      status = '${this.status}',
      updated_at = '${updatedDate}'
    WHERE id = ${id}
    `;

    return db.execute(sql);
  }
}

module.exports = Type;
