const express = require("express");
const productControllers = require("../controllers/productControllers.js");
const router = express.Router();
const firebase = require("../config/firebaseConfig.js");
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { files: 10 }, // Giới hạn chỉ cho phép tải lên 3 file
});
const test = require("../controllers/productControllers.js");

let downloadUrl = "";

router
  .route("/")
  .get(productControllers.getAllProducts)
  .post(upload.single("image"), (req, res, next) => {
    if (!req.file) {
      return res.status(400).send("Error: No files found");
    }
    const blob = firebase.bucket.file(req.file.originalname);
    const blobWriter = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });
    blobWriter.on("error", (err) => {
      console.log(err);
    });
    blobWriter.on("finish", () => {
      blob
        .getSignedUrl({
          action: "read",
          expires: "03-03-2025",
        })
        .then((signedUrls) => {
          downloadUrl = signedUrls[0];
          console.log("URL: ", downloadUrl);
          console.log(test);
        })
        .catch((err) => {
          console.error("Error generating signed URL", err);
        });
      res.status(200).send(`File uploaded.`);
      productControllers.createNewProducts(req, res, next);
    });
    blobWriter.end(req.file.buffer);
  });

router
  .route("/:id")
  .get(productControllers.getProductById)
  .put(productControllers.updatedAProduct)
  .delete(productControllers.deleteProduct);

router.route("/search/:productName").get(productControllers.getProductByName);

module.exports = router;
