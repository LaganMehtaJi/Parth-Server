import mongoose from "mongoose";

// 1. Company Schema
const companySchema = new mongoose.Schema(
  {
    companyId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    logoImage: {
      type: String, // URL or path
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Company = mongoose.model("Company", companySchema);

// 2. Job Schema
const jobSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company", // Reference to Company
      required: true,
    },
    skills: {
      type: [String], // Array of skill names
      required: true,
    },
    noOfHiringStudents: {
      type: Number,
      default: 0,
    },
    noOfAppliedStudents: {
      type: Number,
      default: 0,
    },
    interestedStudents: {
      type: [String], // Array of registration numbers
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Job = mongoose.model("Job", jobSchema);
