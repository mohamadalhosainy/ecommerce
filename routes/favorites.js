const express = require('express') ;
const router = express.Router() ;

const favoriteController = require('../controller/favorite_controller');

const auth = require ('../middleware/auth') ;

router.post('/:id', auth ,favoriteController.addFavorite);
router.get('/', auth ,favoriteController.getFavoriteProduct);

module.exports = router ;