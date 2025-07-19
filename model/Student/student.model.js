import mongoose from "mongoose";
const studentSchema=new mongoose.Schema({
     studentId: {
    type: String,
    unique: true,
  },
    name: String,
  email: String,
  phone: String,
  isVerified: {
    type: Boolean,
    default: false,
  },

})
const studentModel=mongoose.model("student",studentSchema);
export default studentModel;