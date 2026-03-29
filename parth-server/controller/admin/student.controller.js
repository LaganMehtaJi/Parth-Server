import XLSX from 'xlsx';
import * as StudentObj from "../../model/student.model.js";

export const AddStudent = async (req, res) => {
  console.log("API Call");
  console.log(req.body);

  const {
    registrationNo,
    rollNo,
    name,
    email,
    clas,
    description,
    phone,
    field,
    customField,
    batchYear,
    verify,
    address,
    password,profilePic
  } = req.body;
  const logoUrl = req.file?.path || "";

  if (!registrationNo) {
    return res.status(202).json({ message: "Enter All Details" });
  }

  try {
    const found = await StudentObj.Student.findOne({ registrationNo });
    if (found) {
      return res.status(404).json({ message: "User Already Exists" });
    }

    // ✅ Format password (lowercase, no spaces, fallback to name)
    const formattedPassword = (password || name || "")
      .toLowerCase()
      .replace(/\s+/g, "");
      

    const newStudent = await StudentObj.Student.create({
      registrationNo,
      rollNo,
      name,
      email,
      class:clas,
      description,
      phone,
      field,
      password: formattedPassword,
      customField,
      batchYear,
      profilePic:logoUrl,
      verify,
      address
    });

    return res.status(201).json({
      message: "Student Added Successfully",
      student: newStudent
    });

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

    // ✅ Transform passwords for bulk upload
    const formattedData = studentData.map(student => ({
      ...student,
      password: (student.password || student.name || "")
        .toLowerCase()
        .replace(/\s+/g, "")
    }));

    const inserted = await StudentObj.Student.insertMany(formattedData);
    res.status(201).json({
      message: 'Students uploaded successfully',
      data: inserted
    });

  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};




export const StudentShow = async (req, res) => {
  try {
    const studentData = await StudentObj.Student.find({});
    res.status(200).json({ message: studentData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};


export const editStudent = async (req, res) => {
  try {
    const { id } = req.params; 
    const updates = req.body;  

    
    const student = await StudentObj.Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (req.file) {
      student.profilePic = req.file.path || req.file.secure_url;
    }

  
    Object.keys(updates).forEach(key => {
      if (
        key !== "_id" &&
        key !== "__v" &&
        updates[key] !== undefined &&
        updates[key] !== null
      ) {
        student[key] = updates[key];
      }
    });

    
    await student.save();

    res.status(200).json({
      message: "Student updated successfully",
      data: student
    });

  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: "Error updating student", error });
  }
};


   
export const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStudent = await StudentObj.Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      student: deletedStudent
    });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};