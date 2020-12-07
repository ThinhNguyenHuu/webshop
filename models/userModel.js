const {db} = require('../db');
const cloudinary = require('../cloudinary');
const fs = require('fs');
const ObjectId = require('mongodb').ObjectID;


module.exports.info = async () =>
{
    const info = await db().collection('user').find().toArray();
    console.log(info);
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