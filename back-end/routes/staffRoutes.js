const express = require('express');
const staffControllers = require("../controllers/staffControllers.js");
const router = express.Router();

router
  .route("/")
  .get(staffControllers.getAllStaffs)

module.exports = router;