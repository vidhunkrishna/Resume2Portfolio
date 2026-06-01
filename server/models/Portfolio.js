import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema(
  {
    institution: String,
    degree: String,
    field: String,
    startDate: String,
    endDate: String,
    description: String,
  },
  { _id: false }
);

const experienceSchema = new mongoose.Schema(
  {
    company: String,
    role: String,
    location: String,
    startDate: String,
    endDate: String,
    description: String,
    highlights: [String],
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    technologies: [String],
    url: String,
  },
  { _id: false }
);

const certificationSchema = new mongoose.Schema(
  {
    name: String,
    issuer: String,
    date: String,
    url: String,
  },
  { _id: false }
);

const githubRepoSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    url: String,
    language: String,
    stars: Number,
    forks: Number,
  },
  { _id: false }
);

const githubProfileSchema = new mongoose.Schema(
  {
    username: String,
    name: String,
    bio: String,
    avatarUrl: String,
    publicRepos: Number,
    followers: Number,
    following: Number,
    profileUrl: String,
  },
  { _id: false }
);

const portfolioSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  role: { type: String, default: '' },
  summary: { type: String, default: '' },
  githubUrl: { type: String, default: '' },
  linkedinUrl: { type: String, default: '' },
  skills: { type: [String], default: [] },
  education: { type: [educationSchema], default: [] },
  experience: { type: [experienceSchema], default: [] },
  projects: { type: [projectSchema], default: [] },
  certifications: { type: [certificationSchema], default: [] },
  githubProfile: { type: githubProfileSchema, default: null },
  githubRepos: { type: [githubRepoSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Portfolio', portfolioSchema);
