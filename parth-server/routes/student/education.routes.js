import express from "express";
import {
  getEducation,
  addEducation,
  updateEducation,
  deleteEducation
} from "../../controller/student/education.controller.js";

const router = express.Router();

router.get("/get/:registrationNo", getEducation);
router.post("/add/:registrationNo", addEducation);
router.post("/update/:registrationNo/:id", updateEducation);
router.post("/delete/:registrationNo/:id", deleteEducation);

export default router;
