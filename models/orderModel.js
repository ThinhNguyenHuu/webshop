const ObjectId = require('mongodb').ObjectID;
const Double = require('mongodb').Double;
const {db} = require('../db');

const productModel = require('../models/productModel');

module.exports.addOrder = async (cart, user, address, phonenum) =>
{
    const today = new Date();
    const date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();

    let totalPriceAll = 0;
    for(let i = 0; i < cart.length; i++)
    {
        const product = await productModel.findProduct(cart[i].id);
        const price = product.price - product.price * product.discount / 100.0;
        const totalPrice = price * cart[i].qty;
        totalPriceAll += totalPrice; 
        cart[i].totalPrice = totalPrice;
        cart[i].price = price;
    }

    const resultInsertOrder = await db().collection('order').insertOne({
        user: ObjectId(user._id),
        date: date,
        phonenum: phonenum,
        address: address,
        total_price_all: totalPriceAll,
        status: "Chờ lấy hàng"
    });

    for(let i = 0; i < cart.length; i++)
    {
        await db().collection('order_product').insertOne({
            order: ObjectId(resultInsertOrder.insertedId),
            product: ObjectId(cart[i].id),
            quantity: Double(cart[i].qty),
            price: Double(cart[i].price),
            total_price: Double(cart[i].totalPrice)
        })
    }
}

module.exports.listOrder = async (user) =>
{
    return await db().collection('order').find({user: ObjectId(user._id)}).toArray();
}

module.exports.getProductsInOrder = async (id) =>
{
    const list =  await db().collection('order_product').find({order: ObjectId(id)}).toArray();

    for(let i = 0; i < list.length; i++)
    {
        list[i].product = await productModel.findProduct(list[i].product);
    }

    return list;
}

module.exports.findOrder = async (id) =>
{
    return await db().collection('order').findOne({_id: ObjectId(id)});
}