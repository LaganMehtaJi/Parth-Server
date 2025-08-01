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


