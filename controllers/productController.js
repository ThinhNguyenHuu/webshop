const express = require('express');
const productModel = require('../models/productModel');
const reviewModel = require('../models/reviewModel');
const cartModel = require('../models/cartModel');


module.exports.getList = async (req, res, next) => {
  
  const  pagination = await productModel.list(req.query.page, req.query.numProduct);

  const listCategory_brand = await productModel.listCategory_brand();
  
  const url = (req.originalUrl).split("?", 1)[0] + "?";
  
  const numProduct = +req.query.numProduct || 9;

  let productsInCart;
  if(req.session.cart)
  {
    productsInCart = await cartModel.getProductsInCart(req.session.cart);
  
    res.render('listProduct', {
      title: 'Sản phẩm',
      list: pagination.list,
      currentPage: pagination.currentPage,
      nextPage: pagination.nextPage,
      afterNextPage: pagination.afterNextPage,
      prePage: pagination.prePage,
      beforePrePage: pagination.beforePrePage,
      listCategory_brand: listCategory_brand,
      url: url,
      numProduct: numProduct,
      productsInCart: productsInCart.products,
      totalPriceAll: productsInCart.totalPriceAll
    });
  }
  else
  {
    res.render('listProduct', {
      title: 'Sản phẩm',
      list: pagination.list,
      currentPage: pagination.currentPage,
      nextPage: pagination.nextPage,
      afterNextPage: pagination.afterNextPage,
      prePage: pagination.prePage,
      beforePrePage: pagination.beforePrePage,
      listCategory_brand: listCategory_brand,
      url: url,
      numProduct: numProduct
    });
  }
} 

module.exports.getListFilteredProduct = async (req, res, next) =>{
  
  const  pagination = await productModel.listFilteredProduct(req.params.category_brand,req.query.page, req.query.numProduct);

  const listCategory_brand = await productModel.listCategory_brand();

  const url = (req.originalUrl).split("?", 1)[0] + "?";

  const numProduct = +req.query.numProduct || 9;

  let productsInCart;
  if(req.session.cart)
  {
    productsInCart = await cartModel.getProductsInCart(req.session.cart);

    res.render('listProduct', {
      title: req.params.category_brand,
      list: pagination.list,
      currentPage: pagination.currentPage,
      nextPage: pagination.nextPage,
      afterNextPage: pagination.afterNextPage,
      prePage: pagination.prePage,
      beforePrePage: pagination.beforePrePage,
      listCategory_brand: listCategory_brand,
      url: url,
      numProduct: numProduct,
      productsInCart: productsInCart.products,
      totalPriceAll: productsInCart.totalPriceAll
    });
  }
  else
  {
    res.render('listProduct', {
      title: req.params.category_brand,
      list: pagination.list,
      currentPage: pagination.currentPage,
      nextPage: pagination.nextPage,
      afterNextPage: pagination.afterNextPage,
      prePage: pagination.prePage,
      beforePrePage: pagination.beforePrePage,
      listCategory_brand: listCategory_brand,
      url: url,
      numProduct: numProduct
    });
  }
}

module.exports.getListSearchedProduct = async (req, res, next) => {
  
  const  pagination = await productModel.listSearchedProduct(req.query.page, req.query.numProduct, req.query.search);

  const listCategory_brand = await productModel.listCategory_brand();
  
  const url = (req.originalUrl).split("&",1)[0] + "&";

  const numProduct = +req.query.numProduct || 9;

  const title = "Kết quả tìm kiếm " + req.query.search;
  
  let productsInCart;
  if(req.session.cart)
  {
    productsInCart = await cartModel.getProductsInCart(req.session.cart);

    res.render('listProduct', {
      title: title,
      list: pagination.list,
      currentPage: pagination.currentPage,
      nextPage: pagination.nextPage,
      afterNextPage: pagination.afterNextPage,
      prePage: pagination.prePage,
      beforePrePage: pagination.beforePrePage,
      listCategory_brand: listCategory_brand,
      url: url,
      numProduct: numProduct,
      productsInCart: productsInCart.products,
      totalPriceAll: productsInCart.totalPriceAll
    });
  }
  else
  {
    res.render('listProduct', {
      title: title,
      list: pagination.list,
      currentPage: pagination.currentPage,
      nextPage: pagination.nextPage,
      afterNextPage: pagination.afterNextPage,
      prePage: pagination.prePage,
      beforePrePage: pagination.beforePrePage,
      listCategory_brand: listCategory_brand,
      url: url,
      numProduct: numProduct
    });
  }
}

const REVIEW_PER_PAGE = 5;

exports.productDetails = async (req, res, next) => {
  const { product, brand, category, relatedList } = await productModel.details(req.params.productId);
  const listCategory_brand = await productModel.listCategory_brand();
  
  const { 
    listReview, 
    page, 
    lastPage 
  } = await reviewModel.list(req.query.reviewPage, REVIEW_PER_PAGE, req.params.productId);

  let productsInCart;
  if(req.session.cart)
  {
    productsInCart = await cartModel.getProductsInCart(req.session.cart);

    res.render('productDetails', {
      title: product.name,
      product,
      brand,
      category,
      relatedList, 
      listCategory_brand,
      listReview,
      page,
      lastPage,
      nextPage: page + 1,
      previousPage: page - 1,
      haveNextPage: page < lastPage,
      havePreviousPage: page > 1,
      productsInCart: productsInCart.products,
      totalPriceAll: productsInCart.totalPriceAll
    })
  }
  else
  {
    res.render('productDetails', {
      title: product.name,
      product,
      brand,
      category,
      relatedList, 
      listCategory_brand,
      listReview,
      page,
      lastPage,
      nextPage: page + 1,
      previousPage: page - 1,
      haveNextPage: page < lastPage,
      havePreviousPage: page > 1
    })
  }
}

module.exports.addReview = async (req, res, next) => {
  if (res.locals.user)
    req.body.name = res.locals.user.fullname;
  
  await reviewModel.addReview(req.body, req.params.productId);
  res.redirect('/product/detail/' + req.params.productId + '#reviews_tabs');
}