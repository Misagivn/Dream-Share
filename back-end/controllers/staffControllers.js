const Staff = require("../models/Staff.js")

exports.getAllStaffs = async (req, res, next) => {
    try {
      const [staffs, _] = await Staff.findAll();
      res.status(200).json({ count: staffs.length, staffs });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };