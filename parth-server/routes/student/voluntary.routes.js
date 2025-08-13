import express from "express";
import {
  getVoluntaryWork,
  addVoluntaryWork,
  updateVoluntaryWork,
  deleteVoluntaryWork
} from "../../controller/student/Voluntary.controller.js";
import  upload  from "../../util/multerConfig.js";

const router = express.Router();

router.get("/get/:registrationNo", getVoluntaryWork);


router.post("/add/:registrationNo", upload.single("image"), addVoluntaryWork);


router.post("/update/:registrationNo/:id", upload.single("image"), updateVoluntaryWork);


router.post("/delete/:registrationNo/:id", deleteVoluntaryWork);

export default router;
