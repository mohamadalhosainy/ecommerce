const express = require('express') ;
const router = express.Router() ;
const multer = require('multer');
const upload = multer({ dest: 'public/images/' });

const productController = require('../controller/product_controller');

const auth = require ('../middleware/auth') ;
const authAdmin = require ('../middleware/admin') ;

router.post('/:id', upload.single('photo') ,productController.addProduct);
router.get('/:id', productController.getProductByCategory);
router.get('/', productController.getAllProduct);
router.get('/byid/:id', productController.getProductByID);
router.delete('/:id', productController.deleteProduct);
router.put('/:id', productController.updateProduct);

module.exports = router ;