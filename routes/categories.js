const express = require('express') ;
const router = express.Router() ;

const categoriesController = require('../controller/category_controller');

const authAdmin = require ('../middleware/admin') ;

router.post('/' ,categoriesController.makeCategory);
router.get('/', categoriesController.getCategory);
router.delete('/:id',authAdmin, categoriesController.deleteCategory);
router.put('/:id',authAdmin, categoriesController.updateCategory);

module.exports = router ;