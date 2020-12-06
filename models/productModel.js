const { ObjectId } = require('mongodb');
const {db} = require('../db');


module.exports.list = async (pageIndex, ProductNum_per_page) =>  
{
  let page = +pageIndex || 1;

  const count = await db().collection('product').find().count();

  const totalPage = Math.ceil(count / ProductNum_per_page);
  
  page = (page > totalPage) ? 1 : page;

  let list = await db().collection('product').find().limit(Number(ProductNum_per_page)).skip((page - 1) * ProductNum_per_page).toArray();
  
  for(let i = 0; i < list.length; i++)
    list[i].old_price = (list[i].discount != 0) ? Math.ceil((list[i].price * 100) / (100 - list[i].discount)): list[i].price;

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

module.exports.listClassifiedProduct = async (category_brand) =>
{
  let category = "";
  let brand = "";

  const temp = category_brand.indexOf("_");
  if(temp === -1)
  {
    const listCategory = await db().collection('category').find({name: category_brand}).toArray();

    const list = await db().collection('product').find({category: ObjectId(listCategory[0]._id)}).toArray();
    return list;
  }
  else
  {
    for(let i = 0; i < temp; i++)
      category = category + category_brand.charAt(i);
    for(let i = temp + 1; i < category_brand.length; i++)
      brand = brand + category_brand.charAt(i);
      
    const listCategory = await db().collection('category').find({name: category}).toArray();
    const listBrand = await db().collection('brand').find({name: brand}).toArray();
    
    const list = await db().collection('product').find({category: ObjectId(listCategory[0]._id), brand: ObjectId(listBrand[0]._id)}).toArray();
    return list;
    
  }
}

module.exports.best_seller = async () => {}

module.exports.lastest = async () => {}

module.exports.recommend = async () => {}

module.exports.featured = async () => {}

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