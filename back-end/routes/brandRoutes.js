const express = require('express');
const brandControllers = require("../controllers/brandControllers.js");
const router = express.Router();

router
  .route("/")
  .get(brandControllers.getAllTypes)

module.exports = router;