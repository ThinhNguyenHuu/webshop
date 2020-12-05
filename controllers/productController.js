const productModel = require('../models/productModel');

module.exports.getList = async (req, res, next) => {
  const list = await productModel.list();
  const listCategory_brand = await productModel.listCategory_brand();
  
  
  res.render('listProduct', {
    title: 'Product',
    list: list,
    listCategory_brand: listCategory_brand
  });
} 

module.exports.getListClassifiedProduct = async (req, res, next) =>
{

  const list = await productModel.listClassifiedProduct(req.params.category_brand);
  const listCategory_brand = await productModel.listCategory_brand();
  
  res.render('listProduct', {
    title: 'Product',
    list: list,
    listCategory_brand: listCategory_brand
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