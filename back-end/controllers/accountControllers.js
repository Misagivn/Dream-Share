const Account = require("../models/Account.js");

exports.checkAccount = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let account = new Account(email, password);
    account = await account.checkAccount();

    res.status(201).json({
      message: "Account does match",
      data: account,
    });
  } catch (error) {
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
