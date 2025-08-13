
import * as Student from "../../model/student.model.js"; 
import cloudinary from "../../util/cloudinary.js";

// GET: Fetch all certificates for a student
export const getCertificates = async (req, res) => {
  try {
    const { registrationNo } = req.params;
    const records = await Student.Certificate.find({ registrationNo }).sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch certificates", error: error.message });
  }
};

// POST: Add a certificate
export const addCertificate = async (req, res) => {
  try {
    const { registrationNo } = req.params;
    const data = req.body;

    // If Cloudinary file uploaded
    if (req.file && req.file.path) {
      data.image = req.file.path;
    }

    data.registrationNo = registrationNo;
    const newRecord = new Student.Certificate(data);
    await newRecord.save();

    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ message: "Failed to add certificate", error: error.message });
  }
};

// PUT: Update a certificate
export const updateCertificate = async (req, res) => {
  try {
    const { registrationNo, id } = req.params;
    const data = req.body;

    if (req.file && req.file.path) {
      data.image = req.file.path;
    }

    const updated = await Student.Certificate.findOneAndUpdate(
      { _id: id, registrationNo },
      data,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update certificate", error: error.message });
  }
};

// DELETE: Remove a certificate
export const deleteCertificate = async (req, res) => {
  try {
    const { registrationNo, id } = req.params;

    if (!id || !registrationNo) {
      return res.status(400).json({ message: "Missing id or registrationNo" });
    }

    const record = await Student.Certificate.findOne({ _id: id, registrationNo });
    if (!record) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    // Delete image from Cloudinary if present
    if (record.image) {
      try {
        const imageParts = record.image.split("/");
        const filename = imageParts.pop();
        const publicId = filename.split(".")[0];
        await cloudinary.v2.uploader.destroy(`certificates/${publicId}`);
      } catch (cloudErr) {
        console.warn("Cloudinary deletion failed:", cloudErr.message);
      }
    }

    await Student.Certificate.deleteOne({ _id: id, registrationNo });

    return res.json({ message: "Certificate deleted successfully" });
  } catch (error) {
    console.error("Error deleting certificate:", error);
    return res.status(500).json({
      message: "Failed to delete certificate",
      error: error.message,
    });
  }
};
