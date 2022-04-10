const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  movieId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    lowercase: true,
    minlength: 4,
  },
  note: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Note", noteSchema);
