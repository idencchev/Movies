const router = require('express').Router();
const authController = require('./controllers/authController');
const favoritesController = require('./controllers/favoritesController');
const moviesController = require('./controllers/moviesController');
const notesController = require('./controllers/notesController');

router.use('/auth', authController);
router.use('/favorites', favoritesController);
router.use('/movies', moviesController);
router.use('/notes', notesController)

module.exports = router;