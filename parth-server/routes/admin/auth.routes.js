import express from "express";
import multer from 'multer';
import * as adminController from "../../controller/admin/auth.controller.js";
import { uploadStudents } from '../../controller/admin/student.controller.js';

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();
<<<<<<< HEAD
router.post("/admin", adminController.CheckAdmin);
=======
router.post("/login", adminController.CheckAdmin);

// POST /students/upload - Upload student data via Excel
router.post('/upload-excel', upload.single('file'), uploadStudents);

>>>>>>> 2a9df0332e068a81b479ede14e0fc5ece334fdd9
export default router;