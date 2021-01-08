const fs = require('fs');
const ObjectId = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const {db} = require('../db');
const cloudinary = require('../cloudinary');

const saltRounds = 10;

module.exports.addUser = async (body) =>
{
    let fullname;
    let username;
    let email;
    let password;
    let confirmPass;
 
    if(body.fullname)
        fullname = body.fullname;
    else
        return false;

    if(body.email)
        email = body.email;
    else
        return false;

    const checkEmailUser =  await db().collection('user').findOne({email: email});

    
    if(body.username)
        username = body.username;
    else
        return false;

    const checkuser = await db().collection('user').findOne({username: username});

    if(checkuser)
        return false;

    if(body.password)
        password = body.password;
    else
        return false;

    if(body.confirm)
        confirmPass = body.confirm;
    else
        return false;
        
    if(password !== confirmPass)
        return false;

    if(!checkEmailUser)
    {
        const resultInsert = await db().collection('user').insertOne( {
            fullname: fullname, 
            email: email,
            username: username, 
            ban: false, 
            avatar: null,
            active: false,

        });
        
        await bcrypt.hash(password, saltRounds, async function(rr, hash) {
            await db().collection('user').updateOne( {_id: ObjectId(resultInsert.insertedId)} ,{$set: {
                password: hash
            }}, null);
        });
        
        await bcrypt.hash(Math.floor(Math.random() * 101).toString(), saltRounds, async function(rr, hash) {
            await db().collection('user').updateOne( {_id: ObjectId(resultInsert.insertedId)} ,{$set: {
                verification: hash
            }}, null);

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user: "inspirewebshop@gmail.com",
                  pass: "1234-abcd",
                },
              });
              
            const mailOptions = {
                from: "inspirewebshop@gmail.com", 
                to: email, 
                subject: "Mã xác nhận tài khoản",
                text: "Mã xác nhận:" + hash,
              };
              
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
        });
        return resultInsert.insertedId;
    }

    else if(checkEmailUser.active)
    {
        return false;
    }
    else
    {
        await bcrypt.hash(password, saltRounds, async function(rr, hash) {
            await db().collection('user').updateOne( {_id: ObjectId(checkEmailUser._id)} ,{$set: {
                fullname: fullname, 
                username: username, 
                ban: false, 
                avatar: null,
                password: hash
            }}, null);
        });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "inspirewebshop@gmail.com",
              pass: "1234-abcd",
            },
          });
          
        const mailOptions = {
            from: "inspirewebshop@gmail.com", 
            to: checkEmailUser.email, 
            subject: "Mã xác nhận tài khoản",
            text: "Mã xác nhận:" + checkEmailUser.verification,
          };
          
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        return checkEmailUser._id;
    }
}

//Add user that login with google 
module.exports.addGoogleUser = async (googleId, fullname, email, image) =>
{
    const avatar = {url: image};
    return await db().collection('user').insertOne( {
        googleId: googleId,
        fullname: fullname, 
        email: email, 
        ban: false, 
        avatar: avatar,
    });
}

//Verify when login
module.exports.registerVerify = async (body) => {

    const user = await db().collection('user').findOne({_id: ObjectId(body.iduser)});
    if(user)
    {
        if(user.verification == body.code)
        {
            await bcrypt.hash(Math.floor(Math.random() * 101).toString(), saltRounds, async function(rr, hash) {
                await db().collection('user').updateOne( {_id: ObjectId(body.iduser)} ,{$set: {
                    verification: hash,
                    active: true,
                }}, null);
            });  
            return true;
        }
        else
            return false;
    }
    else
        return false;

}

module.exports.findGoogleUser = async (googleId) =>
{
    return await db().collection('user').findOne({googleId: googleId});
}

module.exports.updateInfoUser = async (body, file, user) => {

    let fullname;
    let username;
    let email;
 
    if(body.fullname)
        fullname = body.fullname;
    else
        fullname = user.fullname;

    
    if(body.email)
        email = body.email;
    else
        email = user.email;

    if(body.username)
        username = body.username;
    else
        username = user.username;
       
    let source = null;
    if (file) {
        const destroyPromise = destroyFiles(user.avatar);
        const new_source = await uploadFiles(file);
        await destroyPromise;
        source = new_source;
    }

    await db().collection('user').updateOne( {_id: ObjectId(user._id)} ,{$set: {
        fullname: fullname, 
        email: email,
        avatar: source ? source : user.avatar, 
        username: username, 
    }}, null);
}

module.exports.updateInfoGoogleUser = async (file, user) => {
       
    let source = null;
    if (file) {
        const destroyPromise = destroyFiles(user.avatar);
        const new_source = await uploadFiles(file);
        await destroyPromise;
        source = new_source;
    }

    await db().collection('user').updateOne( {_id: ObjectId(user._id)} ,{$set: {

        avatar: source ? source : user.avatar, 
    }}, null);
}

module.exports.updatePassword = async (body, user) => {

    let oldpassword;
    let newpassword;
    let confirm;
 
    if(body.oldpassword)
        oldpassword = body.oldpassword;
    else
        return false;

    const match = await bcrypt.compare(oldpassword, user.password);
    
    if(!match)
        return false;
    
    if(body.newpassword)
        newpassword = body.newpassword;
    else
        return false;

    if(body.confirm)
        confirm = body.confirm;
    else
        return false;
    
    if(newpassword !== confirm)
        return false;

       
    await bcrypt.hash(newpassword, saltRounds, async function(err, hash) {
        await db().collection('user').updateOne( {_id: ObjectId(user._id)} ,{$set: {
            password: hash
        }}, null);
    });
    
    return true;
}

const uploadFiles = async (file) => {
    let source;
    
    const uploaded = await cloudinary.upload(file.tempFilePath);
    source = uploaded;
    fs.unlinkSync(file.tempFilePath);
    
    return source;
}

const destroyFiles = async (source) => {
    if(source)
        cloudinary.destroy(source.id);
}


module.exports.checkUser = async (username, password) =>
{
    const user = await db().collection('user').findOne({username: username});
    if(user)
    {
        if(user.ban)
            return {user: false, error: "Tài khoản đã bị khóa."};
        
        if(user.active == false)
            return {user: false, error: "Người dùng không tồn tại"};
        

        const match = await bcrypt.compare(password, user.password);
        if(match)
            return {user: user, error: ""} ;
        else
            return {user: false, error: "Mật khẩu không đúng."};
    }
    else
        return {user: false, error: "Người dùng không tồn tại."};
}

module.exports.findUser = async (id) =>
{
    const user = await db().collection('user').findOne({_id: ObjectId(id)});
    return user;
}

module.exports.findUserByUsername = async (username) =>
{
    const user = await db().collection('user').findOne({username: username});
    return user;
}

module.exports.sendVerifyMailUser = async (email) =>{
    const user = await db().collection('user').findOne({email: email});

    if(user)
    {
        if(user.is_admin)
            return false;
            
        if(user.googleId)
            return false;
        else
        {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                user: "inspirewebshop@gmail.com",
                pass: "1234-abcd",
                },
            });
            
            const mailOptions = {
                from: "inspirewebshop@gmail.com", 
                to: user.email, 
                subject: "Mã xác nhận tài khoản",
                text: "Mã xác nhận:" + user.verification,
            };
            
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                console.log(error);
                } else {
                console.log('Email sent: ' + info.response);
                }
            });

            return user._id;
        }
    }
    else
    {
        return false;
    }
}

//Verify when forget password
module.exports.forgetPasswordVerify = async (body) => {
    const user = await db().collection('user').findOne({_id: ObjectId(body.iduser)});
    if(user)
    {
        if(user.verification == body.code)
        {
            await bcrypt.hash(Math.floor(Math.random() * 101).toString(), saltRounds, async function(rr, hash) {
                await db().collection('user').updateOne( {_id: ObjectId(body.iduser)} ,{$set: {
                    verification: hash
                }}, null);
            });  
            return true;
        }
        else
            return false;
    }
    else
        return false;
}

module.exports.updateForgetPassword = async (iduser, body) => {

    const user = await db().collection('user').findOne({_id: ObjectId(iduser)});

    if(!user)
        return false;

    let newpassword;
    let confirm;
    
    if(body.newpassword)
        newpassword = body.newpassword;
    else
        return false;

    if(body.confirm)
        confirm = body.confirm;
    else
        return false;
    
    if(newpassword !== confirm)
        return false;

    await bcrypt.hash(newpassword, saltRounds, async function(err, hash) {
        await db().collection('user').updateOne( {_id: ObjectId(user._id)} ,{$set: {
            password: hash
        }}, null);
    });
    
    return true;
}