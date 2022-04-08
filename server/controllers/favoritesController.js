const {
  createFavoriteMovie,
  removeFavoriteMovie,
  getFavoriteMovies,
} = require("../services/favoriteService");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const { favoriteMovies } = await getFavoriteMovies(req.body);
    res.status(200).json({ favoriteMovies });
  } catch (error) {
    return res.status(409).json({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { _id, favoriteMovies } = await createFavoriteMovie(req.body);
    res.status(201).json({ _id, favoriteMovies });
  } catch (error) {
    return res.status(409).json({ error });
  }
});

router.put("/", async (req, res) => {
  try {
    const data = await removeFavoriteMovie(req.body);
    res.status(201).json(data);
  } catch (error) {
    return res.status(409).json({ error });
  }
});

module.exports = router;
