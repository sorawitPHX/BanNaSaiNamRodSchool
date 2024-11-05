var express = require('express');
var router = express.Router();
const News = require('../models/News')
const upload = require('../middlewares/uploadMiddleware'); 

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('news-management');
});

router.post('/insert', upload.single('thumbnail_img'), async (req, res, next)=>{
  try {
    let filePath = (req.file) ? `/uploads/${req.file.filename}` : undefined
    const news = new News({
      post_date: req.body.post_date,
      title: req.body.title,
      image_path: filePath,
      content: {
        snipet: req.body.snipet,
        body: req.body.body
      }
    })
    news.save()
      .then((result)=>{
        res.send(result)
      })
      .catch((err)=>{
        res.status(400).json(err)
      })
  } catch (error) {
    res.status(400).send({error: error})
    console.log(error)
  }
})

router.post('/testupload', upload.single('thumbnail_img'), async (req, res)=>{
  try {
    // const { title, description } = req.body;
    const filePath = `/uploads/${req.file.filename}`;

    // คุณสามารถนำข้อมูลไปใช้ หรือบันทึกใน database ได้ที่นี่
    res.json({ message: 'File uploaded successfully', filePath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
})

module.exports = router;
