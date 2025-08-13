// routes/experience.routes.js
import express from "express";
import {
  getExperience,
  addExperience,
  updateExperience,
  deleteExperience
} from "../../controller/student/experence.controller.js";

const router = express.Router();

router.get("/get/:registrationNo", getExperience);
router.post("/add/:registrationNo", addExperience);
router.post("/update/:registrationNo/:id", updateExperience);
router.post("/delete/:registrationNo/:id", deleteExperience);

export default router;
