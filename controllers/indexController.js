const productModel = require('../models/productModel');

exports.index = async (req, res, next) => {
  const result = await Promise.all([
    productModel.listCategory_brand(),
    productModel.listBestSellerProduct(),
    productModel.listLatestProduct(),
    productModel.listSaleProduct(),
    productModel.listFeaturedProduct()
  ]);

  const listCategory_brand = result[0];

  res.render('index', {
    title: 'Trang chủ',
    listCategory_brand: result[0],
    listBestSellerProduct: result[1],
    listLatestProduct: result[2],
    listSaleProduct: result[3],
    listFeaturedProduct: result[4]
  });
} 
