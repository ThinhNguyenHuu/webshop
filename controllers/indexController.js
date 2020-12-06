const productModel = require('../models/productModel');

exports.index = async (req, res, next) => {
  const list = await productModel.list(1, 9, "");
  const listCategory_brand = await productModel.listCategory_brand();

  res.render('index', {
    title: 'Home',
    listCategory_brand: listCategory_brand,
    list: list.list,
    currentUrl: "/product"
    
  });
} 
