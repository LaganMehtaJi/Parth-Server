import express from "express";
import { upload } from "../../util/multerConfig.js";
import { addCompany } from "../../controller/admin/company.controller.js";

const router = express.Router();

router.post("/addcompany", upload.single("logo"), addCompany);

export default router;
