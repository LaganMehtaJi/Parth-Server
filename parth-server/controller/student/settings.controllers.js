
import * as StudentSettings from "../../model/student.model.js";
import bcrypt from "bcrypt";

// GET: Fetch settings for a student
export const getSettings = async (req, res) => {
  try {
    const { registrationNo } = req.params;
    let settings = await StudentSettings.StudentSetting.findOne({ registrationNo });

    if (!settings) {
      // Return default empty object if no data found
      settings = {
        registrationNo,
        linkedin: "",
        github: "",
        twitter: "",
        portfolio: "",
        email: "",
        emailPassword: ""
      };
      return res.json(settings);
    }

    // Mask password before sending
    const safeSettings = { ...settings.toObject(), emailPassword: "" };

    res.json(safeSettings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    res.status(500).json({ message: "Failed to fetch settings" });
  }
};

// Update LinkedIn
export const updateLinkedin = async (req, res) => {
  try {
    const { registrationNo } = req.params;
    const { linkedin } = req.body;

    await StudentSettings.StudentSetting.updateOne(
      { registrationNo },
      { linkedin: linkedin || "" },
      { upsert: true }
    );

    res.json({ message: "LinkedIn updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update LinkedIn" });
  }
};

// Update GitHub
export const updateGithub = async (req, res) => {
  try {
    const { registrationNo } = req.params;
    const { github } = req.body;

    await StudentSettings.StudentSetting.updateOne(
      { registrationNo },
      { github: github || "" },
      { upsert: true }
    );

    res.json({ message: "GitHub updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update GitHub" });
  }
};

// Update Twitter
export const updateTwitter = async (req, res) => {
  try {
    const { registrationNo } = req.params;
    const { twitter } = req.body;

    await StudentSettings.StudentSetting.updateOne(
      { registrationNo },
      { twitter: twitter || "" },
      { upsert: true }
    );

    res.json({ message: "Twitter updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update Twitter" });
  }
};

// Update Portfolio
export const updatePortfolio = async (req, res) => {
  try {
    const { registrationNo } = req.params;
    const { portfolio } = req.body;

    await StudentSettings.StudentSetting.updateOne(
      { registrationNo },
      { portfolio: portfolio || "" },
      { upsert: true }
    );

    res.json({ message: "Portfolio updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update Portfolio" });
  }
};

// Update Email and Password
export const updateEmail = async (req, res) => {
  try {
    const { registrationNo } = req.params;
    const { email, emailPassword } = req.body;

    let hashedPassword = "";
    if (emailPassword) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(emailPassword, salt);
    }

    await StudentSettings.StudentSetting.updateOne(
      { registrationNo },
      {
        email: email || "",
        ...(hashedPassword && { emailPassword: hashedPassword })
      },
      { upsert: true }
    );

    res.json({ message: "Email credentials updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update Email credentials" });
  }
};
