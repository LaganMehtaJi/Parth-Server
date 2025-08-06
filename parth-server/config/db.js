import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

function ConnectDb() {
    mongoose.connect("mongodb+srv://chahatsharma:gRzhEkZstH7a7l26@cluster0.zbbt9eh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        .then(() => console.log("✅ MongoDB Connected"))
        .catch((err) => console.error("❌ MongoDB Error:", err));
}

export default ConnectDb;