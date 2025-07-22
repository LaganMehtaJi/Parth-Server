<<<<<<< HEAD:index.js
=======
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import ConnectDb from "./config/db.js";
import Comapny from "./routes/student/apply.routes.js";
const app = express();
dotenv.config();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use("/api/company",Comapny);

>>>>>>> 7286c04f945917f3f0e0a50f96a683bbe1ef42c5:parth-server/index.js


app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
