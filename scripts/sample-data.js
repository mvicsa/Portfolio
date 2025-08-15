const mongoose = require('mongoose');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable');
  process.exit(1);
}

// Project Schema
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  shortDescription: String,
  image: String,
  technologies: [String],
  githubUrl: String,
  liveUrl: String,
  featured: Boolean,
  order: Number,
  category: String,
}, {
  timestamps: true,
});

// Profile Schema
const profileSchema = new mongoose.Schema({
  name: String,
  title: String,
  bio: String,
  email: String,
  phone: String,
  location: String,
  avatar: String,
  resumeUrl: String,
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String,
    instagram: String,
  },
  stats: {
    projectsCompleted: Number,
    yearsExperience: Number,
    clientSatisfaction: Number,
  },
  skills: [String],
  experiences: [{
    title: String,
    company: String,
    period: String,
    description: String,
  }],
}, {
  timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);
const Profile = mongoose.model('Profile', profileSchema);

async function addSampleData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Project.deleteMany({});
    await Profile.deleteMany({});
    console.log('Cleared existing data');

    // Add sample projects
    const sampleProjects = [
      {
        title: "E-Commerce Platform",
        description: "A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, product management, payment integration, and admin dashboard.",
        shortDescription: "Full-stack e-commerce platform with modern tech stack",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
        technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
        githubUrl: "https://github.com/example/ecommerce",
        liveUrl: "https://ecommerce-demo.com",
        featured: true,
        order: 1,
        category: "web"
      },
      {
        title: "Task Management App",
        description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
        shortDescription: "Collaborative task management with real-time updates",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop",
        technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Socket.io"],
        githubUrl: "https://github.com/example/taskapp",
        liveUrl: "https://taskapp-demo.com",
        featured: true,
        order: 2,
        category: "web"
      },
      {
        title: "Portfolio Website",
        description: "A modern, responsive portfolio website built with Next.js and Tailwind CSS, featuring smooth animations and optimal performance.",
        shortDescription: "Modern portfolio with Next.js and Tailwind CSS",
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=250&fit=crop",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
        githubUrl: "https://github.com/example/portfolio",
        liveUrl: "https://portfolio-demo.com",
        featured: false,
        order: 3,
        category: "web"
      },
      {
        title: "Weather Dashboard",
        description: "A weather application that displays current weather conditions and forecasts using OpenWeatherMap API with beautiful visualizations.",
        shortDescription: "Weather app with OpenWeatherMap API integration",
        image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=400&h=250&fit=crop",
        technologies: ["React", "Chart.js", "OpenWeatherMap API", "CSS Modules"],
        githubUrl: "https://github.com/example/weather",
        liveUrl: "https://weather-demo.com",
        featured: false,
        order: 4,
        category: "web"
      },
      {
        title: "Mobile Fitness App",
        description: "Cross-platform mobile fitness application with workout tracking, progress monitoring, and social features.",
        shortDescription: "Cross-platform fitness app with workout tracking",
        image: "https://images.unsplash.com/photo-1571019613452-5cb35a0f45fa?w=400&h=250&fit=crop",
        technologies: ["React Native", "Firebase", "Redux", "Expo", "Native Base"],
        githubUrl: "https://github.com/example/fitness",
        liveUrl: "https://fitness-demo.com",
        featured: false,
        order: 5,
        category: "mobile"
      }
    ];

    await Project.insertMany(sampleProjects);
    console.log('Added sample projects');

    // Add sample profile
    const sampleProfile = {
      name: "Mohamed",
      title: "MERN Stack Developer",
      bio: "I craft exceptional digital experiences by combining cutting-edge technology with beautiful design. From concept to deployment, I bring ideas to life with passion and precision.",
      email: "mohamed@example.com",
      phone: "+20 123 456 789",
      location: "Cairo, Egypt",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      resumeUrl: "/resume.pdf",
      socialLinks: {
        github: "https://github.com/mohamed",
        linkedin: "https://linkedin.com/in/mohamed",
        twitter: "https://twitter.com/mohamed",
        instagram: "https://instagram.com/mohamed"
      },
      stats: {
        projectsCompleted: 50,
        yearsExperience: 3,
        clientSatisfaction: 100
      },
      skills: ["React", "Node.js", "MongoDB", "Express", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
      experiences: [
        {
          title: "Senior Full Stack Developer",
          company: "TechCorp",
          period: "2022 - Present",
          description: "Leading development of enterprise web applications using React, Node.js, and cloud technologies."
        },
        {
          title: "Frontend Developer",
          company: "DigitalAgency",
          period: "2021 - 2022",
          description: "Built responsive web applications and collaborated with design teams to create exceptional user experiences."
        },
        {
          title: "Junior Developer",
          company: "StartupHub",
          period: "2020 - 2021",
          description: "Developed features for SaaS platform and learned modern web development practices."
        }
      ]
    };

    await Profile.create(sampleProfile);
    console.log('Added sample profile');

    console.log('✅ Sample data added successfully!');
    console.log('📊 Projects:', sampleProjects.length);
    console.log('👤 Profile created');

  } catch (error) {
    console.error('Error adding sample data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

addSampleData();
