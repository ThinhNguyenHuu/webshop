const express = require('express');
const productModel = require('../models/productModel');


const ProductNum_per_page = 9;
module.exports.getList = async (req, res, next) => {
  const pagination = await productModel.list(req.query.page, ProductNum_per_page);
  const listCategory_brand = await productModel.listCategory_brand();
  
  const url = (req.originalUrl).split("?",1);

  
  res.render('listProduct', {
    title: 'Product',
    list: pagination.list,
    currentPage: pagination.currentPage,
    nextPage: pagination.nextPage,
    afterNextPage: pagination.afterNextPage,
    prePage: pagination.prePage,
    beforePrePage: pagination.beforePrePage,
    listCategory_brand: listCategory_brand,
    url: url[0]
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