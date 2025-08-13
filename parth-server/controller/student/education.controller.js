import * as EducationModels from "../../model/student.model.js"; 

export const getEducation = async (req, res) => {
  try {
    const { registrationNo } = req.params;
    const education = await EducationModels.Education.find({ registrationNo }).sort({ startDate: -1 });

    res.json(education);
  } catch (error) {
    console.error("Error fetching education:", error);
    res.status(500).json({ message: "Failed to fetch education data" });
  }
};


export const addEducation = async (req, res) => {
  try {
    const { registrationNo } = req.params;
    const {
      institution,
      degree,
      fieldOfStudy,
      startDate,
      endDate,
      grade,
      description,
      batchYear
    } = req.body;

    const newEducation = new  EducationModels.Education({
      registrationNo,
      institution,
      degree,
      fieldOfStudy,
      startDate,
      endDate,
      grade,
      description,
      batchYear
    });

    const saved = await newEducation.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error adding education:", error);
    res.status(500).json({ message: "Failed to save education data" });
  }
};


export const updateEducation = async (req, res) => {
  try {
    const { registrationNo, id } = req.params;

    const updated = await  EducationModels.Education.findOneAndUpdate(
      { _id: id, registrationNo },
      req.body,
      { new: true } // return updated doc
    );

    if (!updated) {
      return res.status(404).json({ message: "Education entry not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Error updating education:", error);
    res.status(500).json({ message: "Failed to update education data" });
  }
};


export const deleteEducation = async (req, res) => {
  try {
    const { registrationNo, id } = req.params;

    const deleted = await  EducationModels.Education.findOneAndDelete({
      _id: id,
      registrationNo
    });

    if (!deleted) {
      return res.status(404).json({ message: "Education entry not found" });
    }

    res.json({ message: "Education deleted successfully" });
  } catch (error) {
    console.error("Error deleting education:", error);
    res.status(500).json({ message: "Failed to delete education entry" });
  }
};
