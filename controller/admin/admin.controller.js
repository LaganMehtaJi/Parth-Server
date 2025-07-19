import studentModel from "../../model/Student/student.model.js";
import sendEmail from "../../utils/sendEmail.js";

export const verifyStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    const updatedStudent = await studentModel.findOneAndUpdate(
      { studentId: String(studentId) },
      { isVerified: true },
      { new: true } 
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    console.log(" Verified student:", updatedStudent);

    await sendEmail(
      updatedStudent.email,
      "Verification Completed",
      `Hi ${updatedStudent.name}, your profile has been verified by the Admin.`
    );

    res.status(200).json({ message: "Student verified and email sent", student: updatedStudent });
  } catch (error) {
    console.error("verifyStudent error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};





export const adminEditStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await studentModel.findById(id);

    if (!student) return res.status(404).json({ message: "Student not found" });

    const { name, email, phone } = req.body;

    student.name = name || student.name;
    student.email = email || student.email;
    student.phone = phone || student.phone;

    await student.save();
    res.status(200).json({ message: "Student updated by Admin", student });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
