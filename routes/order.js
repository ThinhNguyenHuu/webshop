const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderController');

router.post('/addorder', controller.addOrder);

module.exports = router;