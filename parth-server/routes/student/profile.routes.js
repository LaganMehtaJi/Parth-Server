import * as ProfileController from "../../controller/student/profile.controller.js";
import express from "express";
const router = express.Router();
router.get("/get/:registrationNo",ProfileController.GetStudentProfile);
export default router;