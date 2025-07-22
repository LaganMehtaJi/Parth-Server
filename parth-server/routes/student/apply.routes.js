import express from "express";
const route = express.Router();
import {getAllCompanies} from "../../controller/admin/company.controller.js";
route.get("/all",getAllCompanies );

export default route;