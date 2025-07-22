import mongoose from "mongoose";

const { Schema } = mongoose;


const CompanySchema = new Schema({
  name:        { type: String, required: true },
  logoUrl:     { type: String },
  description: { type: String },
  createdAt:   { type: Date,   default: Date.now }
});

export const Company = mongoose.model('Company', CompanySchema);


const ApplyCountSchema = new Schema({
  company: { type: Schema.Types.ObjectId, ref: 'Company', unique: true },
  count:   { type: Number, default: 0 }
});
export const ApplyCount = mongoose.model('ApplyCount', ApplyCountSchema);


const ResponsibilitySchema = new Schema({
  company:      { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  responsibility: { type: String, required: true }
});

export const Responsibility = mongoose.model('Responsibility', ResponsibilitySchema);

const RequirementSchema = new Schema({
  company:     { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  requirement: { type: String, required: true }
});

export const Requirement = mongoose.model('Requirement', RequirementSchema);

const ResourceSchema = new Schema({
  company:  { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  resource: { type: String, required: true },
  link:     { type: String }     
});

export const Resource = mongoose.model('Resource', ResourceSchema);


