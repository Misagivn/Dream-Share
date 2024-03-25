const Category = require("../models/Category.js");

exports.getAllCategories = async (req, res, next) => {
  try {
    const [categories, _] = await Category.findAll();
    res.status(200).json({ count: categories.length, categories });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.createNewCategory = async (req, res, next) => {
  try {
    let { name, description } = req.body;
    let category = new Category(name, description);
    category = await category.save();
    res.status(201).json({
      message: "New Category add successfully!",
      data: category,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    let categoryId = req.params.id;
    let [category, _] = await Category.deleteCategory(categoryId);
    res.status(200).json({ message: "Delete Successfully!" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    let categoryId = req.params.id;
    let [category, _] = await Category.findCategoryById(categoryId);
    res.status(200).json({ category: category[0] });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateACategory = async (req, res, next) => {
  try {
    let categoryId = req.params.id;
    let {
      name,
      description,
      status
    } = req.body;
    let category = new Category(
      name,
      description,
      status
    );
    category = await category.UpdatedACategory(categoryId);
    res.status(201).json({ message: "Update Successfully!", data: category });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
