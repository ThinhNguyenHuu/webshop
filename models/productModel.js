const { ObjectId } = require('mongodb');
const {db} = require('../db');


module.exports.list = async (pageIndex, product_per_page) =>  
{
  let page = +pageIndex || 1;
  const numProduct = +product_per_page || 9;

  let count;
  try{
    count = await db().collection('product').find().count();
  }
  catch{count =  0;}

  const totalPage = Math.ceil(count / numProduct);

  page = (page <= 0) ? 1 : page;
  page = (page > totalPage) ? totalPage : page;

  let list;
 
  try{
    list = await db().collection('product').find().limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
  }
    catch { list = [];}
  
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
  return category_brand;
}

module.exports.listFilteredProduct = async (category_brand, pageIndex, product_per_page) =>
{
  let category = "";
  let brand = "";

  const temp = category_brand.indexOf("_");
  if(temp === -1)
  {
    let page = +pageIndex || 1;
    const numProduct = +product_per_page || 9;

    const listCategory = await db().collection('category').find({name: category_brand}).toArray();

    let count;
    try{
        count = await db().collection('product').find({category: ObjectId(listCategory[0]._id)}).count();
    }
      catch{ count =  0;}
  
    const totalPage = Math.ceil(count / numProduct);
    
    page = (page < 0) ? 1 : page;
    page = (page > totalPage) ? totalPage : page;
    
    let list;
    try{ list = await db().collection('product').find({category: ObjectId(listCategory[0]._id)}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray();}
    catch{ list = []}

    const nextPage = (page + 1) > totalPage ? 0 : page + 1;
    const afterNextPage = (page + 2) > totalPage ? 0 : page + 2;

    const prePage = (page - 1) <= 0 ? 0 : page - 1;
    const beforePrePage = (page - 2) <= 0  ? 0 : page - 2;

    return {list: list, currentPage: page, nextPage: nextPage, afterNextPage: afterNextPage, prePage: prePage, beforePrePage: beforePrePage};
  }
  else
  {
    for(let i = 0; i < temp; i++)
      category = category + category_brand.charAt(i);
    for(let i = temp + 1; i < category_brand.length; i++)
      brand = brand + category_brand.charAt(i);

    let page = +pageIndex || 1;
    const numProduct = +product_per_page || 9;

    const listCategory = await db().collection('category').find({name: category}).toArray();
    const listBrand = await db().collection('brand').find({name: brand}).toArray();

    let count;
    try{ count =  await db().collection('product').find({category: ObjectId(listCategory[0]._id), brand: ObjectId(listBrand[0]._id)}).count();}
    catch{ count = 0}

    const totalPage = Math.ceil(count / numProduct);
    
    page = (page < 0) ? 1 : page;
    page = (page > totalPage) ? totalPage : page;

    let list;
    try{ list = await db().collection('product').find({category: ObjectId(listCategory[0]._id), brand: ObjectId(listBrand[0]._id)}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray();}
    catch{ list = []}
    
    const nextPage = (page + 1) > totalPage ? 0 : page + 1;
    const afterNextPage = (page + 2) > totalPage ? 0 : page + 2;

    const prePage = (page - 1) <= 0 ? 0 : page - 1;
    const beforePrePage = (page - 2) <= 0  ? 0 : page - 2;

    return {list: list, currentPage: page, nextPage: nextPage, afterNextPage: afterNextPage, prePage: prePage, beforePrePage: beforePrePage};
  }
}

module.exports.listSearchedProduct = async (pageIndex, product_per_page, search) =>  
{
  let page = +pageIndex || 1;
  const numProduct = +product_per_page || 9;

  let count;
  try{
    count = await db().collection('product').find({$or:[
                                                  { $text: { $search: search } },
                                                  { name: { $regex: search, $options: 'i' } }
                                                ]}).count();
  }
  catch{count =  0;}

  const totalPage = Math.ceil(count / numProduct);

  page = (page <= 0) ? 1 : page;
  page = (page > totalPage) ? totalPage : page;

  let list;
 
  try{
    list = await db().collection('product').find({$or:[
                                                  { $text: { $search: search } },
                                                  { name: { $regex: search, $options: 'i' } }
                                                ]}).limit(Number(numProduct)).skip((page - 1) * numProduct).toArray() ;
  }
  catch { list = [];}


  const nextPage = (page + 1) > totalPage ? 0 : page + 1;
  const afterNextPage = (page + 2) > totalPage ? 0 : page + 2;

  const prePage = (page - 1) <= 0 ? 0 : page - 1;
  const beforePrePage = (page - 2) <= 0  ? 0 : page - 2;

  return {list: list, currentPage: page, nextPage: nextPage, afterNextPage: afterNextPage, prePage: prePage, beforePrePage: beforePrePage};
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
  const relatedListPromise = db().collection('product').find({_id: {$ne: ObjectId(productId)}, category: ObjectId(product.category)}).limit(7).toArray();

  const brand = await brandPromise;
  const category = await categoryPromise;
  const relatedList = await relatedListPromise;
  
  return { product, brand, category, relatedList };
}