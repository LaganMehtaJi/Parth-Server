import express from "express";
import upload from "../../util/multerConfig.js";
import * as Student from "../../controller/admin/student.controller.js";
import { editStudent } from "../../controller/admin/student.controller.js";
import { deleteStudent } from "../../controller/admin/student.controller.js";
import { StudentShow } from "../../controller/admin/student.controller.js";
const router = express.Router();
router.post("/send",upload.single("profilePic"),Student.AddStudent);
router.get('/data',StudentShow)
router.put('/edit/:id',upload.single("profilePic"),editStudent);
router.delete('/delete/:id', deleteStudent);
export default router; 