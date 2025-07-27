import express from "express";
import { CheckStudent } from "../../controller/student/auth.controller.js";
const router  = express.Router();
router.post("/student",CheckStudent);
// router.post("/recruiter");
// router.post("/admin");



// router.post("/forgot/student");
// router.post("/forgot/admin");
// router.post("/forgot/recruiter");


export default router;