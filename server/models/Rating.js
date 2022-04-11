const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  movieId: {
    type: String,
    required: true,
  },
  userId: { type: mongoose.Types.ObjectId, required: true },
  rating: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Rating", ratingSchema);
