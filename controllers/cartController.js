const cartModel = require('../models/cartModel');
const productModel = require('../models/productModel');

module.exports.index = async (req, res, next) => {
    const listCategory_brand = await productModel.listCategory_brand();

    const cart = req.session.cart;
    if(cart)
    {
        const products = await cartModel.getProductsInCart(cart);

        res.render('cart', {
        title: 'Giỏ hàng',
        listCategory_brand: listCategory_brand,
        products: products.products,
        productsInCart: products.products,
        totalPriceAll: products.totalPriceAll,
        referer: req.headers['referer']
        });
    }
    else
    {
        res.render('cart', {
            title: 'Giỏ hàng',
            listCategory_brand: listCategory_brand,
            referer: req.headers['referer']
        });
    }
}

module.exports.addProduct = async (req, res, next) => {
    const listCategory_brand = await productModel.listCategory_brand();
    
    let cart = [];
    const quantity = +req.query.qty || 1;
    if(req.session.cart)
        cart = req.session.cart;
    
    
    cart.push({id: req.params.id, qty: quantity});
    req.session.cart = cart;
    
    res.redirect(req.headers['referer']);
}

