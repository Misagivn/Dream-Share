const express = require('express');
const typeControllers = require("../controllers/typeControllers.js");
const router = express.Router();

router
  .route("/")
  .get(typeControllers.getAllTypes)
  .post(typeControllers.createNewType)

router
  .route("/:id")
  .get(typeControllers.getTypeById)
  .delete(typeControllers.deleteType)
  .put(typeControllers.updateAType);
module.exports = router;