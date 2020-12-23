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

module.exports.info = async () =>
{
    const info = await db().collection('user').find().toArray();
    return info[0];
}

module.exports.change = async (body, file, id) => {
    const user = await db().collection('user').find({_id: ObjectId(id)}).toArray();

    let fullname;
    let avatar;
    let email;
    let password;
 
    if(body.fullname !== "")
        fullname = body.fullname;
    else
        fullname = user[0].fullname;

    
    if(body.email !== "")
        email = body.email;
    else
        email = user[0].email;

    if(body.password !== "")
        password = body.password;
    else
        password = user[0].password;

       
    let source = null;
    if (file) {
        const destroyPromise = destroyFiles(user[0].avatar);
        const new_source = await uploadFiles(file);
        await destroyPromise;
        source = new_source;
    }

    await db().collection('user').updateOne( {_id: ObjectId(id)} ,{$set: {
        fullname: fullname, 
        email: email,
        avatar: source ? source : user[0].avatar, 
        password: password, 
    }}, null);
}

const uploadFiles = async (file) => {
    let source;
    
    const uploaded = await cloudinary.upload(file.tempFilePath);
    source = uploaded;
    fs.unlinkSync(file.tempFilePath);
    

    return source;
}

const destroyFiles = async (source) => {
    cloudinary.destroy(source.id);
}