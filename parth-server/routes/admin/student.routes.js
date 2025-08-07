import express from "express";
import * as Student from "../../controller/admin/student.controller.js";
import { StudentShow } from "../../controller/admin/student.controller.js";
const router = express.Router();
router.post("/send",Student.AddStudent);
router.get('/data',StudentShow)
export default router; 