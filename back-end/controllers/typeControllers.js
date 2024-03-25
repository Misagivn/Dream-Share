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
