const multer = require('multer');
const fse = require('fs-extra');
const AppError = require('../utils/appError');


const lesson_upload = multer({
    storage: multer.diskStorage({
        destination: async (req, file, cb) => {
            let path = `public/uploads/lessons/${req.params.id}/`;
            await fse.ensureDir(path);
            cb(null, path);
        },
        filename: function(req, file, fn){
            const today = Date.now();
            let fileName = file.originalname.split('.')[0].replace(/[\W\s]/g,'-');
            let fileExtension = file.originalname.split('.')[1];
            const fileNewName = fileName+'-'+today+'.'+fileExtension;
            fn(null, fileNewName);
        }
    }),
    limits: { fileSize:1048576 },
    fileFilter: function(req, file, cb){
        let fileType = file.mimetype.split('/')[1];
        if(fileType == 'jpeg' || fileType == 'png'){
            cb(null, true);
        }else{
            cb(new AppError('Invalid file type. Only JPEG and PNG files are allowed', 415));
        }
    }
});

module.exports = lesson_upload;