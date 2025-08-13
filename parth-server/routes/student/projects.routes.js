import express from "express";
import * as ProjectsController from "../../controller/student/projects.controller.js";
const router = express.Router();

router.get("/get/:registrationNo",ProjectsController.getProjects);
router.post("/add/:registrationNo",ProjectsController.addProject);
router.post("/delete/:registrationNo/:id",ProjectsController.deleteProject);
router.post("/update/:registrationNo/:id",ProjectsController.updateProject);

export default router;
