import mongoose from "mongoose";
const { Schema } = mongoose;    
// ==============================
// 🧑‍💼 Admin Schema
// =============================

const adminSchema = new Schema({
  adminacesscode: {             
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 20
  },        
    password: {     
    type: String,                   
    required: true, 
    },
    email:{
        required: true,
        type: String,
        unique: true,
        trim: true,
    },
    name:{
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    phone: {
        type: String,
        trim: true,
        validate: v => /^[0-9]{10,15}$/.test(v)
    },
});


export const Admin = mongoose.model("Admin", adminSchema);
