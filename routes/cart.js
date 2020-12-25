const express = require('express');
const router = express.Router();
const controller = require('../controllers/cartController');

router.get('/', controller.index);

router.get('/addproduct/:id', controller.addProduct);

module.exports = router;