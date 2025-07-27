
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import ConnectDb from "./config/db.js";

import Student from "./routes/admin/student.routes.js";
import Auth from "./routes/student/auth.routes.js";
const app = express();
dotenv.config();
app.use(cors("http://localhost:5173"));
app.use(morgan('dev'));
app.use(express.json());
app.use("/api/student",Student);
app.use("/api/auth",Auth);
ConnectDb();
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
