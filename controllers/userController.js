const userModel = require('../models/userModel');
const productModel = require('../models/productModel');

exports.login = async (req, res, next) => {
  const listCategory_brand = await productModel.listCategory_brand();
  res.render('login', {
    title: 'Login',
    listCategory_brand: listCategory_brand
   });
} 

exports.register = async (req, res, next) => {
  const listCategory_brand = await productModel.listCategory_brand();
  res.render('register', { 
    title: 'Register',
    listCategory_brand: listCategory_brand
  });
} 

module.exports.info = async (req, res, next) => {

  const info = await userModel.info();
  const listCategory_brand = await productModel.listCategory_brand();
  res.render('infoUser', {
    title: 'Information',
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