const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const AuthRouter = require("./routes/user.routes.js");
const ProductRouter = require("./routes/product.routes.js");

dotenv.config();
const PORT = process.env.port || 7000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("db connected"));

app.use("/api/auth", AuthRouter);
app.use("/api/task", ProductRouter);
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
