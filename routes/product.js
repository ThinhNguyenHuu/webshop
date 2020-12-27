const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');


router.get('/', controller.getList);

router.get('/search', controller.getListSearchedProduct)

router.get('/:category_brand', controller.getListClassifiedProduct)

router.get('/detail/:productId', controller.productDetails);

router.post('/:productId/review', controller.addReview);

router.post('/:productId/comment', controller.addComment);

router.post('/:productId/reply-comment/:commentId', controller.addComment);

module.exports = router;