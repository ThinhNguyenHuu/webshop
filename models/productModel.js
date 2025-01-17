const { ObjectId } = require('mongodb');
const {db} = require('../db');
const cache = require('../lru-cache');


module.exports.list = async (pageIndex, product_per_page, sort, filter) =>  
{
  let page = +pageIndex || 1;
  const numProduct = +product_per_page || 9;

  const sortby = sort ? sort : "Vị trí";

  let count;
  let list;
  let totalPage;

  const key = ['listProduct', page, numProduct, sortby, filter].join('/');
  let value =  await cache.get(key);

  if(value)
  {
    list = value.list;
    totalPage = value.totalPage;
  }
  else
  {
    if(sortby === "Vị trí")
    {
      switch(filter)
      {
        case "1":
        {
          try{
            count = await db().collection('product').find({price: {$lte: 5000000}}).count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
        
          try{
            list = await db().collection('product').find({price: {$lte: 5000000}}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
            catch { list = [];}
        }
        break;
        case "2":
        {
          try{
            count = await db().collection('product').find({price: {$gt: 5000000}}).count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
          try{
            list = await db().collection('product').find({price: {$gt: 5000000}}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
            catch { list = [];}
        }
        break;
        case "3":
        {
          try{
            count = await db().collection('product').find({discount: {$lte: 10}}).count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
          try{
            list = await db().collection('product').find({discount: {$lte: 10}}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
            catch { list = [];}
        }
        break;
        case "4":
        {
          try{
            count = await db().collection('product').find({discount: {$gt: 10, $lte: 20}}).count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
          try{
            list = await db().collection('product').find({discount: {$gt: 10, $lte: 20}}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
            catch { list = [];}
        }
        break;
        case "5":
        {
          try{
            count = await db().collection('product').find({discount: {$gt: 20}}).count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
          try{
            list = await db().collection('product').find({discount: {$gt: 20}}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
            catch { list = [];}
        }
        break;
        default:
        {
          try{
            count = await db().collection('product').find().count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
          try{
            list = await db().collection('product').find().limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
            catch { list = [];}
        }
        break;
      }
    }
    else if (sortby == "Tên")
    {
      switch(filter)
      {
        case "1":
        {
          try{
            count = await db().collection('product').find({price: {$lte: 5000000}}).count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
        
          try{
            list = await db().collection('product').find({price: {$lte: 5000000}}).sort({name: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
            catch { list = [];}
        }
        break;
        case "2":
        {
          try{
            count = await db().collection('product').find({price: {$gt: 5000000}}).count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
          try{
            list = await db().collection('product').find({price: {$gt: 5000000}}).sort({name: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
            catch { list = [];}
        }
        break;
        case "3":
        {
          try{
            count = await db().collection('product').find({discount: {$lte: 10}}).count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
          try{
            list = await db().collection('product').find({discount: {$lte: 10}}).sort({name: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
            catch { list = [];}
        }
        break;
        case "4":
        {
          try{
            count = await db().collection('product').find({discount: {$gt: 10, $lte: 20}}).count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
          try{
            list = await db().collection('product').find({discount: {$gt: 10, $lte: 20}}).sort({name: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
            catch { list = [];}
        }
        break;
        case "5":
        {
          try{
            count = await db().collection('product').find({discount: {$gt: 20}}).count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
          try{
            list = await db().collection('product').find({discount: {$gt: 20}}).sort({name: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
            catch { list = [];}
        }
        break;
        default:
        {
          try{
            count = await db().collection('product').find().count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
          try{
            list = await db().collection('product').find().sort({name: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
            catch { list = [];}
        }
        break;
      }
    }
    else if(sortby == "Giá")
    {
      switch(filter)
      {
        case "1":
        {
          try{
            count = await db().collection('product').find({price: {$lte: 5000000}}).count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
        
          try{
            list = await db().collection('product').find({price: {$lte: 5000000}}).sort({price: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
            catch { list = [];}
        }
        break;
        case "2":
        {
          try{
            count = await db().collection('product').find({price: {$gt: 5000000}}).count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
          try{
            list = await db().collection('product').find({price: {$gt: 5000000}}).sort({price: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
            catch { list = [];}
        }
        break;
        case "3":
        {
          try{
            count = await db().collection('product').find({discount: {$lte: 10}}).count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
          try{
            list = await db().collection('product').find({discount: {$lte: 10}}).sort({price: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
            catch { list = [];}
        }
        break;
        case "4":
        {
          try{
            count = await db().collection('product').find({discount: {$gt: 10, $lte: 20}}).count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
          try{
            list = await db().collection('product').find({discount: {$gt: 10, $lte: 20}}).sort({price: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
            catch { list = [];}
        }
        break;
        case "5":
        {
          try{
            count = await db().collection('product').find({discount: {$gt: 20}}).count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
          try{
            list = await db().collection('product').find({discount: {$gt: 20}}).sort({price: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
            catch { list = [];}
        }
        break;
        default:
        {
          try{
            count = await db().collection('product').find().count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
          try{
            list = await db().collection('product').find().sort({price: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
            catch { list = [];}
        }
        break;
      }
    }

    const data = {list, totalPage};
    await cache.set(key, data);
  }

  const nextPage = (page + 1) > totalPage ? 0 : page + 1;
  const afterNextPage = (page + 2) > totalPage ? 0 : page + 2;

  const prePage = (page - 1) <= 0 ? 0 : page - 1;
  const beforePrePage = (page - 2) <= 0  ? 0 : page - 2;

  return {list: list, currentPage: page, nextPage: nextPage, afterNextPage: afterNextPage, prePage: prePage, beforePrePage: beforePrePage};
}

module.exports.listClassifiedProduct = async (category_brand, pageIndex, product_per_page, sort, filter) =>
{
  let category = "";
  let brand = "";

  const sortby = sort ? sort : "Vị trí";

  let page = +pageIndex || 1;
  const numProduct = +product_per_page || 9;

  let totalPage;
  let count;
  let list;

  const key = ['listClassifiedProduct', category_brand, page, numProduct, sortby, filter].join('/');
  let value =  await cache.get(key);

  if(value)
  {
    list = value.list;
    totalPage = value.totalPage;
  }
  else
  {
    const temp = category_brand.indexOf("_");

    if(temp === -1)
    {
      const listCategory = await db().collection('category').find({name: category_brand}).toArray();

      if(sortby === "Vị trí")
      {
        switch(filter)
        {
          case "1":
          {
            try{
              count = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id)}, {price: {$lte: 5000000}}]}).count();
            }
            catch{count =  0;}
          
            totalPage = Math.ceil(count / numProduct);
          
            page = (page <= 0) ? 1 : page;
            page = (page > totalPage) ? totalPage : page;
          
            try{
              list = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id)}, {price: {$lte: 5000000}}]}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
            }
              catch { list = [];}
          }
          break;
          case "2":
          {
            try{
              count = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id)}, {price: {$gt: 5000000}}]}).count();
            }
            catch{count =  0;}
          
            totalPage = Math.ceil(count / numProduct);
          
            page = (page <= 0) ? 1 : page;
            page = (page > totalPage) ? totalPage : page;
            try{
              list = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id)}, {price: {$gt: 5000000}}]}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
            }
              catch { list = [];}
          }
          break;
          case "3":
          {
            try{
              count = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id)}, {discount: {$lte: 10}}]}).count();
            }
            catch{count =  0;}
          
            totalPage = Math.ceil(count / numProduct);
          
            page = (page <= 0) ? 1 : page;
            page = (page > totalPage) ? totalPage : page;
            try{
              list = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id)}, {discount: {$lte: 10}}]}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
            }
              catch { list = [];}
          }
          break;
          case "4":
          {
            try{
              count = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id)}, {discount: {$gt: 10, $lte: 20}}]}).count();
            }
            catch{count =  0;}
          
            totalPage = Math.ceil(count / numProduct);
          
            page = (page <= 0) ? 1 : page;
            page = (page > totalPage) ? totalPage : page;
            try{
              list = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id)}, {discount: {$gt: 10, $lte: 20}}]}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
            }
              catch { list = [];}
          }
          break;
          case "5":
          {
            try{
              count = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id)}, {discount: {$gt: 20}}]}).count();
            }
            catch{count =  0;}
          
            totalPage = Math.ceil(count / numProduct);
          
            page = (page <= 0) ? 1 : page;
            page = (page > totalPage) ? totalPage : page;
            try{
              list = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id)}, {discount: {$gt: 20}}]}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
            }
              catch { list = [];}
          }
          break;
          default:
          {
            try{
              count = await db().collection('product').find({category: ObjectId(listCategory[0]._id)}).count();
            }
            catch{count =  0;}
          
            totalPage = Math.ceil(count / numProduct);
          
            page = (page <= 0) ? 1 : page;
            page = (page > totalPage) ? totalPage : page;
            try{
              list = await db().collection('product').find({category: ObjectId(listCategory[0]._id)}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
            }
              catch { list = [];}
          }
          break;
        }
      }
      else if(sortby === "Tên")
      {
        switch(filter)
        {
          case "1":
          {
            try{
              count = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id)}, {price: {$lte: 5000000}}]}).count();
            }
            catch{count =  0;}
          
            totalPage = Math.ceil(count / numProduct);
          
            page = (page <= 0) ? 1 : page;
            page = (page > totalPage) ? totalPage : page;
          
            try{
              list = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id)}, {price: {$lte: 5000000}}]}).sort({name: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
            }
              catch { list = [];}
          }
          break;
          case "2":
          {
            try{
              count = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id)}, {price: {$gt: 5000000}}]}).count();
            }
            catch{count =  0;}
          
            totalPage = Math.ceil(count / numProduct);
          
            page = (page <= 0) ? 1 : page;
            page = (page > totalPage) ? totalPage : page;
            try{
              list = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id)}, {price: {$gt: 5000000}}]}).sort({name: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
            }
              catch { list = [];}
          }
          break;
          case "3":
          {
            try{
              count = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id)}, {discount: {$lte: 10}}]}).count();
            }
            catch{count =  0;}
          
            totalPage = Math.ceil(count / numProduct);
          
            page = (page <= 0) ? 1 : page;
            page = (page > totalPage) ? totalPage : page;
            try{
              list = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id)}, {discount: {$lte: 10}}]}).sort({name: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
            }
              catch { list = [];}
          }
          break;
          case "4":
          {
            try{
              count = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id)}, {discount: {$gt: 10, $lte: 20}}]}).count();
            }
            catch{count =  0;}
          
            totalPage = Math.ceil(count / numProduct);
          
            page = (page <= 0) ? 1 : page;
            page = (page > totalPage) ? totalPage : page;
            try{
              list = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id)}, {discount: {$gt: 10, $lte: 20}}]}).sort({name: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
            }
              catch { list = [];}
          }
          break;
          case "5":
          {
            try{
              count = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id)}, {discount: {$gt: 20}}]}).count();
            }
            catch{count =  0;}
          
            totalPage = Math.ceil(count / numProduct);
          
            page = (page <= 0) ? 1 : page;
            page = (page > totalPage) ? totalPage : page;
            try{
              list = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id)}, {discount: {$gt: 20}}]}).sort({name: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
            }
              catch { list = [];}
          }
          break;
          default:
          {
            try{
              count = await db().collection('product').find({category: ObjectId(listCategory[0]._id)}).count();
            }
            catch{count =  0;}
          
            totalPage = Math.ceil(count / numProduct);
          
            page = (page <= 0) ? 1 : page;
            page = (page > totalPage) ? totalPage : page;
            try{
              list = await db().collection('product').find({category: ObjectId(listCategory[0]._id)}).sort({name: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
            }
              catch { list = [];}
          }
          break;
        }
      }
      else if(sortby === "Giá")
      {
        switch(filter)
        {
          case "1":
          {
            try{
              count = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id)}, {price: {$lte: 5000000}}]}).count();
            }
            catch{count =  0;}
          
            totalPage = Math.ceil(count / numProduct);
          
            page = (page <= 0) ? 1 : page;
            page = (page > totalPage) ? totalPage : page;
          
            try{
              list = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id)}, {price: {$lte: 5000000}}]}).sort({price: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
            }
              catch { list = [];}
          }
          break;
          case "2":
          {
            try{
              count = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id)}, {price: {$gt: 5000000}}]}).count();
            }
            catch{count =  0;}
          
            totalPage = Math.ceil(count / numProduct);
          
            page = (page <= 0) ? 1 : page;
            page = (page > totalPage) ? totalPage : page;
            try{
              list = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id)}, {price: {$gt: 5000000}}]}).sort({price: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
            }
              catch { list = [];}
          }
          break;
          case "3":
          {
            try{
              count = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id)}, {discount: {$lte: 10}}]}).count();
            }
            catch{count =  0;}
          
            totalPage = Math.ceil(count / numProduct);
          
            page = (page <= 0) ? 1 : page;
            page = (page > totalPage) ? totalPage : page;
            try{
              list = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id)}, {discount: {$lte: 10}}]}).sort({price: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
            }
              catch { list = [];}
          }
          break;
          case "4":
          {
            try{
              count = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id)}, {discount: {$gt: 10, $lte: 20}}]}).count();
            }
            catch{count =  0;}
          
            totalPage = Math.ceil(count / numProduct);
          
            page = (page <= 0) ? 1 : page;
            page = (page > totalPage) ? totalPage : page;
            try{
              list = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id)}, {discount: {$gt: 10, $lte: 20}}]}).sort({price: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
            }
              catch { list = [];}
          }
          break;
          case "5":
          {
            try{
              count = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id)}, {discount: {$gt: 20}}]}).count();
            }
            catch{count =  0;}
          
            totalPage = Math.ceil(count / numProduct);
          
            page = (page <= 0) ? 1 : page;
            page = (page > totalPage) ? totalPage : page;
            try{
              list = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id)}, {discount: {$gt: 20}}]}).sort({price: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
            }
              catch { list = [];}
          }
          break;
          default:
          {
            try{
              count = await db().collection('product').find({category: ObjectId(listCategory[0]._id)}).count();
            }
            catch{count =  0;}
          
            totalPage = Math.ceil(count / numProduct);
          
            page = (page <= 0) ? 1 : page;
            page = (page > totalPage) ? totalPage : page;
            try{
              list = await db().collection('product').find({category: ObjectId(listCategory[0]._id)}).sort({price: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
            }
              catch { list = [];}
          }
          break;
        }
      }

    }
    else
    {
      for(let i = 0; i < temp; i++)
        category = category + category_brand.charAt(i);
      for(let i = temp + 1; i < category_brand.length; i++)
        brand = brand + category_brand.charAt(i);

      const listCategory = await db().collection('category').find({name: category}).toArray();
      const listBrand = await db().collection('brand').find({name: brand}).toArray();

      if(sortby === "Vị trí")
      {
        switch(filter)
        {
          case "1":
          {
            try{
              count = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id), brand: ObjectId(listBrand[0]._id)}, {price: {$lte: 5000000}}]}).count();
            }
            catch{count =  0;}
          
            totalPage = Math.ceil(count / numProduct);
          
            page = (page <= 0) ? 1 : page;
            page = (page > totalPage) ? totalPage : page;
          
            try{
              list = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id), brand: ObjectId(listBrand[0]._id)}, {price: {$lte: 5000000}}]}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
            }
              catch { list = [];}
          }
          break;
          case "2":
          {
            try{
              count = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id), brand: ObjectId(listBrand[0]._id)}, {price: {$gt: 5000000}}]}).count();
            }
            catch{count =  0;}
          
            totalPage = Math.ceil(count / numProduct);
          
            page = (page <= 0) ? 1 : page;
            page = (page > totalPage) ? totalPage : page;
            try{
              list = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id), brand: ObjectId(listBrand[0]._id)}, {price: {$gt: 5000000}}]}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
            }
              catch { list = [];}
          }
          break;
          case "3":
          {
            try{
              count = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id), brand: ObjectId(listBrand[0]._id)}, {discount: {$lte: 10}}]}).count();
            }
            catch{count =  0;}
          
            totalPage = Math.ceil(count / numProduct);
          
            page = (page <= 0) ? 1 : page;
            page = (page > totalPage) ? totalPage : page;
            try{
              list = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id), brand: ObjectId(listBrand[0]._id)}, {discount: {$lte: 10}}]}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
            }
              catch { list = [];}
          }
          break;
          case "4":
          {
            try{
              count = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id), brand: ObjectId(listBrand[0]._id)}, {discount: {$gt: 10, $lte: 20}}]}).count();
            }
            catch{count =  0;}
          
            totalPage = Math.ceil(count / numProduct);
          
            page = (page <= 0) ? 1 : page;
            page = (page > totalPage) ? totalPage : page;
            try{
              list = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id), brand: ObjectId(listBrand[0]._id)}, {discount: {$gt: 10, $lte: 20}}]}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
            }
              catch { list = [];}
          }
          break;
          case "5":
          {
            try{
              count = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id), brand: ObjectId(listBrand[0]._id)}, {discount: {$gt: 20}}]}).count();
            }
            catch{count =  0;}
          
            totalPage = Math.ceil(count / numProduct);
          
            page = (page <= 0) ? 1 : page;
            page = (page > totalPage) ? totalPage : page;
            try{
              list = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id), brand: ObjectId(listBrand[0]._id)}, {discount: {$gt: 20}}]}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
            }
              catch { list = [];}
          }
          break;
          default:
          {
            try{
              count = await db().collection('product').find({category: ObjectId(listCategory[0]._id), brand: ObjectId(listBrand[0]._id)}).count();
            }
            catch{count =  0;}
          
            totalPage = Math.ceil(count / numProduct);
          
            page = (page <= 0) ? 1 : page;
            page = (page > totalPage) ? totalPage : page;
            try{
              list = await db().collection('product').find({category: ObjectId(listCategory[0]._id), brand: ObjectId(listBrand[0]._id)}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
            }
              catch { list = [];}
          }
          break;
        }
      }
      else if(sortby === "Tên")
      {
        switch(filter)
        {
          case "1":
          {
            try{
              count = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id), brand: ObjectId(listBrand[0]._id)}, {price: {$lte: 5000000}}]}).count();
            }
            catch{count =  0;}
          
            totalPage = Math.ceil(count / numProduct);
          
            page = (page <= 0) ? 1 : page;
            page = (page > totalPage) ? totalPage : page;
          
            try{
              list = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id), brand: ObjectId(listBrand[0]._id)}, {price: {$lte: 5000000}}]}).sort({name: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
            }
              catch { list = [];}
          }
          break;
          case "2":
          {
            try{
              count = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id), brand: ObjectId(listBrand[0]._id)}, {price: {$gt: 5000000}}]}).count();
            }
            catch{count =  0;}
          
            totalPage = Math.ceil(count / numProduct);
          
            page = (page <= 0) ? 1 : page;
            page = (page > totalPage) ? totalPage : page;
            try{
              list = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id), brand: ObjectId(listBrand[0]._id)}, {price: {$gt: 5000000}}]}).sort({name: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
            }
              catch { list = [];}
          }
          break;
          case "3":
          {
            try{
              count = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id), brand: ObjectId(listBrand[0]._id)}, {discount: {$lte: 10}}]}).count();
            }
            catch{count =  0;}
          
            totalPage = Math.ceil(count / numProduct);
          
            page = (page <= 0) ? 1 : page;
            page = (page > totalPage) ? totalPage : page;
            try{
              list = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id), brand: ObjectId(listBrand[0]._id)}, {discount: {$lte: 10}}]}).sort({name: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
            }
              catch { list = [];}
          }
          break;
          case "4":
          {
            try{
              count = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id), brand: ObjectId(listBrand[0]._id)}, {discount: {$gt: 10, $lte: 20}}]}).count();
            }
            catch{count =  0;}
          
            totalPage = Math.ceil(count / numProduct);
          
            page = (page <= 0) ? 1 : page;
            page = (page > totalPage) ? totalPage : page;
            try{
              list = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id), brand: ObjectId(listBrand[0]._id)}, {discount: {$gt: 10, $lte: 20}}]}).sort({name: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
            }
              catch { list = [];}
          }
          break;
          case "5":
          {
            try{
              count = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id), brand: ObjectId(listBrand[0]._id)}, {discount: {$gt: 20}}]}).count();
            }
            catch{count =  0;}
          
            totalPage = Math.ceil(count / numProduct);
          
            page = (page <= 0) ? 1 : page;
            page = (page > totalPage) ? totalPage : page;
            try{
              list = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id), brand: ObjectId(listBrand[0]._id)}, {discount: {$gt: 20}}]}).sort({name: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
            }
              catch { list = [];}
          }
          break;
          default:
          {
            try{
              count = await db().collection('product').find({category: ObjectId(listCategory[0]._id), brand: ObjectId(listBrand[0]._id)}).count();
            }
            catch{count =  0;}
          
            totalPage = Math.ceil(count / numProduct);
          
            page = (page <= 0) ? 1 : page;
            page = (page > totalPage) ? totalPage : page;
            try{
              list = await db().collection('product').find({category: ObjectId(listCategory[0]._id), brand: ObjectId(listBrand[0]._id)}).sort({name: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
            }
              catch { list = [];}
          }
          break;
        }
      }
      else if(sortby === "Giá")
      {
        switch(filter)
        {
          case "1":
          {
            try{
              count = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id), brand: ObjectId(listBrand[0]._id)}, {price: {$lte: 5000000}}]}).count();
            }
            catch{count =  0;}
          
            totalPage = Math.ceil(count / numProduct);
          
            page = (page <= 0) ? 1 : page;
            page = (page > totalPage) ? totalPage : page;
          
            try{
              list = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id), brand: ObjectId(listBrand[0]._id)}, {price: {$lte: 5000000}}]}).sort({price: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
            }
              catch { list = [];}
          }
          break;
          case "2":
          {
            try{
              count = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id), brand: ObjectId(listBrand[0]._id)}, {price: {$gt: 5000000}}]}).count();
            }
            catch{count =  0;}
          
            totalPage = Math.ceil(count / numProduct);
          
            page = (page <= 0) ? 1 : page;
            page = (page > totalPage) ? totalPage : page;
            try{
              list = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id), brand: ObjectId(listBrand[0]._id)}, {price: {$gt: 5000000}}]}).sort({price: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
            }
              catch { list = [];}
          }
          break;
          case "3":
          {
            try{
              count = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id), brand: ObjectId(listBrand[0]._id)}, {discount: {$lte: 10}}]}).count();
            }
            catch{count =  0;}
          
            totalPage = Math.ceil(count / numProduct);
          
            page = (page <= 0) ? 1 : page;
            page = (page > totalPage) ? totalPage : page;
            try{
              list = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id), brand: ObjectId(listBrand[0]._id)}, {discount: {$lte: 10}}]}).sort({price: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
            }
              catch { list = [];}
          }
          break;
          case "4":
          {
            try{
              count = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id), brand: ObjectId(listBrand[0]._id)}, {discount: {$gt: 10, $lte: 20}}]}).count();
            }
            catch{count =  0;}
          
            totalPage = Math.ceil(count / numProduct);
          
            page = (page <= 0) ? 1 : page;
            page = (page > totalPage) ? totalPage : page;
            try{
              list = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id), brand: ObjectId(listBrand[0]._id)}, {discount: {$gt: 10, $lte: 20}}]}).sort({price: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
            }
              catch { list = [];}
          }
          break;
          case "5":
          {
            try{
              count = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id), brand: ObjectId(listBrand[0]._id)}, {discount: {$gt: 20}}]}).count();
            }
            catch{count =  0;}
          
            totalPage = Math.ceil(count / numProduct);
          
            page = (page <= 0) ? 1 : page;
            page = (page > totalPage) ? totalPage : page;
            try{
              list = await db().collection('product').find({$and: [{category: ObjectId(listCategory[0]._id), brand: ObjectId(listBrand[0]._id)}, {discount: {$gt: 20}}]}).sort({price: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
            }
              catch { list = [];}
          }
          break;
          default:
          {
            try{
              count = await db().collection('product').find({category: ObjectId(listCategory[0]._id), brand: ObjectId(listBrand[0]._id)}).count();
            }
            catch{count =  0;}
          
            totalPage = Math.ceil(count / numProduct);
          
            page = (page <= 0) ? 1 : page;
            page = (page > totalPage) ? totalPage : page;
            try{
              list = await db().collection('product').find({category: ObjectId(listCategory[0]._id), brand: ObjectId(listBrand[0]._id)}).sort({price: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
            }
              catch { list = [];}
          }
          break;
        }
      }
    }

    const data = {list, totalPage};
    await cache.set(key, data);
  }

  const nextPage = (page + 1) > totalPage ? 0 : page + 1;
  const afterNextPage = (page + 2) > totalPage ? 0 : page + 2;

  const prePage = (page - 1) <= 0 ? 0 : page - 1;
  const beforePrePage = (page - 2) <= 0  ? 0 : page - 2;

  return {list: list, currentPage: page, nextPage: nextPage, afterNextPage: afterNextPage, prePage: prePage, beforePrePage: beforePrePage};
}

module.exports.listSearchedProduct = async (pageIndex, product_per_page, search, sort, filter) =>  
{
  let page = +pageIndex || 1;
  const numProduct = +product_per_page || 9;

  const sortby = sort ? sort : "Vị trí";

  let count;
  let totalPage;
  let list;

  const key = ['listSearchedProduct', page, numProduct, search, sortby, filter].join('/');
  let value =  await cache.get(key);

  if(value)
  {
    list = value.list;
    totalPage = value.totalPage;
  }
  else
  {
    if(sortby === "Vị trí")
    {
      switch(filter)
      {
        case "1":
        {
          try{
            count = await db().collection('product').find({$and: [{$or:[
                                                                        { $text: { $search: search } },
                                                                        { name: { $regex: search, $options: 'i' } }
                                                                      ]}, {price: {$lte: 5000000}}]}).count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
        
          try{
            list = await db().collection('product').find({$and: [{$or:[
                                                                  { $text: { $search: search } },
                                                                  { name: { $regex: search, $options: 'i' } }
                                                                ]}, {price: {$lte: 5000000}}]}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
          catch { list = [];}
        }
        break;
        case "2":
        {
          try{
            count = await db().collection('product').find({$and: [{$or:[
                                                                  { $text: { $search: search } },
                                                                  { name: { $regex: search, $options: 'i' } }
                                                                ]}, {price: {$gt: 5000000}}]}).count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
          try{
            list = await db().collection('product').find({$and: [{$or:[
                                                                  { $text: { $search: search } },
                                                                  { name: { $regex: search, $options: 'i' } }
                                                                ]}, {price: {$gt: 5000000}}]}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
            catch { list = [];}
        }
        break;
        case "3":
        {
          try{
            count = await db().collection('product').find({$and: [{$or:[
                                                                  { $text: { $search: search } },
                                                                  { name: { $regex: search, $options: 'i' } }
                                                                ]}, {discount: {$lte: 10}}]}).count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
          try{
            list = await db().collection('product').find({$and: [{$or:[
                                                                  { $text: { $search: search } },
                                                                  { name: { $regex: search, $options: 'i' } }
                                                                ]}, {discount: {$lte: 10}}]}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
            catch { list = [];}
        }
        break;
        case "4":
        {
          try{
            count = await db().collection('product').find({$and: [{$or:[
                                                                  { $text: { $search: search } },
                                                                  { name: { $regex: search, $options: 'i' } }
                                                                ]}, {discount: {$gt: 10, $lte: 20}}]}).count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
          try{
            list = await db().collection('product').find({$and: [{$or:[
                                                          { $text: { $search: search } },
                                                          { name: { $regex: search, $options: 'i' } }
                                                        ]}, {discount: {$gt: 10, $lte: 20}}]}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
            catch { list = [];}
        }
        break;
        case "5":
        {
          try{
            count = await db().collection('product').find({$and: [{$or:[
                                                                  { $text: { $search: search } },
                                                                  { name: { $regex: search, $options: 'i' } }
                                                                ]}, {discount: {$gt: 20}}]}).count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
          try{
            list = await db().collection('product').find({$and: [{$or:[
                                                                  { $text: { $search: search } },
                                                                  { name: { $regex: search, $options: 'i' } }
                                                                ]}, {discount: {$gt: 20}}]}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
            catch { list = [];}
        }
        break;
        default:
        {
          try{
            count = await db().collection('product').find({$or:[
                                                          { $text: { $search: search } },
                                                          { name: { $regex: search, $options: 'i' } }
                                                        ]}).count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
          try{
            list = await db().collection('product').find({$or:[
                                                          { $text: { $search: search } },
                                                          { name: { $regex: search, $options: 'i' } }
                                                        ]}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
            catch { list = [];}
        }
        break;
      }
    }
    else if(sortby === "Tên")
    {
      switch(filter)
      {
        case "1":
        {
          try{
            count = await db().collection('product').find({$and: [{$or:[
                                                                        { $text: { $search: search } },
                                                                        { name: { $regex: search, $options: 'i' } }
                                                                      ]}, {price: {$lte: 5000000}}]}).count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
        
          try{
            list = await db().collection('product').find({$and: [{$or:[
                                                                  { $text: { $search: search } },
                                                                  { name: { $regex: search, $options: 'i' } }
                                                                ]}, {price: {$lte: 5000000}}]}).sort({name: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
          catch { list = [];}
        }
        break;
        case "2":
        {
          try{
            count = await db().collection('product').find({$and: [{$or:[
                                                                  { $text: { $search: search } },
                                                                  { name: { $regex: search, $options: 'i' } }
                                                                ]}, {price: {$gt: 5000000}}]}).count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
          try{
            list = await db().collection('product').find({$and: [{$or:[
                                                                  { $text: { $search: search } },
                                                                  { name: { $regex: search, $options: 'i' } }
                                                                ]}, {price: {$gt: 5000000}}]}).sort({name: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
            catch { list = [];}
        }
        break;
        case "3":
        {
          try{
            count = await db().collection('product').find({$and: [{$or:[
                                                                  { $text: { $search: search } },
                                                                  { name: { $regex: search, $options: 'i' } }
                                                                ]}, {discount: {$lte: 10}}]}).count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
          try{
            list = await db().collection('product').find({$and: [{$or:[
                                                                  { $text: { $search: search } },
                                                                  { name: { $regex: search, $options: 'i' } }
                                                                ]}, {discount: {$lte: 10}}]}).sort({name: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
            catch { list = [];}
        }
        break;
        case "4":
        {
          try{
            count = await db().collection('product').find({$and: [{$or:[
                                                                  { $text: { $search: search } },
                                                                  { name: { $regex: search, $options: 'i' } }
                                                                ]}, {discount: {$gt: 10, $lte: 20}}]}).count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
          try{
            list = await db().collection('product').find({$and: [{$or:[
                                                          { $text: { $search: search } },
                                                          { name: { $regex: search, $options: 'i' } }
                                                        ]}, {discount: {$gt: 10, $lte: 20}}]}).sort({name: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
            catch { list = [];}
        }
        break;
        case "5":
        {
          try{
            count = await db().collection('product').find({$and: [{$or:[
                                                                  { $text: { $search: search } },
                                                                  { name: { $regex: search, $options: 'i' } }
                                                                ]}, {discount: {$gt: 20}}]}).count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
          try{
            list = await db().collection('product').find({$and: [{$or:[
                                                                  { $text: { $search: search } },
                                                                  { name: { $regex: search, $options: 'i' } }
                                                                ]}, {discount: {$gt: 20}}]}).sort({name: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
            catch { list = [];}
        }
        break;
        default:
        {
          try{
            count = await db().collection('product').find({$or:[
                                                          { $text: { $search: search } },
                                                          { name: { $regex: search, $options: 'i' } }
                                                        ]}).count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
          try{
            list = await db().collection('product').find({$or:[
                                                          { $text: { $search: search } },
                                                          { name: { $regex: search, $options: 'i' } }
                                                        ]}).sort({name: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
            catch { list = [];}
        }
        break;
      }
    }
    else if(sortby === "Giá")
    {
      switch(filter)
      {
        case "1":
        {
          try{
            count = await db().collection('product').find({$and: [{$or:[
                                                                        { $text: { $search: search } },
                                                                        { name: { $regex: search, $options: 'i' } }
                                                                      ]}, {price: {$lte: 5000000}}]}).count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
        
          try{
            list = await db().collection('product').find({$and: [{$or:[
                                                                  { $text: { $search: search } },
                                                                  { name: { $regex: search, $options: 'i' } }
                                                                ]}, {price: {$lte: 5000000}}]}).sort({price: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
          catch { list = [];}
        }
        break;
        case "2":
        {
          try{
            count = await db().collection('product').find({$and: [{$or:[
                                                                  { $text: { $search: search } },
                                                                  { name: { $regex: search, $options: 'i' } }
                                                                ]}, {price: {$gt: 5000000}}]}).count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
          try{
            list = await db().collection('product').find({$and: [{$or:[
                                                                  { $text: { $search: search } },
                                                                  { name: { $regex: search, $options: 'i' } }
                                                                ]}, {price: {$gt: 5000000}}]}).sort({price: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
            catch { list = [];}
        }
        break;
        case "3":
        {
          try{
            count = await db().collection('product').find({$and: [{$or:[
                                                                  { $text: { $search: search } },
                                                                  { name: { $regex: search, $options: 'i' } }
                                                                ]}, {discount: {$lte: 10}}]}).count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
          try{
            list = await db().collection('product').find({$and: [{$or:[
                                                                  { $text: { $search: search } },
                                                                  { name: { $regex: search, $options: 'i' } }
                                                                ]}, {discount: {$lte: 10}}]}).sort({price: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
            catch { list = [];}
        }
        break;
        case "4":
        {
          try{
            count = await db().collection('product').find({$and: [{$or:[
                                                                  { $text: { $search: search } },
                                                                  { name: { $regex: search, $options: 'i' } }
                                                                ]}, {discount: {$gt: 10, $lte: 20}}]}).count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
          try{
            list = await db().collection('product').find({$and: [{$or:[
                                                          { $text: { $search: search } },
                                                          { name: { $regex: search, $options: 'i' } }
                                                        ]}, {discount: {$gt: 10, $lte: 20}}]}).sort({price: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
            catch { list = [];}
        }
        break;
        case "5":
        {
          try{
            count = await db().collection('product').find({$and: [{$or:[
                                                                  { $text: { $search: search } },
                                                                  { name: { $regex: search, $options: 'i' } }
                                                                ]}, {discount: {$gt: 20}}]}).count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
          try{
            list = await db().collection('product').find({$and: [{$or:[
                                                                  { $text: { $search: search } },
                                                                  { name: { $regex: search, $options: 'i' } }
                                                                ]}, {discount: {$gt: 20}}]}).sort({price: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
            catch { list = [];}
        }
        break;
        default:
        {
          try{
            count = await db().collection('product').find({$or:[
                                                          { $text: { $search: search } },
                                                          { name: { $regex: search, $options: 'i' } }
                                                        ]}).count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
          try{
            list = await db().collection('product').find({$or:[
                                                          { $text: { $search: search } },
                                                          { name: { $regex: search, $options: 'i' } }
                                                        ]}).sort({price: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
            catch { list = [];}
        }
        break;
      }
    }

    const data = {list, totalPage};
    await cache.set(key, data);
  }


  const nextPage = (page + 1) > totalPage ? 0 : page + 1;
  const afterNextPage = (page + 2) > totalPage ? 0 : page + 2;

  const prePage = (page - 1) <= 0 ? 0 : page - 1;
  const beforePrePage = (page - 2) <= 0  ? 0 : page - 2;

  return {list: list, currentPage: page, nextPage: nextPage, afterNextPage: afterNextPage, prePage: prePage, beforePrePage: beforePrePage};
}

module.exports.listAdvancedSearchedProduct = async (pageIndex, product_per_page, sort, name, category, brand, price) =>  
{
  
  let page = +pageIndex || 1;
  const numProduct = +product_per_page || 9;

  const sortby = sort ? sort : "Vị trí";

  let count;
  let totalPage;
  let list;

  const key = ['listAdvancedSearchedProduct', page, numProduct, sortby, name, category, brand, price].join('/');
  let value =  await cache.get(key);

  if(value)
  {
    list = value.list;
    totalPage = value.totalPage;
  }
  else
  {
  
    if(sortby === "Vị trí")
    {
      switch(price)
      {
        case "1":
        {
          try{
            count = await db().collection('product').find({$and: [{$or:[
                                                                        { $text: { $search: name } },
                                                                        { name: { $regex: name, $options: 'i' } }
                                                                      ]}, 
                                                                      {price: {$lte: 5000000}},
                                                                      {category: ObjectId(category),brand: ObjectId(brand)}]}).count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
        
          try{
            list = await db().collection('product').find({$and: [{$or:[
                                                                        { $text: { $search: name } },
                                                                        { name: { $regex: name, $options: 'i' } }
                                                                      ]}, 
                                                                      {price: {$lte: 5000000}},
                                                                      {category: ObjectId(category),brand: ObjectId(brand)}]}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
          catch { list = [];}
        }
        break;
        case "2":
        {
          try{
            count = await db().collection('product').find({$and: [{$or:[
                                                                  { $text: { $search: name } },
                                                                  { name: { $regex: name, $options: 'i' } }
                                                                ]},
                                                                {price: {$gt: 5000000}},
                                                                {category: ObjectId(category), brand: ObjectId(brand)}]}).count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
          try{
            list = await db().collection('product').find({$and: [{$or:[
                                                                  { $text: { $search: name } },
                                                                  { name: { $regex: name, $options: 'i' } }
                                                                ]}, 
                                                                {price: {$gt: 5000000}},
                                                                {category: ObjectId(category), brand: ObjectId(brand)}]}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
            catch { list = [];}
        }
        break;
      }
    }
    else if(sortby === "Tên")
    {
      switch(price)
      {
        case "1":
        {
          try{
            count = await db().collection('product').find({$and: [{$or:[
                                                                        { $text: { $search: name } },
                                                                        { name: { $regex: name, $options: 'i' } }
                                                                      ]}, 
                                                                      {price: {$lte: 5000000}},
                                                                      {category: ObjectId(category), brand: ObjectId(brand)}]}).count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
        
          try{
            list = await db().collection('product').find({$and: [{$or:[
                                                                  { $text: { $search: name } },
                                                                  { name: { $regex: name, $options: 'i' } }
                                                                ]}, 
                                                                {price: {$lte: 5000000}},
                                                                {category: ObjectId(category), brand: ObjectId(brand)}]}).sort({name: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
          catch { list = [];}
        }
        break;
        case "2":
        {
          try{
            count = await db().collection('product').find({$and: [{$or:[
                                                                  { $text: { $search: name } },
                                                                  { name: { $regex: name, $options: 'i' } }
                                                                ]},
                                                                {price: {$gt: 5000000}},
                                                                {category: ObjectId(category), brand: ObjectId(brand)}]}).count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
          try{
            list = await db().collection('product').find({$and: [{$or:[
                                                                  { $text: { $search: name } },
                                                                  { name: { $regex: name, $options: 'i' } }
                                                                ]}, 
                                                                {price: {$gt: 5000000}},
                                                                {category: ObjectId(category), brand: ObjectId(brand)}]}).sort({name: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
            catch { list = [];}
        }
        break;
      }
    }
    else if(sortby === "Giá")
    {
      switch(price)
      {
        case "1":
        {
          try{
            count = await db().collection('product').find({$and: [{$or:[
                                                                        { $text: { $search: name } },
                                                                        { name: { $regex: name, $options: 'i' } }
                                                                      ]}, 
                                                                      {price: {$lte: 5000000}},
                                                                      {category: ObjectId(category), brand: ObjectId(brand)}]}).count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
        
          try{
            list = await db().collection('product').find({$and: [{$or:[
                                                                  { $text: { $search: name } },
                                                                  { name: { $regex: name, $options: 'i' } }
                                                                ]}, 
                                                                {price: {$lte: 5000000}},
                                                                {category: ObjectId(category), brand: ObjectId(brand)}]}).sort({price: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
          catch { list = [];}
        }
        break;
        case "2":
        {
          try{
            count = await db().collection('product').find({$and: [{$or:[
                                                                  { $text: { $search: name } },
                                                                  { name: { $regex: name, $options: 'i' } }
                                                                ]},
                                                                {price: {$gt: 5000000}},
                                                                {category: ObjectId(category), brand: ObjectId(brand)}]}).count();
          }
          catch{count =  0;}
        
          totalPage = Math.ceil(count / numProduct);
        
          page = (page <= 0) ? 1 : page;
          page = (page > totalPage) ? totalPage : page;
          try{
            list = await db().collection('product').find({$and: [{$or:[
                                                                  { $text: { $search: name } },
                                                                  { name: { $regex: name, $options: 'i' } }
                                                                ]}, 
                                                                {price: {$gt: 5000000}},
                                                                {category: ObjectId(category), brand: ObjectId(brand)}]}).sort({price: 1, _id: 1}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
          }
            catch { list = [];}
        }
        break;
      }
    }

    const data = {list, totalPage};
    await cache.set(key, data);
  }

  const nextPage = (page + 1) > totalPage ? 0 : page + 1;
  const afterNextPage = (page + 2) > totalPage ? 0 : page + 2;

  const prePage = (page - 1) <= 0 ? 0 : page - 1;
  const beforePrePage = (page - 2) <= 0  ? 0 : page - 2;

  return {list: list, currentPage: page, nextPage: nextPage, afterNextPage: afterNextPage, prePage: prePage, beforePrePage: beforePrePage};
}

module.exports.listCategory_brand = async () =>
{
  const category = await db().collection('category').find().toArray();
  const brand = await db().collection('brand').find().toArray();
  let category_brand = [];

  let value =  await cache.get('listCategory_brand');

  if(value)
    return value;
  else
  {
    for(let i = 0; i < category.length; i++)
    {
      let suitableBrand = [];
      for(let j = 0; j < brand.length; j++)
      {
        for(let k = 0; k < brand[j].category.length; k++)
        
          if((category[i]._id).equals(brand[j].category[k]))
            suitableBrand.push({_id: brand[j]._id, name: brand[j].name, cate_brand: category[i].name + "_" + brand[j].name});
      }
      category_brand.push({category: category[i], brand: suitableBrand});
    }

    await cache.set('listCategory_brand', category_brand);
    return category_brand;
  }
}

module.exports.listCategory = async () =>
{
  let value =  await cache.get('listCategory');

  if(value)
    return value;
  else
  {

    let list = await db().collection('category').find().toArray();
    await cache.set('listCategory', list);
    return list;
  }
}

module.exports.listBrand = async () =>
{
  let value =  await cache.get('listBrand');

  if(value)
    return value;
  else
  {

    let list = await db().collection('brand').find().toArray();
    await cache.set('listBrand', list);
    return list;
  }
}

module.exports.listBestSellerProduct = async () => {
  return await db().collection('product').find({}).sort({sell_count: -1}).limit(7).toArray();
}

module.exports.listLatestProduct = async () => {
  return await db().collection('product').find({}).sort({_id: -1}).limit(5).toArray();
}

module.exports.listSaleProduct = async () => {
  return await db().collection('product').find({}).sort({discount: -1}).limit(8).toArray();
}

module.exports.listFeaturedProduct = async () => {
  return  await db().collection('product').aggregate([{$sample: {size: 8}}]).toArray();
}

module.exports.details = async (productId) => {
  const product = await db().collection('product').findOne({_id: ObjectId(productId)});

  const brandPromise = db().collection('brand').findOne({_id: ObjectId(product.brand)});
  const categoryPromise = db().collection('category').findOne({_id: ObjectId(product.category)});
  const relatedListPromise = this.listRelatedProduct(productId, product.category);

  const brand = await brandPromise;
  const category = await categoryPromise;
  const relatedList = await relatedListPromise;
  
  return { product, brand, category, relatedList };
}

module.exports.findProduct = async (productId) =>{
  const product = await db().collection('product').findOne({_id: ObjectId(productId)});

  return product;
}

const RELATED_PRODUCTS_SIZE = 7;

module.exports.listRelatedProduct = async (productId, categoryId) => {
  const listOrderId = await db().collection('order_product').distinct('order', { product: ObjectId(productId) });

  const listRelatedProduct = await db().collection('order_product').aggregate([
    { $match: { order: { $in: listOrderId }, product: { $ne: ObjectId(productId) }}},
    { $group: {
        _id: '$product',
        total_quantity: { $sum: '$quantity' }
      }},
    { $lookup: {
        from: 'product',
        localField: '_id',
        foreignField: '_id',
        as: 'product'
      }},
    { $unwind: { path: '$product' }},
    { $match: { 'product.category': ObjectId(categoryId) }},
    { $sort: { total_quantity: -1 }},
    { $limit: RELATED_PRODUCTS_SIZE}
  ]).toArray();

  if (listRelatedProduct.length < RELATED_PRODUCTS_SIZE) {
    const listRelatedProductId = listRelatedProduct.map(product => product.product._id);
    listRelatedProductId.push(ObjectId(productId));
    
    const remainingProduct = await db().collection('product').aggregate([
        { $match: { category: ObjectId(categoryId), _id: { $nin: listRelatedProductId } }},
        { $sample: { size: RELATED_PRODUCTS_SIZE - listRelatedProduct.length }}
      ]).toArray();
      
    return [...listRelatedProduct.map(item => item.product), ...remainingProduct];
  }

  return listRelatedProduct;
}

module.exports.updateViewCount = async (productId) => {
  await db().collection('product').updateOne({_id: ObjectId(productId)}, {
    $inc: { view_count: 1 }
  });
}

module.exports.updateSellCount = async (productId, quantity) => {
  await db().collection('product').updateOne({_id: ObjectId(productId)}, {
    $inc: { sell_count: quantity }
  });
}