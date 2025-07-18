import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

function ConnectDb() {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log("✅ MongoDB Connected"))
        .catch((err) => console.error("❌ MongoDB Error:", err));
}

export default ConnectDb;