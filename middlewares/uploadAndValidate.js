const multer = require("multer");
const {HttpError} = require("../helpers");
const {schemas} = require("../models/recipe");
const path = require('path');
const isEmpty = require('lodash.isempty');

const multerConfig = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
  // Додаємо обмеження на розмір файлу - 5MB
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
  // Додаємо фільтр для перевірки типу файлу
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/; // Дозволені розширення файлів
    const mimetype = filetypes.test(file.mimetype); // Перевірка MIME типу файлу
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); // Перевірка розширення файлу
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    
    cb(new Error(`File type is not supported, must be ${filetypes}`));
  },
});



const uploadAndValidate = (req, res, next) => {
    upload.fields([
      { name: 'avatar', maxCount: 1 },
      { name: 'mainPhoto', maxCount: 1 },
      { name: 'stepPhoto1'},
      { name: 'stepPhoto2'},
      { name: 'stepPhoto3'},
      { name: 'stepPhoto4'},
      { name: 'stepPhoto5'},
      { name: 'stepPhoto6'},
      { name: 'stepPhoto7'},
      { name: 'stepPhoto8'},
      { name: 'stepPhoto9'},
      { name: 'stepPhoto10'},
      { name: 'stepPhoto11'},
      { name: 'stepPhoto12'},
      { name: 'stepPhoto13'},
      { name: 'stepPhoto14'},
      { name: 'stepPhoto15'},
      { name: 'stepPhoto16'},
      { name: 'stepPhoto17'},
      { name: 'stepPhoto18'},
      { name: 'stepPhoto19'},
      { name: 'stepPhoto20'},

    ])(req, res, (err) => {
      // console.log("uploadAndValidate");
      // console.log("req=", req);
      if (err) return res.status(400).send(err.message);
      
      const keyes = Object.keys(req);
      const isFile  = keyes.includes('files');

      if(isEmpty(req.body) && isFile){    
        next(HttpError(400, 'missing fields'));
      }
      else{
          const { error } = schemas.addSchema.validate(req.body);
          if (error) {
              next(HttpError(400, error.message));
              
          }
          next();
      }
    });
  };

  module.exports=uploadAndValidate;