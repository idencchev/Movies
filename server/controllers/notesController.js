const { isAuthenticated } = require("../middlewares/auth");
const {
  createNote,
  deleteNote,
  findNotesByMovieId,
} = require("../services/notesService.js");

const router = require("express").Router();

router.get("/:movieId", isAuthenticated, async (req, res) => {
  try {
    const data = await findNotesByMovieId(req.params.movieId);
    res.status(200).json(data);
  } catch (error) {
    return res.status(409).json({ error });
  }
});

router.post("/", isAuthenticated, async (req, res) => {
  try {
    const data = await createNote(req.body);
    res.status(201).json(data);
  } catch (error) {
    return res.status(409).json({ error });
  }
});

router.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    await deleteNote(req.params.id);
    res.status(200).json("Deleted successfully.");
  } catch (error) {
    return res.status(409).json({ error });
  }
});

module.exports = router;
