const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
async function connectDB() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not configured');
    }
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// Sample projects data
const sampleProjects = [
  {
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features include dark/light mode, smooth animations, and a contact form.',
    imageUrl: '/portfolio.jpg',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/username/portfolio',
    liveUrl: 'https://portfolio.example.com',
    featured: true,
    order: 1,
    category: 'Web Development'
  },
  {
    title: 'E-commerce Platform',
    description: 'Full-stack e-commerce solution with user authentication, product management, shopping cart, and payment integration using Stripe.',
    imageUrl: '/ecommerce.jpg',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Express'],
    githubUrl: 'https://github.com/username/ecommerce',
    liveUrl: 'https://ecommerce.example.com',
    featured: true,
    order: 2,
    category: 'Full Stack'
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    imageUrl: '/taskapp.jpg',
    technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB', 'Material-UI'],
    githubUrl: 'https://github.com/username/taskapp',
    liveUrl: 'https://taskapp.example.com',
    featured: false,
    order: 3,
    category: 'Web Application'
  },
  {
    title: 'Weather Dashboard',
    description: 'Real-time weather application with location-based forecasts, interactive maps, and historical weather data visualization.',
    imageUrl: '/weather.jpg',
    technologies: ['Vue.js', 'OpenWeather API', 'Chart.js', 'CSS Grid'],
    githubUrl: 'https://github.com/username/weather',
    liveUrl: 'https://weather.example.com',
    featured: false,
    order: 4,
    category: 'Web Application'
  },
  {
    title: 'Social Media Clone',
    description: 'A social media platform with user profiles, posts, comments, likes, and real-time notifications using WebSockets.',
    imageUrl: '/social.jpg',
    technologies: ['React', 'Node.js', 'Socket.io', 'PostgreSQL', 'Redis'],
    githubUrl: 'https://github.com/username/social',
    liveUrl: 'https://social.example.com',
    featured: false,
    order: 5,
    category: 'Full Stack'
  }
];

// Add sample projects to database
async function addSampleProjects() {
  try {
    await connectDB();
    
    // Clear existing projects
    const Project = mongoose.model('Project');
    await Project.deleteMany({});
    console.log('Cleared existing projects');
    
    // Add new sample projects
    const result = await Project.insertMany(sampleProjects);
    console.log(`Added ${result.length} sample projects to database`);
    
    // Display added projects
    result.forEach(project => {
      console.log(`- ${project.title} (${project.category})`);
    });
    
    console.log('\nSample projects added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error adding sample projects:', error);
    process.exit(1);
  }
}

// Run the script
addSampleProjects();
