const Type = require("../models/Type.js");

exports.getAllTypes = async (req, res, next) => {
  try {
    const [types, _] = await Type.findAll();
    res.status(200).json({ count: types.length, types });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getTypeById = async (req, res, next) => {
  try {
    let typeId = req.params.id;
    let [type, _] = await Type.findTypeById(typeId);
    res.status(200).json({ type: type[0] });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.createNewType = async (req, res, next) => {
  try {
    let { name, description } = req.body;
    let type = new Type(name, description);
    type = await type.save();
    res.status(201).json({
      message: "New Type add successfully!",
      data: type,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteType = async (req, res, next) => {
  try {
    let typeId = req.params.id;
    let [type, _] = await Type.deleteType(typeId);
    res.status(200).json({ message: "Delete Successfully!" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateAType = async (req, res, next) => {
  try {
    let typeId = req.params.id;
    let {
      name,
      description,
      status
    } = req.body;
    let type = new Type(
      name,
      description,
      status
    );
    type = await type.UpdatedAType(typeId);
    res.status(201).json({ message: "Update Successfully!", data: type });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
