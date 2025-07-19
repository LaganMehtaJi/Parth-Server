import studentModel from "../../model/Student/student.model.js";

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await studentModel.findById(id);

    if (!student) return res.status(404).json({ message: "Student not found" });

    if (student.isVerified) {
      return res.status(403).json({ message: "Profile is verified and cannot be edited" });
    }

    const { name, email, phone } = req.body;

    student.name = name || student.name;
    student.email = email || student.email;
    student.phone = phone || student.phone;

    await student.save();
    res.status(200).json({ message: "Profile updated", student });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
