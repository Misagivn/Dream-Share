const mySQL = require("mysql2");
require("dotenv").config();

const pool = mySQL.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "dream_share",
  //   host: process.env.MYSQL_HOST,
  //   user: process.env.MYSQL_USERNAME,
  //   password: process.env.MYSQL_PASSWORD,
  //   database: process.env.MYSQL_DATABASE,
});

//Test connection here
let sql = "SELECT * FROM role";

pool.execute(sql, function (err, res) {
  if (err) throw err;
  console.log(res);
});

module.exports = pool.promise();
