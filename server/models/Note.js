const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  movieId: {
    type: String,
    required: true,
  },
  user: {
    username: {
      type: String,
      required: true,
      lowercase: true,
      minlength: 4,
    },
    userId: { type: mongoose.Types.ObjectId, required: true },
  },
  note: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Note", noteSchema);
