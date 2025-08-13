// routes/studentSettings.routes.js
import express from "express";
import {
  getSettings,
  updateLinkedin,
  updateGithub,
  updateTwitter,
  updatePortfolio,
  updateEmail
} from "../../controller/student/settings.controllers.js";


const router = express.Router();

router.get("/settings/:registrationNo", getSettings);
router.post("/linkedin/:registrationNo", updateLinkedin);
router.post("/github/:registrationNo", updateGithub);
router.post("/twitter/:registrationNo", updateTwitter);
router.post("/portfolio/:registrationNo", updatePortfolio);
router.post("/email/:registrationNo", updateEmail);

export default router;
