
import * as StudentModels from "../../model/student.model.js";



// 📌 Add Project
export const addProject = async (req, res) => {
  try {
    const {registrationNo } = req.params;
    const {
     
      title,
      description,
      techStack,
      link,
      logo,
      featured,
      date,
    } = req.body;

    // Check if student exists
    const studentExists = await StudentModels.Student.findOne({ registrationNo });
    if (!studentExists) {
      return res.status(404).json({ message: "Student not found" });
    }

    const project = await StudentModels.Project.create({
      registrationNo,
      title,
      description,
      techStack,
      link,
      logo: logo || undefined, // use default if undefined
      featured: featured || false,
      date: date || Date.now(),
    });

    return res.status(200).json(project);
  } catch (error) {
    console.error("Error adding project:", error);
    res.status(500).json({ message: "Failed to add project","status":true });
  }
};

// 📌 Get Specific Student's Projects (Using registrationNo from req.body)
export const getProjects = async (req, res) => {
  try {
    const { registrationNo } = req.params; // ✅ using body, not params

    if (!registrationNo) {
      return res.status(400).json({ message: "registrationNo is required" });
    }

    // Get all projects of this student
    const projects = await StudentModels.Project.find({ registrationNo }).sort({ createdAt: -1 });

    // Optional: populate student info
    const student = await StudentModels.Student.findOne(
      { registrationNo },
      "name registrationNo image"
    );

    const populatedProjects = projects.map((proj) => ({
      ...proj.toObject(),
      student
    }));

    res.status(200).json(populatedProjects);
  } catch (error) {
    console.error("Error fetching student's projects:", error);
    res.status(500).json({ message: "Failed to fetch student's projects" });
  }
};


// 📌 Update Project (by req.body.id)
export const updateProject = async (req, res) => {
  try {
    const {id} = req.params;
    const { ...updateData } = req.body;

    const updatedProject = await StudentModels.Project.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Failed to update project" });
  }
};

// 📌 Delete Project (by req.body.id)
export const deleteProject = async (req, res) => {
  try {
     const {id } = req.params;



    const deletedProject = await StudentModels.Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully", id });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Failed to delete project" });
  }
};
