const express = require('express') ;
const router = express.Router() ;

const userController = require('../controller/user_controller');

const auth = require ('../middleware/auth') ;
const admin = require ('../middleware/admin') ;

router.post('/register', userController.registercontroller);
router.post('/login', userController.logincontroller);
router.post('/logout', userController.logoutcontroller);

module.exports = router;