exports.getAllProducts = async (req, res, next)  => {
    res.send("Get all products routes");
}

exports.createNewProducts = async (req, res, next) => {
    res.send("Create new products routes")
}

exports.getProductById = async (req, res, next) => {
    res.send("Get products by ID")
}
