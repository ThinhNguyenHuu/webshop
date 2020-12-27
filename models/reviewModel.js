const { ObjectId } = require('mongodb');
const {db} = require('../db');
const productModel = require('./productModel');

module.exports.list = async (pageIndex, reviewPerPage, productId) => {
  
  const count = await this.count(productId);

  // get last page
  let lastPage = Math.ceil(count / reviewPerPage);
  if (lastPage < 1) lastPage = 1;

  // get current page
  let page = parseInt(pageIndex) || 1;
  if (page < 0) page = 1;
  if (page > lastPage) page = lastPage;

  const listReview = await db().collection('review').find({product_id: ObjectId(productId)}, {
    skip: reviewPerPage * (page - 1),
    limit: reviewPerPage
  }).sort({_id: -1}).toArray();

  return {
    listReview,
    reviewPage: page,
    reviewLastPage: lastPage
  };
}

module.exports.addReview = async (data, productId) => {
  const value = parseInt(data.value);
  const quality = parseInt(data.quality);
  const price = parseInt(data.price);

  const result = await Promise.all([
    productModel.findProduct(productId),
    this.count(productId)
  ])

  const product = result[0];
  const review_count = result[1];
  const rating 
    = ((product.rating * (3 * review_count)) + (value + quality + price)) / (3 * (review_count + 1));

  await Promise.all([
    db().collection('review').insertOne({
      product_id: ObjectId(productId),
      name: data.name.trim(),
      summary: data.summary.trim(),
      detail: data.detail.trim(),
      value: value,
      quality: quality,
      price: price
    })
    ,
    db().collection('product').updateOne({_id: ObjectId(productId)}, {
      $set: {
        rating: rating
      }
    })
  ]);
}

module.exports.count = async (productId) => {
  return await db().collection('review').countDocuments({product_id: ObjectId(productId)});
}