// controllers/company.controller.js
import {Company} from "../../model/company.model.js";
import cloudinary from "../../util/cloudinary.js";

// GET: Fetch all companies
export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find().sort({ createdAt: -1 });
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch companies", error: error.message });
  }
};

// POST: Add company
export const addCompany = async (req, res) => {
  try {
    const data = req.body;

    // If file uploaded, Cloudinary URL will be available at req.file.path
    if (req.file && req.file.path) {
      data.logoImage = req.file.path;
    }

    const newCompany = new Company(data);
    await newCompany.save();

    res.status(201).json(newCompany);
  } catch (error) {
    res.status(500).json({ message: "Failed to add company", error: error.message });
  }
};

// PUT: Update company
export const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (req.file && req.file.path) {
      data.logoImage = req.file.path;
    }

    const updated = await Company.findByIdAndUpdate(id, data, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update company", error: error.message });
  }
};

// DELETE: Delete company
export const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const record = await Company.findById(id);
    if (!record) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Delete logo from Cloudinary if present
    if (record.logoImage) {
      try {
        const imageParts = record.logoImage.split("/");
        const filename = imageParts.pop();
        const publicId = filename.split(".")[0];
        await cloudinary.v2.uploader.destroy(`company_logos/${publicId}`);
      } catch (cloudErr) {
        console.warn("Cloudinary deletion failed:", cloudErr.message);
      }
    }

    await Company.findByIdAndDelete(id);

    return res.json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete company", error: error.message });
  }
};
