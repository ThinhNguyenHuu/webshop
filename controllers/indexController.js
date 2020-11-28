const productModel = require('../models/productModel');

exports.index = async (req, res, next) => {
  const list = await productModel.list();

  res.render('index', {
    title: 'Home',
    list
  });
} 
