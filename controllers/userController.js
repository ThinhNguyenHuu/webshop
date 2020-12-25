const userModel = require('../models/userModel');
const productModel = require('../models/productModel');
const cartModel = require('../models/cartModel');

module.exports.getLogin = async (req, res, next) => {
  const listCategory_brand = await productModel.listCategory_brand();

  let productsInCart;
  if(req.session.cart)
  {
    productsInCart = await cartModel.getProductsInCart(req.session.cart);

    res.render('login', {
      title: 'Đăng nhập',
      listCategory_brand: listCategory_brand,
      error: req.flash('error'),
      productsInCart: productsInCart.products,
      totalPriceAll: productsInCart.totalPriceAll
     });
  }
  else
  {
    res.render('login', {
      title: 'Đăng nhập',
      listCategory_brand: listCategory_brand,
      error: req.flash('error')
    });
  }
} 

module.exports.getRegister = async (req, res, next) => {
  const listCategory_brand = await productModel.listCategory_brand();

  let productsInCart;
  if(req.session.cart)
  {
    productsInCart = await cartModel.getProductsInCart(req.session.cart);

    res.render('register', { 
      title: 'Đăng ký',
      listCategory_brand: listCategory_brand,
      productsInCart: productsInCart.products,
      totalPriceAll: productsInCart.totalPriceAll
    });
  }
  else
  {
    res.render('register', { 
      title: 'Đăng ký',
      listCategory_brand: listCategory_brand
    });
  }
} 

module.exports.postRegister = async (req, res, next) => {
  const resultAddUser = await userModel.addUser(req.body);

  if(resultAddUser)
    res.redirect('/user/login');
  else
    res.redirect('/user/register');
}

module.exports.logout = (req, res, next) => {

    req.logout();
    res.redirect('/');
}


module.exports.info = async (req, res, next) => {

  const listCategory_brand = await productModel.listCategory_brand();

  let productsInCart;
  if(req.session.cart)
  {
    productsInCart = await cartModel.getProductsInCart(req.session.cart);

    res.render('infoUser', {
      title: 'Tài khoản',
      listCategory_brand: listCategory_brand,
      productsInCart: productsInCart.products,
      totalPriceAll: productsInCart.totalPriceAll
     });
  }
  else
  {
    res.render('infoUser', {
      title: 'Tài khoản',
      listCategory_brand: listCategory_brand
    });
  }
} 


module.exports.getUpdateInfo = async (req, res, next) => {
  
  const listCategory_brand = await productModel.listCategory_brand();

  let productsInCart;
  if(req.session.cart)
  {
    productsInCart = await cartModel.getProductsInCart(req.session.cart);

    res.render('updateInfoUser', {
      title: 'Cập nhật thông tin',
      listCategory_brand: listCategory_brand,
      productsInCart: productsInCart.products,
      totalPriceAll: productsInCart.totalPriceAll
     });
  }
  else
  {
    res.render('updateInfoUser', {
      title: 'Cập nhật thông tin',
      listCategory_brand: listCategory_brand
    });
  }

}

module.exports.postUpdateInfo = async (req, res, next) => {
  
  if(req.user) {
    let file = null;
    if (req.files != null && req.files.image != null) {
      file = req.files.image;
    }
    
    await userModel.updateInfoUser(req.body, file, req.user);
    res.redirect("/user/info");
  } else {
    next();
  }

}

module.exports.getUpdatePassword = async (req, res, next) => {
  
  const listCategory_brand = await productModel.listCategory_brand();

  let productsInCart;
  if(req.session.cart)
  {
    productsInCart = await cartModel.getProductsInCart(req.session.cart);

    res.render('updatePassword', {
      title: 'Đổi mật khẩu',
      listCategory_brand: listCategory_brand,
      productsInCart: productsInCart.products,
      totalPriceAll: productsInCart.totalPriceAll
     });
  }
  else
  {
    res.render('updatePassword', {
      title: 'Đổi mật khẩu',
      listCategory_brand: listCategory_brand
    });
  }
}

module.exports.postUpdatePassword = async (req, res, next) => {
  if(req.user)
  {
    const resultUpdate =  await userModel.updatePassword(req.body, req.user);
    if(resultUpdate)
      res.redirect("/user/info");
    else
      res.redirect("/user/info/updatepassword");
  }
  else {
    next();
  }

}