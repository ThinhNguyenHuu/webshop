var LRU = require("lru-cache")
  , options = { max: 100
              , maxAge: 1000 * 60 }
  , cache = new LRU(options);
const axios = require('axios');

  module.exports.get = (key) => {
    return new Promise(resolve => {
      const value = cache.get(key);
      resolve(value);
    });
  }


  module.exports.set = (key, value) => {
    return new Promise(resolve => {
      cache.set(key, value);
      resolve(true);
    })
  }

  
  module.exports.clear = () => {
    return new Promise(resolve => {
      cache.reset();
      resolve(true);
    })
  }

  module.exports.clearManagementCache = () => {
    return new Promise(resolve => {
      axios.get('http://inspiredigital-management.herokuapp.com/api/cache/clear')
      .then(() => {
        console.log('Clear management cache');
        resolve(true);
      })
      .catch((e) => {
        console.log('Fail to clear management cache');
        resolve(true);
      });
    })
  }