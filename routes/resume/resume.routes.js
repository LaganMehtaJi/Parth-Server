import express from "express";
import {SpacificRsume} from "../../controller/resume/resume.controller.js"
const router = express.Router();

router.get("/:id/:color",SpacificRsume);


export default router;