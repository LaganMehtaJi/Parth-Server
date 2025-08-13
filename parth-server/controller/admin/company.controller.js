import { companyData } from "../../model/company.model.js";

export const addCompany = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: "Name and description are required" });
    }

    const logoUrl = req.file?.path || "";

    const newCompany = await companyData.create({
      name,
      description,
      logo: logoUrl
    });

    res.status(201).json({
      message: "Company added successfully",
      company: newCompany
    });
  } catch (error) {
    console.error("Error adding company:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
