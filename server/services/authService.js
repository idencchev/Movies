const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const { JWT_SECRET } = require("../config/config");

async function registerUser(data) {
  const checkUsername = await User.findOne({ username: data.username });

  if (checkUsername) {
    throw "This username is already taken!";
  }

  if (data.password != data.rePass) {
    throw "Passwords are not same!";
  }

  const user = new User({
    username: data.username.toLowerCase().trim(),
    password: data.password.trim(),
  });

  const { username, _id } = await user.save();
  return { username, _id };
}

async function loginUser(data) {
  const { _id, username, password } =
    (await User.findOne({ username: data.username.toLowerCase() })) || {};

  if (username == undefined) {
    throw "This username does not exist!";
  }

  const match = await bcrypt.compare(data.password, password);

  if (!match) {
    throw "Wrong password!";
  }

  const token = jwt.sign({ id: _id, username: username }, JWT_SECRET, {
    expiresIn: "2d",
  });

  return {
    _id: _id,
    username: username,
    token: token,
  };
}

module.exports = {
  registerUser,
  loginUser,
};