const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');


router.get('/login', controller.login);
router.get('/register', controller.register);
router.get('/info', controller.info);
router.post('/info/change/:_id', controller.change);

module.exports = router;