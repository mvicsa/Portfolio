import mongoose from 'mongoose';

export interface IProfile extends mongoose.Document {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone?: string;
  location: string;
  avatar: string;
  resumeUrl: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  stats: {
    projectsCompleted: number;
    yearsExperience: number;
    clientSatisfaction: number;
  };
  skills: {
    name: string;
    percentage: number;
  }[];
  experiences: {
    title: string;
    company: string;
    period: string;
    description: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const profileSchema = new mongoose.Schema<IProfile>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  bio: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  resumeUrl: {
    type: String,
    required: true,
  },
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String,
    instagram: String,
  },
  stats: {
    projectsCompleted: {
      type: Number,
      default: 0,
    },
    yearsExperience: {
      type: Number,
      default: 0,
    },
    clientSatisfaction: {
      type: Number,
      default: 100,
    },
  },
  skills: [{
    name: {
      type: String,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      default: 50,
    },
  }],
  experiences: [{
    title: String,
    company: String,
    period: String,
    description: String,
  }],
}, {
  timestamps: true,
});

// Migration function to convert old skills format to new format
profileSchema.pre('find', function() {
  // This will run before any find operation
  // We'll handle the migration in the API route instead
});

export default mongoose.models.Profile || mongoose.model<IProfile>('Profile', profileSchema);
