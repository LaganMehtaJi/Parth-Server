import express from "express";
import multer from 'multer';
import * as adminController from "../../controller/admin/auth.controller.js";
import { uploadStudents } from '../../controller/admin/student.controller.js';

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();
router.post("/admin", adminController.CheckAdmin);

// POST /students/upload - Upload student data via Excel
router.post('/upload-excel', upload.single('file'), uploadStudents);

export default router;