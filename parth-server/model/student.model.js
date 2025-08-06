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
const educationSchema = new Schema({
  registrationNo: { type: String, required: true, ref: "Student" },
  institution: String,
  degree: String,
  fieldOfStudy: String,
  startDate: Date,
  endDate: Date,
  grade: String,
  description: String,
  batchYear: Number
}, { timestamps: true });

// ==============================
// 💼 Project Schema
// ==============================
const projectSchema = new Schema({
  registrationNo: { type: String, required: true, ref: "Student" },
  title: String,
  description: String,
  link: {
    type: String,
    validate: v => /^https?:\/\/.+/.test(v)
  },
  technologies: [String],
  startDate: Date,
  endDate: Date
}, { timestamps: true });

// ==============================
// 💼 Experience Schema
// ==============================
const experienceSchema = new Schema({
  registrationNo: { type: String, required: true, ref: "Student" },
  title: String,
  company: String,
  location: String,
  startDate: Date,
  endDate: Date,
  description: String
}, { timestamps: true });

// ==============================
// 🤝 Volunteering Schema
// ==============================
const volunteeringSchema = new Schema({
  registrationNo: { type: String, required: true, ref: "Student" },
  organization: String,
  role: String,
  cause: String,
  startDate: Date,
  endDate: Date,
  description: String
}, { timestamps: true });

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

// ==============================
// 📦 Model Exports
// ==============================
const Student = mongoose.model("Student", studentSchema);
const Skill = mongoose.model("Skill", skillSchema);
const Education = mongoose.model("Education", educationSchema);
const Project = mongoose.model("Project", projectSchema);
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

// ==============================
// 📤 Export All
// ==============================
export {
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
