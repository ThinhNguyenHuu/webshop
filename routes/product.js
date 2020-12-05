const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');


router.get('/', controller.getList);

router.get('/:category_brand', controller.getListClassifiedProduct)


router.get('/detail/:productId', controller.productDetails);

module.exports = router;