const Category = require("../models/Category.js")

exports.getAllCategories= async (req, res, next) => {
    try {
      const [categories, _] = await Category.findAll();
      res.status(200).json({ count: categories.length, categories });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };