const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/products/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  }
})

const upload = multer({ storage: storage });


router.get('/', controller.index);

router.get('/delete/:_id', controller.delete);

router.post('/add', upload.single('image'), controller.add);

router.post('/edit/:_id', controller.edit);

module.exports = router;
