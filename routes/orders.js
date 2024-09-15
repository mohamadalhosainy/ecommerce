const express = require('express') ;
const router = express.Router() ;

const ordersController = require('../controller/order_controller');

const auth = require ('../middleware/auth') ;

router.post('/', auth ,ordersController.makeOrder);

module.exports = router ;