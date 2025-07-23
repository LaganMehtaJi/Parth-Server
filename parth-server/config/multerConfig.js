import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { folderName } from '../controller/resume/resume.controller.js';


if (!fs.existsSync(folderName)) {
  fs.mkdirSync(folderName);
}


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, folderName);
  },
  filename: function (req, file, cb) {
    const files = fs.readdirSync(folderName).filter(f => f.startsWith('temp') && f.endsWith('.ejs'));
    const nextTemp = files.length + 1;
    const filename = `temp${nextTemp}.ejs`;
    cb(null, filename);
  }
});


const fileFilter = function (req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === '.ejs') {
    cb(null, true); 
  } else {
    cb(new Error('Only .ejs files are allowed!'), false); 
  }
};


const upload = multer({ storage, fileFilter });

export default upload;
