#!/usr/bin/env node

/**
 * Demo script for the About Me section with backend functionality
 * This script demonstrates how to interact with the profile API
 */

const fetch = require('node-fetch');

const API_BASE = 'http://localhost:3000/api';

async function demoAboutMeSection() {
  console.log('🚀 MVICSA Portfolio - About Me Section Demo\n');
  
  try {
    // 1. Fetch current profile data
    console.log('📡 Fetching current profile data...');
    const profileResponse = await fetch(`${API_BASE}/profile`);
    
    if (!profileResponse.ok) {
      throw new Error(`Failed to fetch profile: ${profileResponse.status}`);
    }
    
    const profile = await profileResponse.json();
    console.log('✅ Profile loaded successfully!\n');
    
    // 2. Display current profile information
    console.log('👤 Current Profile Information:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Name: ${profile.name}`);
    console.log(`Title: ${profile.title}`);
    console.log(`Location: ${profile.location}`);
    console.log(`Email: ${profile.email}`);
    if (profile.phone) {
      console.log(`Phone: ${profile.phone}`);
    }
    console.log(`Bio: ${profile.bio.substring(0, 100)}...`);
    console.log(`Projects Completed: ${profile.stats.projectsCompleted}`);
    console.log(`Years Experience: ${profile.stats.yearsExperience}`);
    console.log(`Client Satisfaction: ${profile.stats.clientSatisfaction}%`);
    console.log(`Skills: ${profile.skills.join(', ')}`);
    
    if (profile.socialLinks.github) {
      console.log(`GitHub: ${profile.socialLinks.github}`);
    }
    if (profile.socialLinks.linkedin) {
      console.log(`LinkedIn: ${profile.socialLinks.linkedin}`);
    }
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    // 3. Show what can be managed through admin
    console.log('🎛️  What You Can Manage Through Admin Dashboard:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('• Basic Information (name, title, bio, contact)');
    console.log('• Social Media Links (GitHub, LinkedIn, Twitter, Instagram)');
    console.log('• Skills (add/remove dynamically)');
    console.log('• Statistics (projects, experience, satisfaction)');
    console.log('• Avatar and resume URLs');
    console.log('• All changes are immediately reflected on the frontend');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    // 4. Show API endpoints
    console.log('🔌 Available API Endpoints:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('GET  /api/profile     - Fetch profile data (public)');
    console.log('PUT  /api/profile     - Update profile (admin only)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    // 5. Show how to access admin
    console.log('🔐 Accessing Admin Dashboard:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('1. Go to: http://localhost:3000/admin/login');
    console.log('2. Login with: admin / admin123');
    console.log('3. Navigate to Profile tab');
    console.log('4. Click "Edit Profile" to make changes');
    console.log('5. All changes are saved to MongoDB');
    console.log('6. Frontend automatically updates with new data');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    // 6. Show frontend features
    console.log('✨ Frontend Features:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('• Dynamic skill bars with automatic icon mapping');
    console.log('• Responsive design for all devices');
    console.log('• Smooth animations with Framer Motion');
    console.log('• Interactive social media links');
    console.log('• Resume download functionality');
    console.log('• Achievement statistics display');
    console.log('• Contact information with clickable links');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    // 7. Show customization options
    console.log('🎨 Customization Options:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('• Add new skills through admin panel');
    console.log('• Skills automatically get appropriate icons');
    console.log('• Dynamic color schemes for skill bars');
    console.log('• Customizable social media links');
    console.log('• Flexible bio and description fields');
    console.log('• Configurable statistics and achievements');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    console.log('🎉 Demo completed successfully!');
    console.log('💡 Try making changes in the admin panel and see them reflected on the frontend!');
    
  } catch (error) {
    console.error('❌ Error during demo:', error.message);
    console.log('\n💡 Make sure:');
    console.log('1. MongoDB is running');
    console.log('2. Development server is started (npm run dev)');
    console.log('3. Sample data has been added (npm run add-sample-data)');
    console.log('4. Admin user has been created (npm run setup-admin)');
  }
}

// Run the demo
if (require.main === module) {
  demoAboutMeSection();
}

module.exports = { demoAboutMeSection };
