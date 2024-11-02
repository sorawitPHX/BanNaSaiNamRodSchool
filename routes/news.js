var express = require('express');
var router = express.Router();
const News = require('../models/News')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('news-management');
});

router.post('/insert', async (req, res, next)=>{
  const news = new News({
    title: req.body.title,
    image_path: req.body.image_path,
    body: {
      header: req.body.header,
      content: req.body.content
    }
  })
  news.save()
    .then((result)=>{
      res.send(result)
      // res.redirect('/')
    })
    .catch((err)=>{
      res.status(400).send(err)
    })
})


module.exports = router;
