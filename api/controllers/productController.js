const {ObjectId} = require('mongodb');
const {db} = require('../../db');
const model = require('../../models/productModel');

module.exports.index = async (req, res, next) => {
  const list = await model.list();
  res.json(list);
}

module.exports.delete = async (req, res, next) => {
  await db().collection('product').deleteOne({ _id: ObjectId(req.params._id) });
  res.send("deleted");
} 

module.exports.add = async (req, res, next) => {
  req.body.images_sources = [
    req.file.path.split('/').slice(1).join('/')
  ];

  await db().collection('product').insertOne(req.body);
  res.send('added');
}

module.exports.edit = async (req, res, next) => {

}