const config = {
  db: {
    /*don't expose password, this is for demo only */
    host: "localhost:3306",
    user: "sa",
    password: "123456",
    database: "nodejs_api",
    connectTimeout: 60000,
  },
  listPerPage: 10,
};
module.exports = config;
