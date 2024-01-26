const db = require("./db");
const helper = require("../helper");
const congif = require("../config");
const config = require("../config");

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query("SELECT id, name, color, price FROM products LIMIT ${offset},${config.listPerPage}");
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

module.exports = {
  getMultiple,
};
