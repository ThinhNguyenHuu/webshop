const {db} = require('../db');

module.exports.list = async () =>  await db().collection('product').find().toArray();

module.exports.best_seller = async () => {}

module.exports.lastest = async () => {}

module.exports.recommend = async () => {}

module.exports.featured = async () => {}