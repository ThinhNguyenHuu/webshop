const fs = require('fs');
const ObjectId = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');

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

    if(body.username)
        username = body.username;
    else
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
    
    await bcrypt.hash(password, saltRounds, async function(err, hash) {
        await db().collection('user').insertOne( {
            fullname: fullname, 
            email: email,
            username: username, 
            password: hash,
            ban: false, 
            avatar: null,
        })
    });

    return true;
    
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
        const match = await bcrypt.compare(password, user.password);
        if(match)
            return user;
        else
            return false;
    }
    else
        return false;
}

module.exports.findUser = async (id) =>
{
    const user = await db().collection('user').findOne({_id: ObjectId(id)});
    return user;
}