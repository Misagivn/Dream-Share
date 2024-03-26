const Product = require("../models/product");

exports.getAllProducts = async (req, res, next) => {
  try {
    const [products, _] = await Product.findAll();
    res.status(200).json({ count: products.length, products });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.createNewProducts = async (req, res, next, downloadUrlString) => {
  try {
    let {
      type_id,
      brand_id,
      cate_id,
      code,
      name,
      description,
      highlight,
      quantity,
      size,
      color,
      status,
      price,
      image
    } = req.body;
    let product = new Product(
      type_id,
      brand_id,
      cate_id,
      code,
      name,
      description,
      highlight,
      quantity,
      size,
      color,
      status,
      price,
      image = downloadUrlString
    );
    product = await product.save();
    res.status(201).json({
      message: "Product has been created successfully!",
      data: product,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    let productId = req.params.id;
    let [product, _] = await Product.findProductById(productId);
    res.status(200).json({ product: product[0] });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updatedAProduct = async (req, res, next) => {
  try {
    let productId = req.params.id;
    let {
      type_id,
      brand_id,
      cate_id,
      code,
      name,
      description,
      highlight,
      quantity,
      size,
      color,
      status,
      price,
      // image
    } = req.body;
    let product = new Product(
      type_id,
      brand_id,
      cate_id,
      code,
      name,
      description,
      highlight,
      quantity,
      size,
      color,
      status,
      price,
      // image = downloadUrlString
    );
    product = await product.UpdatedAProduct(productId);
    res.status(201).json({ message: "Update Successfully!", data: product });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    let productId = req.params.id;
    let [product, _] = await Product.deleteProduct(productId);
    res.status(200).json({ message: "Delete Successfully!" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getProductByName = async (req, res, next) => {
  try {
    let productName = req.params.productName;
    let [products, _] = await Product.findProductByName(productName);
    res.status(200).json({ count: products.length, products });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateQuantity = async (req, res, next) => {
  try {
    let productId = req.params.id;
    let new_quantity = req.params.quantity
    let {
      quantity
    } = req.body;
    let product = new Product(
      quantity
    );
    product = await product.UpdateQuantity(productId, new_quantity);
    res.status(201).json({ message: "Update Successfully!"});
  } catch (error) {
    console.log(error);
    next(error);
  }
};