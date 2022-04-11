const Rating = require("../models/Rating");

async function getMovieRating(movieId, userId) {
  const rating = await Rating.find({
    movieId: movieId,
    userId: userId,
  });
  return rating;
}

async function addMovieRating(data) {
  const isRated = await Rating.find({
    movieId: data.movieId,
    userId: data.userId,
  });

  if (!isRated.length) {
    const rating = new Rating(data);
    return await rating.save();
  }

  return await Rating.findOneAndUpdate(
    { movieId: data.movieId, userId: data.userId },
    { rating: data.rating },
    { new: true }
  );
}

module.exports = {
  getMovieRating,
  addMovieRating,
};
