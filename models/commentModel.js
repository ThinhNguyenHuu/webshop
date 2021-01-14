const { ObjectId } = require('mongodb');
const {db} = require('../db');

module.exports.list = async (pageIndex, commentPerPage, productId) => {
  const count = await this.count(productId);

  // get last page
  let lastPage = Math.ceil(count / commentPerPage);
  if (lastPage < 1) lastPage = 1;

  // get current page
  let page = parseInt(pageIndex) || 1;
  if (page < 0) page = 1;
  if (page > lastPage) page = lastPage;

  const listComment = await db().collection('comment').aggregate([
    { $match: { product_id: ObjectId(productId) ,  isReply: false }},
    { $sort: { _id: -1 } },
    { $skip: commentPerPage * (page - 1) },
    { $limit:  commentPerPage},
    { $lookup: {
      from: 'user',
      localField: 'user_id',
      foreignField: '_id',
      as: 'user'
    } },
    { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
    { $lookup: {
      from: 'comment',
      localField: 'replies',
      foreignField: '_id',
      as: 'reply'
    } },
    { $unwind: { path: '$reply', preserveNullAndEmptyArrays: true }},
    { $lookup: {
      from: 'user', 
      localField: 'reply.user_id',
      foreignField: '_id',
      as: 'reply_user'
    } },
    { $unwind: { path: '$reply_user', preserveNullAndEmptyArrays: true }},
    { $set: { 'reply.user': '$reply_user' } },
    { $group: {
          _id: { _id: '$_id', text: '$text', 'name': '$name', 'user': '$user' },
          replies: { '$push': '$reply' }
        } },
    { $sort: { '_id._id': -1 } }
    ]).toArray();

  return {
    listComment,
    commentPage: page,
    commentLastPage: lastPage,  
    countComment: count
  }
}

module.exports.addComment = async (data, commentId, productId) => {
  const isReply = commentId  ? true : false;

  const {insertedId} = await db().collection('comment').insertOne({
    product_id: ObjectId(productId),
    user_id: data.userId,
    name: data.name ? data.name.trim() : '',
    text: data.text.trim(),
    isReply: isReply,
    replies: []
  });

  if (isReply) {
    await db().collection('comment').updateOne({_id: ObjectId(commentId)}, {
      $push: { replies: insertedId}
    });
  }
}

module.exports.count = async (productId) => {
  return await db().collection('comment').countDocuments({product_id: ObjectId(productId), isReply: false});
}