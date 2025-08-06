const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    validate: {
      validator: function(url) {
        return validator.isURL(url);
      },
      message: props => `${props.value} is not a valid URL`
    }
  },
  logo: String,
  jobPostings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobPosting'
  }]
});

const Company = mongoose.model('Company', companySchema);


const mongoose = require('mongoose');

const jobPostingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true,
    default: 'Remote'
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  responsibilities: {
    type: [String],
    required: true
  },
  requirements: {
    type: [String],
    required: true
  },
  resources: {
    type: [String],
    validate: {
      validator: function(urls) {
        return urls.every(url => validator.isURL(url));
      },
      message: props => `${props.value} contains invalid URL(s)`
    }
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'closed'],
    default: 'published'
  },
  promotionStatus: {
    isPromoted: Boolean,
    promotedAt: Date
  },
  applicationStats: {
    earlyApplicants: Number,
    totalApplicants: Number,
    lastReviewed: Date
  },
  postedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

jobPostingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const JobPosting = mongoose.model('JobPosting', jobPostingSchema);