var express = require('express');
var router = express.Router();
const News = require('../models/News')
const upload = require('../middlewares/uploadMiddleware');

/* GET users listing. */
router.get('/:id', async function (req, res, next) {
    const id = req.params.id
    const news = await News.findById(id)
    res.render('news', {news})
});

module.exports = router;
