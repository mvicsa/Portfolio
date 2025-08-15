const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable');
  process.exit(1);
}

mongoose.connect(MONGODB_URI);

// Import Profile model
const Profile = require('../src/lib/models/Profile').default;

async function migrateSkills() {
  try {
    console.log('Starting skills migration...');
    
    // Find all profiles
    const profiles = await Profile.find({});
    console.log(`Found ${profiles.length} profiles to migrate`);
    
    for (const profile of profiles) {
      // Check if skills need migration (old format: string[])
      if (profile.skills && profile.skills.length > 0 && typeof profile.skills[0] === 'string') {
        console.log(`Migrating profile: ${profile.name}`);
        console.log('Old skills:', profile.skills);
        
        // Convert old skills to new format
        const newSkills = profile.skills.map(skill => ({
          name: skill,
          percentage: 75 // Default percentage
        }));
        
        // Update profile
        profile.skills = newSkills;
        await profile.save();
        
        console.log('New skills:', newSkills);
        console.log('Migration completed for this profile');
      } else {
        console.log(`Profile ${profile.name} already has correct skills format`);
      }
    }
    
    console.log('Skills migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  }
}

// Run migration
migrateSkills();
