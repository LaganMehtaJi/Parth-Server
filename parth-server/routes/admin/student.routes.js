import express from "express";
import * as Student from "../../controller/admin/student.controller.js";
import * as Companies from "../../controller/admin/company.controller.js";
const router = express.Router();
router.post("/send",Student.AddStudent);
router.get("/:rollNo",Student.getStudent);


router.get("/companies",Companies.getAllCompany);
router.post("/companies",Companies.createCompany);
// router.put("/companies/:id",Companies.createCompany);
// router.delete("/companies/:id",Companies.createCompany);
// router.post("/companies/:companyid/jobs",Companies.createCompany);
// router.delete("/companies/:companyid/jobs",Companies.createCompany);

export default router; 
