const express = require('express');
const productModel = require('../models/productModel');


module.exports.getList = async (req, res, next) => {
  
  const  pagination = await productModel.list(req.query.page, req.query.numProduct);

  const listCategory_brand = await productModel.listCategory_brand();
  
  const url = (req.originalUrl).split("?", 1)[0] + "?";
  
  const numProduct = +req.query.numProduct || 9;
  
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

module.exports.getListFilteredProduct = async (req, res, next) =>{
  
  const  pagination = await productModel.listFilteredProduct(req.params.category_brand,req.query.page, req.query.numProduct);

  const listCategory_brand = await productModel.listCategory_brand();

  const url = (req.originalUrl).split("?", 1)[0] + "?";

  const numProduct = +req.query.numProduct || 9;

  
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

module.exports.getListSearchedProduct = async (req, res, next) => {
  
  const  pagination = await productModel.listSearchedProduct(req.query.page, req.query.numProduct, req.query.search);

  const listCategory_brand = await productModel.listCategory_brand();
  
  const url = (req.originalUrl).split("&",1)[0] + "&";

  const numProduct = +req.query.numProduct || 9;

  const title = "Kết quả tìm kiếm " + req.query.search;
  
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


exports.productDetails = async (req, res, next) => {
  const { product, brand, category, relatedList } = await productModel.details(req.params.productId);
  const listCategory_brand = await productModel.listCategory_brand();

  res.render('productDetails', {
    title: product.name,
    product,
    brand,
    category,
    relatedList, 
    listCategory_brand
  })
}