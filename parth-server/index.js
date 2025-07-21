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


ConnectDb();
app.listen(process.env.PORT,(err)=>{
    if(err){
        console.log(`Server not Started ${err}`)
    }else{
        console.log(`Server Start ${process.env.PORT}`);
    }
})
