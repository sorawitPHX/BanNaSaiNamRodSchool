const multer = require('multer');
const path = require('path');

// กำหนดที่เก็บไฟล์และการตั้งชื่อไฟล์
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/'); // เก็บไฟล์ในโฟลเดอร์ 'uploads'
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// สร้าง instance ของ multer พร้อมกำหนดที่เก็บไฟล์และการกรองไฟล์
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // กำหนดขนาดไฟล์สูงสุด (5 MB)
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images are allowed (jpeg, jpg, png, gif)'));
    }
  }
});

module.exports = upload;
