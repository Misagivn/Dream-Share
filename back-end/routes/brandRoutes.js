const express = require('express');
const brandControllers = require("../controllers/brandControllers.js");
const router = express.Router();

router
  .route("/")
  .get(brandControllers.getAllBrands)

module.exports = router;