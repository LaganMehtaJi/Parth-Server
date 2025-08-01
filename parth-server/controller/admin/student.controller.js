import XLSX from 'xlsx';
import Student from '../models/Student.js';
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
    address
  } = req.body;
  const password = name;
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
      address,
      password
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
// Helper function to check for duplicates
async function isDuplicate(student) {
  return await Student.exists({
    $or: [
      { registrationNo: student.registrationNo },
      { email: student.email }
    ]
  });
}

export const uploadStudents = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Excel file required' });

  try {
    // Parse Excel file
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: null });

    // Define required fields based on schema
    const required = [
      'Registration No', 'Name', 'Email', 'Batch Year'
    ];

    const toInsert = [];
    const skippedRecords = [];

    // Process each row
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      const missing = required.filter(f => {
        const v = r[f];
        return v === null || v === undefined || String(v).trim() === '';
      });

      const doc = {
        registrationNo: r['Registration No'] ? String(r['Registration No']) : '',
        password: r['Password'] || 'defaultPassword', // You should hash this
        rollNo: r['Roll No'] ? String(r['Roll No']) : '',
        name: r['Name'] || '',
        email: (r['Email'] || '').toLowerCase(),
        phone: r['Phone'] ? String(r['Phone']) : '',
        field: r['Field'] || 'Web-Developer',
        batchYear: r['Batch Year'] ? Number(r['Batch Year']) : null,
        profilePic: r['Profile Pic'] || 'https://res.cloudinary.com/dbeqhfbpk/image/upload/v1753455162/logoBlack_fwyfer.png',
        address: r['Address'] || ''
      };

      if (missing.length > 0) {
        skippedRecords.push({
          row: i + 2,
          reason: 'Missing required fields: ' + missing.join(', '),
          original: r
        });
      } else if (await isDuplicate(doc)) {
        skippedRecords.push({
          row: i + 2,
          reason: 'Duplicate record (registrationNo or email already exists)',
          original: r
        });
      } else {
        toInsert.push(doc);
      }
    }

    // Insert valid documents
    let inserted = [];
    if (toInsert.length > 0) {
      inserted = await Student.insertMany(toInsert, { ordered: false });
    }

    // Format response
    const formattedSkipped = skippedRecords.map(record => {
      return {
        rowNumber: record.row,
        registrationNo: record.original['Registration No'] || 'Not provided',
        reason: record.reason,
        details: record.reason.includes('Missing') 
          ? `Missing fields: ${record.missingFields?.join(', ') || 'Unknown'}`
          : 'Duplicate of existing record'
      };
    });

    res.json({
      message: 'Upload processed successfully',
      summary: {
        totalRecords: rows.length,
        inserted: inserted.length,
        skipped: skippedRecords.length,
      },
      details: {
        insertedRecords: inserted.map(doc => ({
          registrationNo: doc.registrationNo,
          name: doc.name,
          email: doc.email
        })),
        skippedRecords: formattedSkipped
      }
    });

  } catch (e) {
    res.status(500).json({ 
      message: 'Error processing file', 
      error: e.message 
    });
  }
};