const productModel = require('../models/productModel');
const cartModel = require('../models/cartModel');

exports.index = async (req, res, next) => {
  if(req.session.cart)
  {
    const result = await Promise.all([
      productModel.listCategory_brand(),
      productModel.listBestSellerProduct(),
      productModel.listLatestProduct(),
      productModel.listSaleProduct(),
      productModel.listFeaturedProduct(),
      cartModel.getProductsInCart(req.session.cart)
    ]);
    const listCategory_brand = result[0];

    res.render('index', {
      title: 'Trang chủ',
      listCategory_brand: result[0],
      listBestSellerProduct: result[1],
      listLatestProduct: result[2],
      listSaleProduct: result[3],
      listFeaturedProduct: result[4],
      productsInCart: result[5].products,
      totalPriceAll: result[5].totalPriceAll
    });
  }
  else
  {
    const result = await Promise.all([
      productModel.listCategory_brand(),
      productModel.listBestSellerProduct(),
      productModel.listLatestProduct(),
      productModel.listSaleProduct(),
      productModel.listFeaturedProduct(),
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
} 
