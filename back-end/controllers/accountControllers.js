const Account = require("../models/Account.js")

exports.checkAccount= async (req, res, next) => {
    try {
      let {
        email,
        password
      } = req.body;
      let account = new Account(
        email,
        password
      );
      account = await account.checkAccount();
      
      res.status(201).json({
        message: "Account does match",
        data: account,
      })
    } catch (error) {
      console.log(error);
      next(error);
    }
  };