import express from "express";
import * as CertificateControllers from "../../controller/student/certificate.controller.js";
import  upload  from "../../util/multerConfig.js";

const router = express.Router();

router.get("/get/:registrationNo", CertificateControllers.getCertificates);


router.post("/add/:registrationNo", upload.single("image"), CertificateControllers.addCertificate);


router.post("/update/:registrationNo/:id", upload.single("image"), CertificateControllers.updateCertificate);


router.post("/delete/:registrationNo/:id", CertificateControllers.deleteCertificate);

export default router;
