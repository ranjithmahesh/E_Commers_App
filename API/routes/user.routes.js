const express = require("express");
const {
  createUser,
  LoginUser,
  UpdateUser,
  UserDeatils,
} = require("../controllers/user.controllers.js");
const verifyToken = require("../utiles/verifyToken.js");

const routes = express.Router();

routes.post("/create", createUser);
routes.post("/login", LoginUser);

//
routes.put("/update", verifyToken, UpdateUser);
routes.get("/user", verifyToken, UserDeatils);

module.exports = routes;
