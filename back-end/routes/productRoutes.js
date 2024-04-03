const express = require("express");
const productControllers = require("../controllers/productControllers.js");
const router = express.Router();
const firebase = require("../config/firebaseConfig.js");
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { files: 10 }, // Giới hạn chỉ cho phép tải lên 3 file
});
const jwt = require("jsonwebtoken");
require('dotenv').config();

function authenticationTokenUser(req, res, next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(token == null) return res.sendStatus(401)
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, account) => {
    if(err || account.role !== 3) return res.sendStatus(403)
    // console.log(role)
    req.account = account
    next()
  })
}

function authenticationTokenAdmin(req, res, next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(token == null) return res.sendStatus(401)
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, account) => {
    if(err || account.role === 3) return res.sendStatus(403)
    // console.log(role)
    req.account = account
    next()
  })
}

router
  .route("/activeProducts")
  .get(productControllers.getActiveProducts)

router
  .route("/")
  .get(authenticationTokenAdmin,productControllers.getAllProducts)
  .post(authenticationTokenAdmin ,upload.single("image"), (req, res, next) => {
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
          productControllers.createNewProducts(req, res, next, downloadUrl);
        })
        .catch((err) => {
          console.error("Error generating signed URL", err);
        });
      
      res.status(200).send(`File uploaded.`);
    });
    blobWriter.end(req.file.buffer);
  });

router
  .route("/:id")
  .get(productControllers.getProductById)
  .put(
  //   upload.single("image"), (req, res, next) => {
  //   if (!req.file) {
  //     return res.status(400).send("Error: No files found");
  //   }
  //   const blob = firebase.bucket.file(req.file.originalname);
  //   const blobWriter = blob.createWriteStream({
  //     metadata: {
  //       contentType: req.file.mimetype,
  //     },
  //   });
  //   blobWriter.on("error", (err) => {
  //     console.log(err);
  //   });
  //   blobWriter.on("finish", () => {
  //     blob
  //       .getSignedUrl({
  //         action: "read",
  //         expires: "03-03-2025",
  //       })
  //       .then((signedUrls) => {
  //         downloadUrl = signedUrls[0];
  //         console.log("URL: ", downloadUrl);
  //         productControllers.updatedAProduct(req, res, next, downloadUrl);
  //       })
  //       .catch((err) => {
  //         console.error("Error generating signed URL", err);
  //       });
      
  //     res.status(200).send(`File uploaded.`);
  //   });
  //   blobWriter.end(req.file.buffer);
  // }
  productControllers.updatedAProduct
  )
  .delete(authenticationTokenAdmin ,productControllers.deleteProduct);

router
  .route("/saleQuantity/:id/:quantity")
  .put(authenticationTokenUser, productControllers.updateQuantity);

// function exportDownloadUrl(downloadUrlString) {
//   module.exports.downloadUrlString = downloadUrlString;
//   console.log("Co la string k: " + downloadUrlString)
// }

module.exports = router;
