import express from "express";
import * as StudentObj from "../../model/student.model.js";

export const GetStudentProfile = async (req, res) => {
  const { registrationNo } = req.params;

  console.log("Registration No:", registrationNo);

  if (!registrationNo) {
    return res.status(400).json({ message: "Registration number is required" });
  }

  try {
    const studentProfile = await StudentObj.Student.findOne({ registrationNo });
    console.log("Student Profile:", studentProfile);
    if (!studentProfile) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    const [skills, education, projects, experiences, volunteering ,StudentSetting] = await Promise.all([
      StudentObj.Skill.find({ registrationNo }),
      StudentObj.Education.find({ registrationNo }),
      StudentObj.Project.find({ registrationNo }),
      StudentObj.Experience.find({ registrationNo }),
      StudentObj.Volunteering.find({ registrationNo }),
      StudentObj.StudentSetting.find({registrationNo})
    ]);

    return res.status(200).json({
      message: "Profile retrieved successfully",
      studentProfile,
      skills,
      education,
      projects,
      experiences,
      volunteering,
      StudentSetting
    });

  } catch (error) {
    console.error("Error fetching student profile:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
