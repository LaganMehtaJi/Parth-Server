import express from "express";
import * as StudentObj from "../../controller/student/profile.controller.js";
export const GetStudentProfile = async (req, res) => {
    const { registrationNo } = req.body;
    try {
        if (!registrationNo) {
            return res.status(400).json({ message: "Registration number is required" });
        }
        
        const studentProfile = await StudentObj.Student.findOne({ registrationNo });
        if (!studentProfile) {
            return res.status(404).json({ message: "Student profile not found" });
        }
        return res.status(200).json({ message: "Profile retrieved successfully", studentProfile });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

