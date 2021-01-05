const { request } = require('express');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('../passport');


router.get('/login', userController.getLogin);
router.post('/login', passport.authenticate('local',
                        {
                        failureRedirect: '/user/login',
                        failureFlash: true }), (req, res) => 
                        {
                            if (req.body.referer &&  (req.body.referer).indexOf("/user/login") < 0 &&
                            (req.body.referer).indexOf("/user/register") < 0 &&  (req.body.referer).indexOf("/user/forgetpassword") < 0)
                            {
                                res.redirect(req.body.referer);
                            }
                            else 
                            {
                                res.redirect("/");
                            }
                        });

router.get('/login/google',
  passport.authenticate('google', { scope: ['email','profile'] }));


router.get('/login/google/callback', 
  passport.authenticate('google', { failureRedirect: '/user/login' }),
  function(req, res) {
    res.redirect('/');
  });

router.get('/register', userController.getRegister);
router.post('/register', userController.postRegister);

router.get('/register/verify/:id', userController.getRegisterVerify);
router.post('/register/verify', userController.postRegisterVerify);

router.get('/logout', userController.logout);

router.get('/info', userController.info);

router.get('/info/updateinfo', userController.getUpdateInfo);
router.post('/info/updateinfo', userController.postUpdateInfo);

router.post('/info/updateinfo/google', userController.postUpdateInfoGoogle)


router.get('/info/updatepassword', userController.getUpdatePassword);
router.post('/info/updatepassword', userController.postUpdatePassword);

router.get('/forgetpassword', userController.getForgetPassword);
router.post('/forgetpassword', userController.postForgetPassword);

router.get('/forgetpassword/verify/:id', userController.getForgetPasswordVerify);
router.post('/forgetpassword/verify', userController.postForgetPasswordVerify);

router.get('/forgetpassword/update/:id', userController.getUpdateForgetPassword);
router.post('/forgetpassword/update/:id', userController.postUpdateForgetPassword);

module.exports = router;