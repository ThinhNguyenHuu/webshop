const { ObjectId } = require('mongodb');
const {db} = require('../db');

module.exports.list = async () =>  await db().collection('product').find().toArray();

module.exports.best_seller = async () => {}

module.exports.lastest = async () => {}

module.exports.recommend = async () => {}

module.exports.featured = async () => {}

module.exports.details = async (productId) => {
  const product = await db().collection('product').findOne({_id: ObjectId(productId)});
  
  const brandPromise = db().collection('brand').findOne({_id: ObjectId(product.brand)});
  const categoryPromise = db().collection('category').findOne({_id: ObjectId(product.category)});
  const relatedListPromise = db().collection('product').find({_id: {$ne: ObjectId(productId)}, category: ObjectId(product.category)}).limit(7).toArray();

  const brand = await brandPromise;
  const category = await categoryPromise;
  const relatedList = await relatedListPromise;
  
  return { product, brand, category, relatedList };
}