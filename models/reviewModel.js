const { ObjectId } = require('mongodb');
const {db} = require('../db');

module.exports.list = async (pageIndex, reviewPerPage, productId) => {
  
  const count = await this.count();

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
  await db().collection('review').insertOne({
    product_id: ObjectId(productId),
    name: data.name.trim(),
    summary: data.summary.trim(),
    detail: data.detail.trim(),
    value: parseInt(data.value),
    quality: parseInt(data.quality),
    price: parseInt(data.price)
  })
}

module.exports.count = async () => {
  return await db().collection('review').countDocuments({});
}