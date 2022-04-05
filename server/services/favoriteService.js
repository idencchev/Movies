const User = require("../models/User");

async function getFavoriteMovies({ id }) {
  return await User.findById({ _id: id });
}

async function createFavoriteMovie({ id, movieId }) {
  const { favoriteMovies } = await User.findById({ _id: id });

  if (favoriteMovies.includes(movieId)) {
    throw "This movie is already in the favorites list.";
  }

  return await User.findOneAndUpdate(
    { _id: id },
    { $push: { favoriteMovies: movieId } },
    { new: true }
  );
}

async function removeFavoriteMovie({ id, movieId }) {
  return await User.findOneAndUpdate(
    { _id: id },
    { $pull: { favoriteMovies: movieId } },
    { new: true }
  );
}

module.exports = {
  createFavoriteMovie,
  removeFavoriteMovie,
  getFavoriteMovies,
};
