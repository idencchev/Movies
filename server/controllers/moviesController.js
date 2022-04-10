const router = require("express").Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    // get all movies
    const { data } = await axios.get("https://api.tvmaze.com/shows");
    res.status(200).json(data);
  } catch (error) {
    return res.status(409).json({ error });
  }
});

router.get("/search", async (req, res) => {
    // search by name and single search by name
  try {
    if (req.query["movies"]) {
      const { data } = await axios.get(
        `https://api.tvmaze.com/search/shows?q=${req.query.movies}`
      );
      return res.status(200).json(data);
    } else if (req.query["title"]) {
      const { data } = await axios.get(
        `https://api.tvmaze.com/singlesearch/shows?q=${req.query.title}`
      );
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(409).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://api.tvmaze.com/shows/${req.params.id}`
    );
    return res.status(200).json(data);
  } catch (error) {
    return res.status(409).json({ error });
  }
});

module.exports = router;
