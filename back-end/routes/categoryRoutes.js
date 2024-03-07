const express = require('express');
const categoryControllers = require("../controllers/categoryControllers.js");
const router = express.Router();

router
  .route("/")
  .get(categoryControllers.getAllCategories)

module.exports = router;