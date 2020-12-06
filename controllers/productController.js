const express = require('express');
const productModel = require('../models/productModel');


module.exports.getList = async (req, res, next) => {
  let pagination;
  if((req.originalUrl).indexOf("search=") == -1)
     pagination = await productModel.list(req.query.page, req.query.numProduct, "");
  else
    pagination = await productModel.list(req.query.page, req.query.numProduct, req.query.search);

  const listCategory_brand = await productModel.listCategory_brand();
  
  let url;
  if((req.originalUrl).indexOf("search=") == -1 )
  {
    url =  ((req.originalUrl).split("?",1))[0] + "?";
  }
  else if ((req.originalUrl).indexOf("&") == -1)
  {
    url = req.originalUrl + "&";
  }
  else
  {
    url = ((req.originalUrl).split("&",1))[0] + "&";
  }
  
  const currentUrl = (req.originalUrl).split("?", 1)[0];

  const numProduct = +req.query.numProduct || 9;
  
  res.render('listProduct', {
    title: 'Product',
    list: pagination.list,
    currentPage: pagination.currentPage,
    nextPage: pagination.nextPage,
    afterNextPage: pagination.afterNextPage,
    prePage: pagination.prePage,
    beforePrePage: pagination.beforePrePage,
    listCategory_brand: listCategory_brand,
    url: url,
    currentUrl: currentUrl,
    numProduct: numProduct
  });
} 

module.exports.getListFilteredProduct = async (req, res, next) =>{
  let pagination;
  if((req.originalUrl).indexOf("search=") == -1)
    pagination = await productModel.listFilteredProduct(req.params.category_brand,req.query.page, req.query.numProduct, "");
  else
    pagination = await productModel.listFilteredProduct(req.params.category_brand,req.query.page, req.query.numProduct, req.query.search);

  const listCategory_brand = await productModel.listCategory_brand();

  let url;
  if((req.originalUrl).indexOf("search=") == -1 )
  {
    url =  ((req.originalUrl).split("?",1))[0] + "?";
  }
  else if ((req.originalUrl).indexOf("&") == -1)
  {
    url = req.originalUrl + "&";
  }
  else
  {
    url = ((req.originalUrl).split("&",1))[0] + "&";
  }

  const currentUrl = (req.originalUrl).split("?", 1)[0];

  const numProduct = +req.query.numProduct || 9;

  
  res.render('listProduct', {
    title: 'Product',
    list: pagination.list,
    currentPage: pagination.currentPage,
    nextPage: pagination.nextPage,
    afterNextPage: pagination.afterNextPage,
    prePage: pagination.prePage,
    beforePrePage: pagination.beforePrePage,
    listCategory_brand: listCategory_brand,
    url: url,
    currentUrl: currentUrl,
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