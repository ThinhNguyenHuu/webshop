const productModel = require('../models/productModel');

exports.list = async (req, res, next) => {
  const list = await productModel.list();
  
  
  res.render('listProduct', {
    title: 'Product',
    list  
  });
} 

exports.productDetails = async (req, res, next) => {
  const { product, brand, category, relatedList } = await productModel.details(req.params.productId);

  res.render('productDetails', {
    title: product.name,
    product,
    brand,
    category,
    relatedList
  })
}