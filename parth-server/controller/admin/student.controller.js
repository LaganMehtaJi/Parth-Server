import XLSX from 'xlsx';

import * as StudentObj  from "../../model/student.model.js"; 

export const AddStudent = async (req, res) => {
  console.log("API Call");
 console.log(req.body);
  const {
    registrationNo,
    rollNo,
    name,
    email,
    phone,
    field,
    customField,
    batchYear,
    profilePic,
    verify,
    address,
    password 
  } = req.body;
 console.log(rollNo)
  if(!registrationNo){
     res.status(202).json({ message: "Enter  All Details" });
    }
  try {
    

    const found = await StudentObj.Student.findOne({ registrationNo });
    console.log(found);
    if(found) {
      return res.status(404).json({ message: "User Already Exists" });
    }
    const newStudent = await StudentObj.Student.create({
      registrationNo,
      rollNo,
      name,
      email,
      phone,
      field,
      password:name,
      customField,
      batchYear,
      profilePic,
      verify,
      address
    });

    return res.status(201).json({ message: "Student Added Successfully", student: newStudent });

  } catch (error) {
    console.error("Error while adding student:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
export const uploadStudents = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const studentData = XLSX.utils.sheet_to_json(sheet);

    if (studentData.length === 0) {
      return res.status(400).json({ message: "Excel file is empty" });
    }

    const inserted = await StudentObj.Student.insertMany(studentData);
    res.status(201).json({
      message: 'Students uploaded successfully',
      data: inserted,
    });

  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};


export const StudentShow=async(req,res)=>
{
  try{
  const studentData=await StudentObj.Student.find({})
  res.status(200).json({
    message:studentData
  })
  }
  catch(error)
  {
    console.log(error)
    res.status(400).json({
      error:error
    })
  }
  


}
