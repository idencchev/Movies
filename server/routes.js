const router = require('express').Router();
const authController = require('./controllers/authController');
const favoritesController = require('./controllers/favoritesController');
const moviesController = require('./controllers/moviesController');

router.use('/auth', authController);
router.use('/favorites', favoritesController);
router.use('/movies', moviesController);

module.exports = router;