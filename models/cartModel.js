const ObjectId = require('mongodb').ObjectID;
const {db} = require('../db');

const productModel = require('../models/productModel');

module.exports.getProductsInCart = async (cart) => {
    let products = [];
    let totalPriceAll = 0;
    for(let i = 0; i < cart.length; i++)
    {
        const product = await productModel.findProduct(cart[i].id);
        const totalPrice = (product.price - product.price * product.discount / 100.0) * cart[i].qty;
        totalPriceAll += totalPrice; 
        products.push({product: product, qty: cart[i].qty, totalPrice: totalPrice});
    }

    return {products, totalPriceAll};
}