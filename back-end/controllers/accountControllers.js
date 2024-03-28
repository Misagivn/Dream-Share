const Account = require("../models/Account.js");
const jwt = require("jsonwebtoken");
require('dotenv').config();


exports.checkAccount = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let account = new Account(email, password);
    account = await account.checkAccount(); 
    console.log(account[0][0].role_id)
    const accessToken = jwt.sign(
      {
        name: account[0][0].name,
        role: account[0][0].role_id
      },   
      process.env.ACCESS_TOKEN_SECRET)

    res.status(200).json({
      message: "Account does match",
      account,
      accessToken
    });
  } catch (error) {
    res.status(400).json({ error: "Email or Password incorrect" });
    console.log(error);
    next(error);
  }
};

exports.createAccount = async (req, res, next) => {
  try {
    let { email, password, name, phonenumber, gender, address } = req.body;
    let account = new Account(
      email,
      password,
      name,
      phonenumber,
      gender,
      address
    );
    account = await account.save();
    res.status(201).json({
      message: "Account has been created successfully!",
      data: account,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.checkExist = async (req, res, next) => {
  try {
    let accEmail = req.params.accEmail;
    let [accounts, _] = await Account.findAccountByEmail(accEmail);
    res.status(200).json({ count: accounts.length, accounts });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

  exports.addWallet = async (req, res, next) => {
    try {
      let accId = req.params.id;
      let addMoney = req.params.money;
      let account = new Account;
      account = await account.addToWallet(accId, addMoney);
      res.status(201).json({ message: "Add Successfully!"});
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  
  exports.updateWallet = async (req, res, next) => {
    try {
      let accId = req.params.id;
      let addMoney = req.params.money
      let {
        wallet
      } = req.body;
      let account = new Account(
        wallet
      );
      account = await account.updateToWallet(accId, addMoney);
      res.status(201).json({ message: "Update Successfully!"});
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

