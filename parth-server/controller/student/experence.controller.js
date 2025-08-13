// controllers/experience.controller.js
import * as ExperienceModels from "../../model/student.model.js"; // Import model

// Get all experiences for a student
export const getExperience = async (req, res) => {
  try {
    const { registrationNo } = req.params;
    const experiences = await ExperienceModels.Experience.find({ registrationNo }).sort({ startDate: -1 });

    res.json(experiences);
  } catch (error) {
    console.error("Error fetching experiences:", error);
    res.status(500).json({ message: "Failed to fetch experience data" });
  }
};

// Add a new experience
export const addExperience = async (req, res) => {
  try {
    const { registrationNo } = req.params;
    const {
      title,
      company,
      location,
      startDate,
      endDate,
      currentlyWorking,
      description
    } = req.body;

    const newExperience = new ExperienceModels.Experience({
      registrationNo,
      title,
      company,
      location,
      startDate,
      endDate,
      currentlyWorking,
      description
    });

    const saved = await newExperience.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error adding experience:", error);
    res.status(500).json({ message: "Failed to save experience data" });
  }
};

// Update an experience
export const updateExperience = async (req, res) => {
  try {
    const { registrationNo, id } = req.params;

    const updated = await ExperienceModels.Experience.findOneAndUpdate(
      { _id: id, registrationNo },
      req.body,
      { new: true } // return updated document
    );

    if (!updated) {
      return res.status(404).json({ message: "Experience entry not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Error updating experience:", error);
    res.status(500).json({ message: "Failed to update experience data" });
  }
};

// Delete an experience
export const deleteExperience = async (req, res) => {
  try {
    const { registrationNo, id } = req.params;

    const deleted = await ExperienceModels.Experience.findOneAndDelete({
      _id: id,
      registrationNo
    });

    if (!deleted) {
      return res.status(404).json({ message: "Experience entry not found" });
    }

    res.json({ message: "Experience deleted successfully" });
  } catch (error) {
    console.error("Error deleting experience:", error);
    res.status(500).json({ message: "Failed to delete experience entry" });
  }
};
