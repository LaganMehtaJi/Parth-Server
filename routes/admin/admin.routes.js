import express from "express";
const router = express.Router();
import { verifyStudent, adminEditStudent } from "../../controller/admin/admin.controller.js";
import { updateProfile } from "../../controller/admin/student.controller.js";

router.put("/verifyStudent/:studentId", verifyStudent); 
router.put("/editStudent/:id", adminEditStudent);
router.put("/updateProfile/:id", updateProfile);
export default router
