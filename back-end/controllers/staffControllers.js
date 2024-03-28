const Staff = require("../models/Staff.js");
const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.getAllStaffs = async (req, res, next) => {
  try {
    const [staffs, _] = await Staff.findAll();
    res.status(200).json({ count: staffs.length, staffs });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getStaffLogin = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let staff = new Staff (email, password);
    staff = await staff.checkStaffLogin(); 
    console.log("create new access:",staff[0][0].role_id)
    const accessToken = jwt.sign(
      {
        name: staff[0][0].name,
        role: staff[0][0].role_id
      },   
      process.env.ACCESS_TOKEN_SECRET)

    res.status(200).json({
      message: "Account does match",
      staff,
      accessToken
    });
  } catch (error) {
    res.status(400).json({ error: "Email or Password incorrect" });
    console.log(error);
    next(error);
  }
};

exports.getStaffById = async (req, res, next) => {
  try {
    let staffId = req.params.id;
    let [staff, _] = await Staff.findStaffById(staffId);
    res.status(200).json({ staff: staff[0] });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteStaff = async (req, res, next) => {
  try {
    let staffId = req.params.id;
    let [staff, _] = await Staff.deleteStaff(staffId);
    res.status(200).json({ message: "Delete Successfully!" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.createNewStaffs = async (req, res, next) => {
  try {
    let {
      email,
      password,
      name,
      phonenumber,
      gender,
      status,
      address
    } = req.body;
    let staff = new Staff(
      email,
      password,
      name,
      phonenumber,
      gender,
      status,
      address
    );
    staff = await staff.save();
    res.status(201).json({
      message: "Staff has been created successfully!",
      data: staff,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.updateStaff = async (req, res, next) => {
  try {
    let staffId = req.params.id;
    let {
      email,
      password,
      name,
      phonenumber,
      gender,
      status,
      address
    } = req.body;
    let staff = new Staff(
      email,
      password,
      name,
      phonenumber,
      gender,
      status,
      address
    );
    staff = await staff.UpdatedStaff(staffId);
    res.status(201).json({ message: "Update Successfully!", data: staff });
  } catch (error) {
    console.log(error);
    next(error);
  }
};