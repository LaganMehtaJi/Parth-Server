import * as SkillControler from "../../controller/student/skill.controller.js";
import express from "express";
const router = express.Router();

router.get("/get/:registrationNo",SkillControler.getSkills);
router.post("/add/:registrationNo",SkillControler.AddSkill);
router.post("/delete/:registrationNo/:id",SkillControler.deleteSkills);
router.post("/update/:registrationNo/:id",SkillControler.updateSkills);

export default router;