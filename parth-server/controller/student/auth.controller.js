import express from "express";
import * as StudentObj  from "../../model/student.model.js"; 
export const CheckStudent = async (req,res)=>{
    const {email , registrationNo,pass} = req.body;
    try{
       if(!email||!registrationNo||!pass){
        return res.status(401).json({message:"Enter All Details"});
       }
       const StudentData = await StudentObj.Student.findOne({registrationNo})
       if(!StudentData){
         return res.status(401).json({message:"Register your Account"});
       }
       
       if(pass==StudentData.password){
          return res.status(200).json({message:"Sucessfull Loginn","Studentdata":StudentData});
       }
       else{
           return res.status(401).json({message:"Wrong Details"});
       }
    }catch(error){
          console.log(error);
          return res.status(401).json({message:"Internal ServerError","error":error});
    }
}; 

