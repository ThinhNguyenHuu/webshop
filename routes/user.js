const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/login', userController.getLogin);
//router.post('/login', userController.postLogin);

router.get('/register', userController.getRegister);
router.post('/register', userController.postRegister);

router.get('/info', userController.info);
router.post('/info/change/:_id', userController.change);

module.exports = router;