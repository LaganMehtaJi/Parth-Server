import * as Voluntary from "../../model/student.model.js";
import cloudinary  from "../../util/cloudinary.js";

// GET: Fetch all voluntary work for a student
export const getVoluntaryWork = async (req, res) => {
  try {
    const { registrationNo } = req.params;
    const records = await Voluntary.Volunteering.find({ registrationNo }).sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch voluntary work", error: error.message });
  }
};

// POST: Add voluntary work
export const addVoluntaryWork = async (req, res) => {
  try {
    const { registrationNo } = req.params;
    const data = req.body;

    // If file uploaded, Cloudinary URL will be available at req.file.path
    if (req.file && req.file.path) {
      data.image = req.file.path;
    }

    data.registrationNo = registrationNo;
    const newRecord = new Voluntary.Volunteering(data);
    await newRecord.save();

    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ message: "Failed to add voluntary work", error: error.message });
  }
};

// POST: Update voluntary work
export const updateVoluntaryWork = async (req, res) => {
  try {
    const { registrationNo, id } = req.params;
    const data = req.body;

    if (req.file && req.file.path) {
      data.image = req.file.path;
    }

    const updated = await Voluntary.Volunteering.findOneAndUpdate(
      { _id: id, registrationNo },
      data,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Voluntary work not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update voluntary work", error: error.message });
  }
};

// POST: Delete voluntary work
export const deleteVoluntaryWork = async (req, res) => {
  try {
    const { registrationNo, id } = req.params;

    const record = await Voluntary.Volunteering.findOne({ _id: id, registrationNo });
    if (!record) {
      return res.status(404).json({ message: "Voluntary work not found" });
    }

    // Optionally delete image from Cloudinary
    if (record.image) {
      const publicId = record.image.split("/").pop().split(".")[0];
      await cloudinary.v2.uploader.destroy(`voluntary_work/${publicId}`);
    }

    await Voluntary.Volunteering.deleteOne({ _id: id, registrationNo });

    res.json({ message: "Voluntary work deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete voluntary work", error: error.message });
  }
};
