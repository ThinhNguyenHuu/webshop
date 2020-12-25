const ObjectId = require('mongodb').ObjectID;
const {db} = require('../db');


module.exports.addCart = async (iduser) =>
{
    await db().collection('cart').insertOne(
        {
            user: ObjectId(iduser)
        }
    )
}