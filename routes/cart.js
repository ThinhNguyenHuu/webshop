const express = require('express');
const router = express.Router();
const controller = require('../controllers/cartController');

router.get('/', controller.index);

router.get('/addproduct/:id', controller.addProduct);

router.get('/removeproduct/:id', controller.removeProduct);

router.get('/removeall', controller.removeAll);

router.get('/updateproduct/:id', controller.updateProduct);

module.exports = router;