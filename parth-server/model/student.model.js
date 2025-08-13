import mongoose from "mongoose";
const { Schema } = mongoose;

// ==============================
// 🧑‍🎓 Student Schema
// ==============================


const studentSchema = new Schema({
  registrationNo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 20
  },
  password:{
    type: String,
    required: true,
  },
  rollNo: {
    type: String,
    trim: true,
    maxlength: 20
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
  },
  phone: {
    type: String,
    trim: true,
    validate: v => /^[0-9]{10,15}$/.test(v)
  },
 field: {
    type: String,
    default: "Web-Developer",
  },
  batchYear: {
    type: Number,
    required: true,
    default: new Date().getFullYear()
  },
  profilePic: {
    type: String,
    default: "https://res.cloudinary.com/dbeqhfbpk/image/upload/v1753455162/logoBlack_fwyfer.png",
  },
  verify: {
    type: Boolean,
    default: false
  },
  address: String,
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true
  }
}, { timestamps: true });

studentSchema.index({ registrationNo: 1 });
studentSchema.index({ email: 1 });
studentSchema.index({ batchYear: 1, field: 1 });

// ==============================
// 🧠 Skill Schema
// ==============================
const skillSchema = new Schema({
  registrationNo: { type: String, required: true, ref: "Student" },
  skill: { type: String, required: true },
  proficiency: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    default: 'Beginner'
  }
}, { timestamps: true });

// ==============================
// 🎓 Education Schema
// ==============================
const educationSchema = new mongoose.Schema({
 registrationNo: { type: String, required: true, ref: "Student" },
  institution: {
    type: String,
    required: true,
    trim: true
  },
  degree: {
    type: String,
    required: true,
    trim: true
  },
  fieldOfStudy: {
    type: String,
    required: true,
    trim: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: false // can be null for "Present"
  },
  grade: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  batchYear: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true // adds createdAt & updatedAt
});


// ==============================
// 💼 Project Schema
// ==============================
const projectSchema = new Schema({
  registrationNo: { type: String, required: true, ref: "Student" },
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: { type: String, required: true },
  link: { type: String, required: true },
  logo: {
    type: String,
    default: 'https://res.cloudinary.com/dbeqhfbpk/image/upload/v1753455162/logoBlack_fwyfer.png',
  },
  featured: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
  
}, { timestamps: true });

// ==============================
// 💼 Experience Schema
// ==============================
const experienceSchema = new mongoose.Schema(
  {
   registrationNo: { type: String, required: true, ref: "Student" },
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
    },
    currentlyWorking: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
  },
  { timestamps: true } // will create createdAt and updatedAt automatically
);
// ==============================
// 🤝 Volunteering Schema
// ==============================
const volunteeringSchema = new mongoose.Schema({
  registrationNo: { type: String, required: true, ref: "Student" },
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  description: {
    type: String,
    required: [true, "Description is required"]
  },
  organization: {
    type: String,
    required: [true, "Organization is required"]
  },
  date: {
    type: String, // keeping string because your form sends YYYY-MM-DD as string
    required: [true, "Date is required"]
  },
  category: {
    type: String,
    enum: ["Health", "Education", "Environment", "Community", "Disaster Relief"],
    required: [true, "Category is required"]
  },
  link: {
    type: String,
    validate: {
      validator: function (v) {
        if (!v) return true; // allow empty
        return /^https?:\/\/.+\..+/.test(v);
      },
      message: "Must be a valid URL"
    }
  },
  image: {
    type: String, // will store URL or local path
    required: [true, "Image is required"]
  },
}, {
  timestamps: true // adds createdAt & updatedAt
});
// ==============================
// 🏢 Company Schema
// ==============================
const companySchema = new Schema({
  name: { type: String, required: true },
  logoUrl: {
    type: String,
    validate: v => /^https?:\/\/.+\.(jpg|jpeg|png|webp|svg|gif)?$/i.test(v)
  },
  description: String
}, { timestamps: true });

// ==============================
// 📄 Job Schema
// ==============================
const jobSchema = new Schema({
  name: { type: String, required: true },
  description: String
}, { timestamps: true });

// ==============================
// 📊 Application Count Schemas
// ==============================
const applyCompanyCountSchema = new Schema({
  company: { type: Schema.Types.ObjectId, ref: 'Company', unique: true },
  count: { type: Number, default: 0 }
});
const applyJobCountSchema = new Schema({
  job: { type: Schema.Types.ObjectId, ref: 'Job', unique: true },
  count: { type: Number, default: 0 }
});

// ==============================
// 📋 Responsibility / Requirement / Resource
// ==============================
const requirementSchema = new Schema({
  job: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
  requirement: { type: String, required: true }
});

const resourceSchema = new Schema({
  job: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
  resource: { type: String, required: true },
  link: {
    type: String,
    validate: v => /^https?:\/\/.+/.test(v)
  }
});

const responsibilitySchema = new Schema({
  company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  responsibility: { type: String, required: true }
});

// ==============================
// 🧪 Round Schema
// ==============================
const roundSchema = new Schema({
  companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  name: { type: String, required: true, trim: true },
  roundType: {
    type: String,
    enum: ['Online Test', 'Technical Interview', 'HR Interview', 'Group Discussion', 'Managerial', 'Final'],
    default: 'Technical Interview'
  },
  description: String,
  roundDate: Date,
  duration: String,
  mode: {
    type: String,
    enum: ['Online', 'Offline', 'Hybrid'],
    default: 'Online'
  }
}, { timestamps: true });


const certificateSchema = new mongoose.Schema(
  {
   registrationNo: { type: String, required: true, ref: "Student" },
    title: {
      type: String,
      required: [true, "Certificate title is required"],
      trim: true
    },
    description: {
      type: String,
      required: [true, "Certificate description is required"],
      trim: true
    },
    image: {
      type: String, // Store image URL from upload
      required: [true, "Certificate image is required"]
    },
    link: {
      type: String, // Verification link
      required: [true, "Verification link is required"],
      validate: {
        validator: (v) => /^https?:\/\/.+\..+/.test(v),
        message: "Invalid URL format"
      }
    },
    date: {
      type: String, // MM/YYYY format
      required: [true, "Certificate date is required"]
    },
    issuer: {
      type: String,
      required: [true, "Certificate issuer is required"],
      trim: true
    },
    category: {
      type: String,
      enum: ["Business", "Technology", "Cloud Computing", "Design", "Marketing"],
      default: "Technology"
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt
  }
);


const studentSettingsSchema = new mongoose.Schema(
  {
    registrationNo: { type: String, required: true, ref: "Student" },
    linkedin: {
      type: String,
      trim: true,
      default: ""
    },
    github: {
      type: String,
      trim: true,
      default: ""
    },
    twitter: {
      type: String,
      trim: true,
      default: ""
    },
    portfolio: {
      type: String,
      trim: true,
      default: ""
    },
    email: {
      type: String,
      trim: true,
      default: "",
      lowercase: true
    },
    emailPassword: {
      type: String,
      default: "" // Will store hashed password instead of plain text
    }
  },
  {
    timestamps: true
  }
);




// ==============================
// 📦 Model Exports
// ==============================
const Student = mongoose.model("Student", studentSchema);
const StudentSetting  = mongoose.model("StudentSettings", studentSettingsSchema);
const Skill = mongoose.model("Skill", skillSchema);
const Education = mongoose.model("Education", educationSchema);
const Project = mongoose.model("Project", projectSchema);        //done
const Experience = mongoose.model("Experience", experienceSchema);
const Volunteering = mongoose.model("Volunteering", volunteeringSchema);
const Company = mongoose.model("Company", companySchema);
const Job = mongoose.model("Job", jobSchema);
const Round = mongoose.model("Round", roundSchema);
const ApplyCompanyCount = mongoose.model("ApplyCompanyCount", applyCompanyCountSchema);
const ApplyJobCount = mongoose.model("ApplyJobCount", applyJobCountSchema);
const Requirement = mongoose.model("Requirement", requirementSchema);
const Resource = mongoose.model("Resource", resourceSchema);
const Responsibility = mongoose.model("Responsibility", responsibilitySchema);
const Certificate = mongoose.model("Certificate", certificateSchema);

// ==============================
// 📤 Export All
// ==============================
export {
  StudentSetting,
  Certificate,
  Student,
  Skill,
  Education,
  Project,
  Experience,
  Volunteering,
  Company,
  Job,
  Round,
  ApplyCompanyCount,
  ApplyJobCount,
  Requirement,
  Resource,
  Responsibility
};
