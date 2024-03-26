const express = require('express');
const accountControllers = require("../controllers/accountControllers.js");
const router = express.Router();

router
  .route("/")
  .post(accountControllers.checkAccount)

router
  .route("/create") 
  .post(accountControllers.createAccount)

router
  .route("/:accEmail")
  .get(accountControllers.checkExist)

router
  .route("/addWallet/:id/:money")
  .put(accountControllers.addWallet)

router
  .route("/updateWallet/:id/:money")
  .put(accountControllers.updateWallet)

module.exports = router;