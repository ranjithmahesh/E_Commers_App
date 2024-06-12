const express = require("express");

const verifyToken = require("../utiles/verifyToken.js");
const {
  createProduct,
  UpdateProduct,
  ProductDeatils,
  AllProductDeatils,
  DelletProductDeatils,
  AllProductDetails,
} = require("../controllers/product.controllers.js");

const routes = express.Router();

routes.post("/create", verifyToken, createProduct);

// //
routes.put("/update/:id", verifyToken, UpdateProduct);
routes.delete("/delete/:id", verifyToken, DelletProductDeatils);
routes.get("/product/:id", verifyToken, ProductDeatils);
routes.get("/all", verifyToken, AllProductDetails);

module.exports = routes;
