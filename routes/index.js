var express = require('express');
var router = express.Router();
const News = require('../models/News')

/* GET home page. */
router.get('/', async function(req, res, next) {
  const news = await News.find().sort({post_date: -1})
  res.render('index', { title: 'Express', news });
});


module.exports = router;
