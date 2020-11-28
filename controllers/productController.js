const productModel = require('../models/productModel');

exports.list = async (req, res, next) => {
  const list = await productModel.list();
  
  
  res.render('listProduct', {
    title: 'Product',
    list
  });
} 