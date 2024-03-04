const express = require('express');
const typeControllers = require("../controllers/typeControllers.js");
const router = express.Router();

router
  .route("/")
  .get(typeControllers.getAllTypes)

module.exports = router;