require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./user.model");

async function createUser(req, res) {
  const { email, password } = req.body;

  try {
    const newUser = await User.create({ email, password });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ error });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const passwordCheck = await bcrypt.compare(password, user.password);

  if (user && passwordCheck) {
    const token = jwt.sign({ id: user._id, email }, process.env.SECRET_TOKEN_KEY, {
      expiresIn: "2h",
    });
    res.status(200).json({ token });
  } else {
    res.status(401).send("Invalid Credentials");
  }
}

module.exports = {
  createUser,
  loginUser,
};
