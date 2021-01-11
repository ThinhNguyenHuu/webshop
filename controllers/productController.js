const express = require('express');
const productModel = require('../models/productModel');
const reviewModel = require('../models/reviewModel');
const cartModel = require('../models/cartModel');
const commentModel = require('../models/commentModel');


module.exports.getList = async (req, res, next) => {
  
  const  pagination = await productModel.list(req.query.page, req.query.numProduct, req.query.sort, req.query.filter);

  const listCategory_brand = await productModel.listCategory_brand();
  
  const url = (req.originalUrl).split("?", 1)[0] + "?";
  
  const numProduct = +req.query.numProduct || 9;

  const sortby = req.query.sort ? req.query.sort : "Vị trí";

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
      sortby: sortby,
      filter: req.query.filter,
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
      numProduct: numProduct,
      sortby: sortby,
      filter: req.query.filter
    });
  }
} 

module.exports.getListClassifiedProduct = async (req, res, next) =>{
  
  const  pagination = await productModel.listClassifiedProduct(req.params.category_brand, req.query.page, req.query.numProduct, req.query.sort, req.query.filter);

  const listCategory_brand = await productModel.listCategory_brand();

  const url = (req.originalUrl).split("?", 1)[0] + "?";

  const numProduct = +req.query.numProduct || 9;

  const sortby = req.query.sort ? req.query.sort : "Vị trí";

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
      sortby: sortby,
      filter: req.query.filter,
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
      numProduct: numProduct,
      sortby: sortby,
      filter: req.query.filter
    });
  }
}

module.exports.getListSearchedProduct = async (req, res, next) => {
  
  const  pagination = await productModel.listSearchedProduct(req.query.page, req.query.numProduct, req.query.search, req.query.sort, req.query.filter);

  const listCategory_brand = await productModel.listCategory_brand();
  
  const url = (req.originalUrl).split("&",1)[0] + "&";

  const numProduct = +req.query.numProduct || 9;

  const title = "Kết quả tìm kiếm " + req.query.search;

  const sortby = req.query.sort ? req.query.sort : "Vị trí";
  
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
      sortby: sortby,
      filter: req.query.filter,
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
      numProduct: numProduct,
      sortby: sortby,
      filter: req.query.filter
    });
  }
}

module.exports.getAdvancedSearch = async (req, res, next) =>
{
  const listCategory_brand = await productModel.listCategory_brand();
  const listCategory = await productModel.listCategory();
  const listBrand = await productModel.listBrand();

  res.render('advancedSearch',{
    listCategory_brand: listCategory_brand,
    listCategory: listCategory,
    listBrand: listBrand
  })
}

module.exports.getResultAdvancedSearch = async (req, res, next) =>
{
  const  pagination = await productModel.listAdvancedSearchedProduct(req.query.page, req.query.numProduct, req.query.sort, req.query.name, req.query.category, req.query.brand, req.query.price);

  const listCategory_brand = await productModel.listCategory_brand();
  
  const splitUrl = (req.originalUrl).split("&");
  let url = "";
  if(splitUrl.length > 4)
  {
    for(let i = 0; i < 4; i++)
      url = url + splitUrl[i] + "&";
  }
  else
  {
    url = req.originalUrl + "&";
  }

  const numProduct = +req.query.numProduct || 9;

  let title;
  if(req.query.price == "1")
    title = "Kết quả tìm kiếm " + req.query.name + " " + req.query.category + " " + req.query.brand + " " + "0 - 5.000.000đ";
  else
    title = "Kết quả tìm kiếm " + req.query.name + " " + req.query.category + " " + req.query.brand + " " + "Trên 5.000.000đ";

  const sortby = req.query.sort ? req.query.sort : "Vị trí";
  
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
      sortby: sortby,
      advancedSearch: true,
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
      numProduct: numProduct,
      sortby: sortby,
      advancedSearch: true
    });
  }
}

const REVIEW_PER_PAGE = 5;
const COMMENT_PER_PAGE = 5;

exports.productDetails = async (req, res, next) => {
  
  const result = await Promise.all([
    productModel.details(req.params.productId),
    productModel.listCategory_brand(),
    reviewModel.list(req.query.reviewPage, REVIEW_PER_PAGE, req.params.productId),
    commentModel.list(req.query.commentPage, COMMENT_PER_PAGE, req.params.productId),
    productModel.updateViewCount(req.params.productId)
  ]);

  const { product, brand, category, relatedList } = result[0];
  const listCategory_brand = result[1];
  const { listReview, reviewPage, reviewLastPage } = result[2];
  const { listComment, commentPage, commentLastPage, countComment } = result[3];


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
      reviewPage,
      reviewLastPage,
      reviewNextPage: reviewPage + 1,
      reviewPreviousPage: reviewPage - 1,
      haveReviewNextPage: reviewPage < reviewLastPage,
      haveReviewPreviousPage: reviewPage > 1,
      productsInCart: productsInCart.products,
      totalPriceAll: productsInCart.totalPriceAll,
      listComment,
      commentPage,
      commentLastPage,
      commentNextPage: commentPage + 1,
      commentPreviousPage: commentPage - 1,
      haveCommentNextPage: commentPage < commentLastPage,
      haveCommentPreviousPage: commentPage > 1,
      countComment
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
      reviewPage,
      reviewLastPage,
      reviewNextPage: reviewPage + 1,
      reviewPreviousPage: reviewPage - 1,
      haveReviewNextPage: reviewPage < reviewLastPage,
      haveReviewPreviousPage: reviewPage > 1,
      listComment,
      commentPage,
      commentLastPage,
      commentNextPage: commentPage + 1,
      commentPreviousPage: commentPage - 1,
      haveCommentNextPage: commentPage < commentLastPage,
      haveCommentPreviousPage: commentPage > 1,
      countComment
    })
  }
}

module.exports.addReview = async (req, res, next) => {
  if (res.locals.user)
    req.body.name = res.locals.user.fullname;
  
  await reviewModel.addReview(req.body, req.params.productId);
  res.redirect(req.get('referer') + '#reviews_tabs');
}

module.exports.addComment = async (req, res, next) => {
  if (res.locals.user)
    req.body.userId = res.locals.user._id;
  else
    req.body.userId = null;

  await commentModel.addComment(req.body, req.params.commentId, req.params.productId);
  res.redirect(req.get('referer') + '#comments_tabs');
}