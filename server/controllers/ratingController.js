const router = require("express").Router();
const { getMovieRating, addMovieRating } = require("../services/ratingService");

router.get("/:movieId/:userId", async (req, res) => {
  try {
    const data = await getMovieRating(req.params.movieId, req.params.userId);
    res.status(200).json(data);
  } catch (error) {
    return res.status(409).json({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await addMovieRating(req.body);
    res.status(200).json(data);
  } catch (error) {
    return res.status(409).json({ error });
  }
});

module.exports = router;
