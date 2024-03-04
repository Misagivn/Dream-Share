const Brand = require("../models/Brand.js")

exports.getAllTypes = async (req, res, next) => {
    try {
      const [brands, _] = await Brand.findAll();
      res.status(200).json({ count: brands.length, brands });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };