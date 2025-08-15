import mongoose from 'mongoose';

export interface IProject extends mongoose.Document {
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new mongoose.Schema<IProject>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
    maxlength: 200,
  },
  image: {
    type: String,
    required: true,
  },
  technologies: [{
    type: String,
    required: true,
  }],
  githubUrl: {
    type: String,
    trim: true,
  },
  liveUrl: {
    type: String,
    trim: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'desktop', 'other'],
  },
}, {
  timestamps: true,
});

export default mongoose.models.Project || mongoose.model<IProject>('Project', projectSchema);
