const express = require('express');
const categoryControllers = require("../controllers/categoryControllers.js");
const router = express.Router();

router
  .route("/")
  .get(categoryControllers.getAllCategories)
  .post(categoryControllers.createNewCategory)

router
  .route("/:id")
  .delete(categoryControllers.deleteCategory)
  .get(categoryControllers.getCategoryById)
  .put(categoryControllers.updateACategory);

module.exports = router;