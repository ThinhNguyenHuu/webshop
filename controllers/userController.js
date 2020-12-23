const userModel = require('../models/userModel');
const productModel = require('../models/productModel');

module.exports.getLogin = async (req, res, next) => {
  const listCategory_brand = await productModel.listCategory_brand();
  res.render('login', {
    title: 'Đăng nhập',
    listCategory_brand: listCategory_brand
   });
} 

module.exports.getRegister = async (req, res, next) => {
  const listCategory_brand = await productModel.listCategory_brand();
  res.render('register', { 
    title: 'Đăng ký',
    listCategory_brand: listCategory_brand
  });
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

  const info = await userModel.info();
  const listCategory_brand = await productModel.listCategory_brand();
  res.render('infoUser', {
    title: 'Tài khoản',
    info: info,
    listCategory_brand: listCategory_brand
   });
} 


module.exports.change = async (req, res, next) => {
  
  if(req.params._id) {
    let file = null;
    if (req.files != null && req.files.image != null) {
      file = req.files.image;
    }
    
    await userModel.change(req.body, file, req.params._id);
    res.redirect("/user/info");
  } else {
    next();
  }

}