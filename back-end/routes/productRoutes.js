const express = require('express');
const productControllers = require("../controllers/productControllers.js");
const router = express.Router();

router
  .route("/")
  .get(productControllers.getAllProducts)
  .post(productControllers.createNewProducts);
 
router
.route("/:id")
.get(productControllers.getProductById)
.put(productControllers.updatedAProduct)
.delete(productControllers.deleteProduct);

router
.route("/search/:productName")
.get(productControllers.getProductByName);

module.exports = router;