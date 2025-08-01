import express from "express";
import * as adminController from "../../controller/admin/auth.controller.js";
const router = express.Router();
router.post("/admin", adminController.CheckAdmin);
export default router;