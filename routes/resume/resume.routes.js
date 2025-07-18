import express from 'express';
import  EjsUpload  from '../../controller/resume/resume.controller.js';
import upload from '../../config/multerConfig.js';

const router = express.Router();

router.post('/resume', upload.single('ejsFile'), EjsUpload);

export default router;
