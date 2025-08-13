import mongoose, { Schema } from "mongoose";
const addCompany=new Schema({
  name:{
    type:String,required:true
  },
  description:{
    type:String,required:true
  },
  logo:{
    type:String,
  }


})
export const companyData=mongoose.model('CompanyData',addCompany)