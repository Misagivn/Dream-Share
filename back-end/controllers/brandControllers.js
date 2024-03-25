const Brand = require("../models/Brand.js");

exports.getAllBrands = async (req, res, next) => {
  try {
    const [brands, _] = await Brand.findAll();
    res.status(200).json({ count: brands.length, brands });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.createNewBrand = async (req, res, next) => {
  try {
    let {
      name,
      description
    } = req.body;
    let brand = new Brand(
      name,
      description
    );
    brand = await brand.save();
    res.status(201).json({
      message: "New Brand add successfully!",
      data: brand,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteBrand = async (req, res, next) => {
  try {
    let brandId = req.params.id;
    let [brand, _] = await Brand.deleteBrand(brandId);
    res.status(200).json({ message: "Delete Successfully!" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getBrandById = async (req, res, next) => {
  try {
    let brandId = req.params.id;
    let [brand, _] = await Brand.findBrandById(brandId);

    res.status(200).json({ brand: brand[0] });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

exports.updateABrand = async (req, res, next) => {
  try {
    let brandId = req.params.id;
    let {
      name,
      description,
      status
    } = req.body;
    let brand = new Brand(
      name,
      description,
      status
    );
    brand = await brand.UpdatedABrand(brandId);
    res.status(201).json({ message: "Update Successfully!", data: brand });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
