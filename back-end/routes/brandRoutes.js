const express = require('express');
const brandControllers = require("../controllers/brandControllers.js");
const router = express.Router();

router
  .route("/")
  .get(brandControllers.getAllBrands)
  .post(brandControllers.createNewBrand)

router
  .route("/:id")
  .delete(brandControllers.deleteBrand)
  .get(brandControllers.getBrandById)
  .put(brandControllers.updateABrand)
module.exports = router;