import express from "express";
import dotenv from "dotenv";
import ConnectDb from "./config/db.js";
// import Resume from "./routes/resume/resume.routes.js";
import Admin from "./routes/admin/admin.routes.js"
const app = express();
dotenv.config();
app.use(express.json());
// app.use("/resume",Resume);
app.use("/admin",Admin)

ConnectDb();
app.listen(process.env.PORT,(err)=>{
    if(err){
        console.log(`Server not Started ${err}`)
    }else{
        console.log(`Server Start ${process.env.PORT}`);
    }
})
