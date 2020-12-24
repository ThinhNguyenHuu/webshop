const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('../passport');


router.get('/login', userController.getLogin);
router.post('/login', passport.authenticate('local',
                        { successRedirect: '/',
                        failureRedirect: '/user/login',
                        failureFlash: true }));

router.get('/register', userController.getRegister);
router.post('/register', userController.postRegister);

router.get('/logout', userController.logout);

router.get('/info', userController.info);

router.get('/info/updateinfo', userController.getUpdateInfo);
router.post('/info/updateinfo', userController.postUpdateInfo);


router.get('/info/updatepassword', userController.getUpdatePassword);
router.post('/info/updatepassword', userController.postUpdatePassword);

module.exports = router;