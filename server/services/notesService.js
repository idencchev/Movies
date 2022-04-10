const Note = require("../models/Note");

async function createNote(data) {
  const note = new Note({
    movieId: data.movieId,
    username: data.username,
    note: data.note,
  });
  return await note.save();
}

async function deleteNote(id) {
  return await Note.findByIdAndDelete({ _id: id });
}

async function findNotesByMovieId(movieId) {
  return await Note.find({ movieId: movieId });
}

module.exports = { createNote, deleteNote, findNotesByMovieId };
