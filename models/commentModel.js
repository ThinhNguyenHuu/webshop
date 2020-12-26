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

  const listComment = await db().collection('comment').find({product_id: ObjectId(productId)}, {
    skip: commentPerPage * (page - 1),
    limit: commentPerPage
  }).sort({_id: -1}).toArray();

  return {
    listComment,
    commentPage: page,
    commentLastPage: lastPage,
    countComment: count
  }
}

module.exports.addComment = async (data, commentId, productId) => {
  // If it is not a reply command, add new command; otherwise, push to the reply array
  if(!commentId) {
    await db().collection('comment').insert({
      product_id: ObjectId(productId),
      name: data.name.trim(),
      text: data.text.trim(),
      reply: []
    });
  } else {
    const replyComment = {
      name: data.name.trim(),
      text: data.text.trim(),
      create_at: new Date()
    }

    await db().collection('comment').updateOne({_id: ObjectId(commentId)}, {
      $push: { reply: replyComment }
    });
  }
}

module.exports.count = async (productId) => {
  return await db().collection('comment').countDocuments({product_id: ObjectId(productId)});
}