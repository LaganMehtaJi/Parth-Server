import XLSX from 'xlsx';

import { Student } from "../../model/student.model.js";
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
      password,
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


export const getStudent = async (req,res)=>{
       const {rollNo} = req.params;
       console.log(rollNo);
       try{
        if(!rollNo){
           return res.status(500).json({ message: "Not Valid", error });
        }
        const  foundStudent = await StudentObj.Student.find({rollNo});
        console.log(foundStudent);
       if(! foundStudent){
           return res.status(400).json({ message: "Not Valid" });
        }else{
           return res.status(201).json({ message: "Student display Successfully", student: foundStudent});
        }

       }catch(error){
          console.log(error);
          return res.status(500).json({ message: "Internal Server Error", error });
       }
};


<<<<<<< HEAD
=======
//excel logic



import XLSX from 'xlsx';
import { Student } from "../../model/student.model.js";

// Helper function to check for duplicates - fixed version
async function isDuplicate(student) {
  try {
    if (!student.registrationNo && !student.email) return false;
    
    const query = {};
    if (student.registrationNo) {
      query.registrationNo = student.registrationNo.trim();
    }
    if (student.email) {
      query.email = student.email.toLowerCase().trim();
    }

    return await Student.exists(query);
  } catch (err) {
    console.error('Duplicate check error:', err);
    return false; // Fail-safe
  }
}

// Validation function - minimal fixes
function validateStudent(doc) {
  const errors = [];
  const currentYear = new Date().getFullYear();

  // Required fields
  if (!doc.registrationNo?.trim()) errors.push('Registration No is required');
  if (!doc.name?.trim()) errors.push('Name is required');
  if (!doc.email?.trim()) errors.push('Email is required');
  if (doc.batchYear === null || doc.batchYear === undefined) errors.push('Batch Year is required');

  // Data formats
  if (doc.batchYear && (isNaN(doc.batchYear) || doc.batchYear < 2000 || doc.batchYear > currentYear + 5)) {
    errors.push(`Batch Year must be a number between 2000-${currentYear + 5}`);
  }

  if (doc.phone && doc.phone.trim() && !/^\d{10,15}$/.test(doc.phone)) {
    errors.push('Phone must be 10-15 digits or empty');
  }

  if (doc.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(doc.email)) {
    errors.push('Invalid email format');
  }

  return errors.length ? errors : null;
}

export const uploadStudents = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Excel file required' });

  try {
    // Parse Excel file
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: null });

    const toInsert = [];
    const skippedRecords = [];

    // Process each row
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      
      // Prepare document - minimal changes
      const doc = {
        registrationNo: r['Registration No']?.toString().trim() || '',
        password: r['Password'] || 'defaultPassword',
        rollNo: r['Roll No']?.toString().trim() || '',
        name: r['Name']?.toString().trim() || '',
        email: (r['Email']?.toString() || '').toLowerCase().trim(),
        phone: r['Phone']?.toString().trim() || undefined, // Key fix: undefined for empty
        field: r['Field'] || 'Web-Developer',
        batchYear: r['Batch Year'] ? Number(r['Batch Year']) : null,
        profilePic: r['Profile Pic'] || 'https://res.cloudinary.com/dbeqhfbpk/image/upload/v1753455162/logoBlack_fwyfer.png',
        address: r['Address'] || ''
      };

      // Validate
      const validationErrors = validateStudent(doc);
      if (validationErrors) {
        skippedRecords.push({
          row: i + 2,
          registrationNo: doc.registrationNo || 'Not provided',
          reason: 'Validation failed',
          details: validationErrors.join(', ')
        });
        continue;
      }

      // Check duplicates
      if (await isDuplicate(doc)) {
        skippedRecords.push({
          row: i + 2,
          registrationNo: doc.registrationNo,
          reason: 'Duplicate record',
          details: 'Registration No or Email already exists'
        });
        continue;
      }

      toInsert.push(doc);
    }

    // Insert documents - minimal change for error handling
    let inserted = [];
    for (const doc of toInsert) {
      try {
        const newStudent = await Student.create(doc);
        inserted.push({
          registrationNo: newStudent.registrationNo,
          name: newStudent.name,
          email: newStudent.email,
          batchYear: newStudent.batchYear
        });
      } catch (err) {
        const errorMsg = err.code === 11000 ? 'Duplicate detected during insert' : 
                        err.message.includes('phone') ? 'Invalid phone format' :
                        err.message;
                        
        skippedRecords.push({
          row: 'Unknown',
          registrationNo: doc.registrationNo || 'Not provided',
          reason: 'Insertion error',
          details: errorMsg
        });
      }
    }

    // Same response format
    res.json({
      message: 'Upload processed successfully',
      summary: {
        totalRecords: rows.length,
        inserted: inserted.length,
        skipped: skippedRecords.length,
      },
      details: {
        insertedRecords: inserted,
        skippedRecords: skippedRecords
      }
    });

  } catch (e) {
    console.error('Upload error:', e);
    res.status(500).json({ 
      message: 'Error processing file', 
      error: e.message 
    });
  }
};
>>>>>>> 2a9df0332e068a81b479ede14e0fc5ece334fdd9
