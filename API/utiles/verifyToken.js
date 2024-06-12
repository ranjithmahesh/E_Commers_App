const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const headerAuth = req.header("Authorization");

  if (!headerAuth)
    return res
      .status(401)
      .send({ message: "Access denied. No token provided." });
  const token = headerAuth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send({ message: "Invalid token." });
  }
};

module.exports = verifyToken;
