const User = require("../models/User");

async function getFavoriteMovies({ id }) {
  return await User.findById({ _id: id });
}

async function createFavoriteMovie(data) {
  console.log(data);
  const { favoriteMovies } = await User.findById({ _id: data.id });
  if (favoriteMovies.includes(data.movieId)) {
    throw "This movie is already in the favorites list.";
  }

  return await User.findOneAndUpdate(
    { _id: data.id },
    { $push: { favoriteMovies: data.movieId } },
    { new: true }
  );
}

async function removeFavoriteMovie(data) {
  return await User.findOneAndUpdate(
    { _id: data.id },
    { $pull: { favoriteMovies: data.movieId } },
    { new: true }
  );
}

module.exports = {
  createFavoriteMovie,
  removeFavoriteMovie,
  getFavoriteMovies,
};
