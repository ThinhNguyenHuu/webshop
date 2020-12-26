const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');

module.exports.addOrder = async (req, res, next) =>
{
    if(req.session.cart)
    {
        if(req.user)
        {
            let address = req.body.address;
            let phonenum = req.body.phonenum;
            let checkPhonenum = true;

            if(phonenum.length !== 10 && phonenum.length !== 11)
                checkPhonenum = false;

            if(phonenum.charAt(0) !== '0')
                checkPhonenum = false;

            for(let i = 0; i < phonenum.length; i++)
            {
                if(phonenum.charAt(i) < '0' || phonenum.charAt(i) > '9')
                    checkPhonenum = false;
            }
            if(checkPhonenum)
            {
                await orderModel.addOrder(req.session.cart, req.user, address, phonenum);
                req.session.cart = null;
                res.redirect('/');
            }
            else
            {
                res.redirect("/cart");
            }
        }
        else
        {
            res.redirect("/user/login");
        }
    }
}

module.exports.listOrder = async (req, res, next) =>
{
    const listCategory_brand = await productModel.listCategory_brand();

    if(req.user)
    {
        const list = await orderModel.listOrder(req.user);
        res.render('listOrder',{
        title: "Danh sách đơn hàng",
        listCategory_brand: listCategory_brand,
        listOrder: list
        });
    }
    else
    {
        next();
    }
}