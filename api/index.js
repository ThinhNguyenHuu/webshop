const express = require('express');
const router = express.Router();
const cache = require('../lru-cache');

router.get('/cache/clear', (req, res) => {
  cache.clear()
    .then(() => res.json({result: true}))
    .catch((e) => res.json({}));
});

module.exports = router;