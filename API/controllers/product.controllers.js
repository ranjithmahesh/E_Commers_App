const product = require("../models/product");

module.exports.createProduct = async (req, res) => {
  console.log(";kljkhgf");
  const createProduct = {};

  createProduct.name = req.body.name;
  createProduct.price = req.body.price;
  createProduct.des = req.body.des;
  createProduct.brand = req.body.brand;
  createProduct.image = req.body.image;
  createProduct.user = req.user.id;

  const newProduct = product(createProduct);
  await newProduct.save();

  res.status(201).send({
    message: "new product created successfully",
    "new Product": newProduct,
  });
};

module.exports.UpdateProduct = async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      price: req.body.price,
      des: req.body.des,
      brand: req.body.brand,
      image: req.body.image,
    };

    const updatedProduct = await product.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).send({ message: "Product not found" });
    }

    res
      .status(200)
      .send({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
};

module.exports.ProductDeatils = async (req, res) => {
  const ProductDeatils = await product.findById(req.params.id);

  res.status(201).send({ message: "UserDeatil", ProductDeatils });
};
module.exports.DelletProductDeatils = async (req, res) => {
  await product.findByIdAndDelete(req.params.id);

  res.status(201).send({ message: "Product deleted " });
};

module.exports.AllProductDetails = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const allProductDetails = await product
      .find()
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .sort({ createdAt: -1 });

    const productCount = await product.countDocuments();

    res.status(200).send({
      message: "Product Detail",
      "Product count": productCount,
      allProductDetails,
    });
  } catch (error) {
    res.status(500).send({ message: "Error fetching product details", error });
  }
};
