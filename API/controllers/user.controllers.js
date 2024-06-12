const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/user");

module.exports.createUser = async (req, res) => {
  console.log(";kljkhgf");
  const createUser = {};

  createUser.name = req.body.name;
  createUser.email = req.body.email;
  createUser.password = bcryptjs.hashSync(req.body.password, 10);

  const existinguser = await user.findOne({ email: createUser.email });

  if (existinguser) {
    return res
      .status(400)
      .send({ message: "email allready exist, Please login" });
  }

  const newUser = user(createUser);
  await newUser.save();

  const createdUser = newUser.toObject();
  delete createdUser.password;
  res.status(201).send({ message: "User created successfully", createdUser });
};
module.exports.LoginUser = async (req, res) => {
  console.log(";kljkhgf");
  const loginUser = {};

  loginUser.email = req.body.email;
  loginUser.password = req.body.password;

  const existinguser = await user.findOne({ email: loginUser.email });

  if (!existinguser) {
    return res.status(400).send({ message: "User does not exist" });
  }

  const comparePasswors = bcryptjs.compareSync(
    loginUser.password,
    existinguser.password
  );

  if (!comparePasswors)
    return res.status(400).send({ message: "password does not match" });

  const UserDeatils = existinguser.toObject();

  delete UserDeatils.password;

  const token = jwt.sign({ id: UserDeatils._id }, process.env.JWT_SECRET_KEY);

  res
    .status(201)
    .send({ message: "User LogedIn successfully", UserDeatils, token });
};

module.exports.UpdateUser = async (req, res) => {
  const UpdateUser = {};

  UpdateUser.name = req.body.name;

  const existinguser = await user.findByIdAndUpdate(
    req.user.id,
    {
      name: UpdateUser.name,
    },
    { new: true }
  );

  const UpdatedUser = existinguser.toObject();
  delete UpdatedUser.password;
  res.status(201).send({ message: "Updated User successfully", UpdatedUser });
};
module.exports.UserDeatils = async (req, res) => {
  const UserDeatils = await user.findById(req.user.id);

  const UserDeatil = UserDeatils.toObject();
  delete UserDeatil.password;
  res.status(201).send({ message: "UserDeatil", UserDeatil });
};

