import express from "express";
const router = express.Router();
import * as StudentObj from "../../controller/student/profile.controller.js";
router.get("/getStudentProfile", StudentObj.GetStudentProfile);
export default router;