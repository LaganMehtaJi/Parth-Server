import *  as StudentModel from "../../model/student.model.js"

export const AddSkill = async (req,res)=>{

    const {  registrationNo , skill, proficiency } = req.body;

  try{

    if(!registrationNo||!skill||!proficiency){
          return res.status(400).json({ message: "Detail is required" });
    }
    const studentExists = await StudentModel.Student.findOne({ registrationNo });
    if (!studentExists) {
      return res.status(404).json({ message: "Student not found" });
    }

     const Skills = await StudentModel.Skill.create({
      registrationNo,
      skill,
      proficiency
    });

    return res.status(200).json(Skills);

  } catch (error) {
    console.error("Error deleting Skill:", error);
    res.status(500).json({ message: "Failed to delete Skill" });
  }
    

};



export const getSkills = async (req, res) => {
  try {
    const { registrationNo } = req.params; // ✅ using body, not params

    if (!registrationNo) {
      return res.status(400).json({ message: "registrationNo is required" });
    }

    // Get all projects of this student
    const skills = await StudentModel.Skill.find({ registrationNo }).sort({ createdAt: -1 });

    // Optional: populate student info
    const student = await StudentModel.Student.findOne(
      { registrationNo },
      "name registrationNo image"
    );

    const populatedSkills = skills.map((proj) => ({
      ...proj.toObject(),
      student
    }));

    res.status(200).json(populatedSkills);
  } catch (error) {
    console.error("Error fetching student's Skills:", error);
    res.status(500).json({ message: "Failed to fetch student's Skills" });
  }
};


// 📌 Update Project (by req.body.id)
export const updateSkills = async (req, res) => {
  try {
    const {id} = req.params;
    const { ...updateData } = req.body;

    const updatedSkills = await StudentModel.Skill.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedSkills) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.status(200).json(updatedSkills);
  } catch (error) {
    console.error("Error updating Skill:", error);
    res.status(500).json({ message: "Failed to update Skill" });
  }
};

// 📌 Delete Project (by req.body.id)
export const deleteSkills = async (req, res) => {
  try {
     const {id } = req.params;



    const deletedSkill = await StudentModel.Skill.findByIdAndDelete(id);

    if (!deletedSkill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.status(200).json({ message: "Skill deleted successfully", id });
  } catch (error) {
    console.error("Error deleting Skill :", error);
    res.status(500).json({ message: "Failed to delete Skill" });
  }
};
