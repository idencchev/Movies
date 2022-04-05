const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../config/config");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    minlength: 4,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  next();
});

module.exports = mongoose.model("User", userSchema);
