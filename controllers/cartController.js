const cartModel = require('../models/cartModel');
const productModel = require('../models/productModel');

module.exports.index = async (req, res, next) => {
    const listCategory_brand = await productModel.listCategory_brand();

    const cart = req.session.cart;
    if(cart)
    {
        let products = [];
        let totalPriceAll = 0;
        for(let i = 0; i < cart.length; i++)
        {
            const product = await productModel.findProduct(cart[i].id);
            const totalPrice = (product.price - product.price * product.discount / 100.0) * cart[i].qty;
            totalPriceAll += totalPrice; 
            products.push({product: product, qty: cart[i].qty, totalPrice: totalPrice});
        }

        console.log(products);

        res.render('cart', {
        title: 'Giỏ hàng',
        listCategory_brand: listCategory_brand,
        products: products,
        totalPriceAll: totalPriceAll,
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

