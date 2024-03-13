const express = require('express');
const accountControllers = require("../controllers/accountControllers.js");
const router = express.Router();

router
  .route("/")
  .post(accountControllers.checkAccount)

module.exports = router;