const router = require('express').Router();
const authController = require('./controllers/authController');
const favoritesController = require('./controllers/favoritesController');

router.use('/auth', authController);
router.use('/favorites', favoritesController);

module.exports = router;