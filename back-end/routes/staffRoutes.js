const express = require('express');
const staffControllers = require("../controllers/staffControllers.js");
const router = express.Router();

router
  .route("/")
  .get(staffControllers.getAllStaffs)
  .post(staffControllers.createNewStaffs)

router
  .route("/:id")
  .get(staffControllers.getStaffById)
  .delete(staffControllers.deleteStaff)
  .put(staffControllers.updateStaff);
module.exports = router;