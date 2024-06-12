const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    des: { type: String, require: true },
    brand: { type: String, require: true },
    image: { type: String, require: true },
    price: { type: Number, require: true },
    user: { type: mongoose.Schema.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", ProductSchema);
