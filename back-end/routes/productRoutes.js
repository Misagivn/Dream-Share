const express = require("express");
const productControllers = require("../controllers/productControllers.js");
const router = express.Router();
const firebase = require("../config/firebaseConfig.js");
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { files: 10 }, // Giới hạn chỉ cho phép tải lên 3 file
});
const test = require("../controllers/productControllers.js")

let downloadUrl ="";

router
  .route("/")
  .get(productControllers.getAllProducts)
  .post(productControllers.createNewProducts);

router
  .route("/:id")
  .get(productControllers.getProductById)
  .put(productControllers.updatedAProduct)
  .delete(productControllers.deleteProduct);

router.route("/search/:productName").get(productControllers.getProductByName);

module.exports = router;
