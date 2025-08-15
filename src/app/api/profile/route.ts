import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Profile from '@/lib/models/Profile';
import { isAuthenticated, isAdmin } from '@/lib/auth';

// GET profile
export async function GET() {
  try {
    // Check if MongoDB URI is configured
    if (!process.env.MONGODB_URI) {
      console.error('MONGODB_URI environment variable is not configured');
      return NextResponse.json(
        { success: false, error: 'Database configuration error' },
        { status: 500 }
      );
    }

    await connectDB();
    
    let profile = await Profile.findOne();
    console.log('GET: Found profile:', profile);
    console.log('GET: Profile experiences:', profile?.experiences);
    console.log('GET: Profile skills:', profile?.skills);
    
    // If no profile exists, create a default one
    if (!profile) {
      profile = new Profile({
        name: 'Mohamed',
        title: 'MERN Stack Developer',
        bio: 'I craft exceptional digital experiences by combining cutting-edge technology with beautiful design.',
        email: 'mohamed@example.com',
        location: 'Cairo, Egypt',
        avatar: '/avatar.jpg',
        resumeUrl: '/resume.pdf',
        socialLinks: {
          github: 'https://github.com/mohamed',
          linkedin: 'https://linkedin.com/in/mohamed',
        },
        stats: {
          projectsCompleted: 50,
          yearsExperience: 3,
          clientSatisfaction: 100,
        },
        skills: [
          { name: 'React', percentage: 90 },
          { name: 'Node.js', percentage: 85 },
          { name: 'MongoDB', percentage: 80 },
          { name: 'Express', percentage: 85 },
          { name: 'TypeScript', percentage: 75 },
          { name: 'Next.js', percentage: 80 }
        ],
        experiences: [
          {
            title: 'Senior Full Stack Developer',
            company: 'TechCorp',
            period: '2022 - Present',
            description: 'Leading development of enterprise web applications using React, Node.js, and cloud technologies.'
          },
          {
            title: 'Frontend Developer',
            company: 'DigitalAgency',
            period: '2021 - 2022',
            description: 'Built responsive web applications and collaborated with design teams to create exceptional user experiences.'
          },
          {
            title: 'Junior Developer',
            company: 'StartupHub',
            period: '2020 - 2021',
            description: 'Developed features for SaaS platform and learned modern web development practices.'
          }
        ],
      });
      await profile.save();
    } else {
      // Migrate existing skills from old format to new format
      if (profile.skills && profile.skills.length > 0 && typeof profile.skills[0] === 'string') {
        console.log('Migrating old skills format to new format');
        const oldSkills = profile.skills as string[];
        const newSkills = oldSkills.map(skill => ({
          name: skill,
          percentage: 75 // Default percentage for migrated skills
        }));
        
        profile.skills = newSkills;
        await profile.save();
        console.log('Skills migrated successfully:', newSkills);
      }
    }
    
    return NextResponse.json({
      success: true,
      data: profile
    });
  } catch (error) {
    console.error('Get profile error:', error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('ECONNREFUSED') || error.message.includes('ENOTFOUND')) {
        return NextResponse.json(
          { success: false, error: 'Database connection failed' },
          { status: 500 }
        );
      }
      if (error.message.includes('MongoNetworkError')) {
        return NextResponse.json(
          { success: false, error: 'Database network error' },
          { status: 500 }
        );
      }
    }
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT update profile (admin only)
export async function PUT(req: NextRequest) {
  try {
    if (!isAuthenticated(req)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    if (!isAdmin(req)) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }
    
    await connectDB();
    
    const updateData = await req.json();
    console.log('API received update data:', updateData);
    console.log('Experiences in update data:', updateData.experiences);
    
    let profile = await Profile.findOne();
    
    if (profile) {
      // Update existing profile
      console.log('Updating existing profile');
      Object.assign(profile, updateData);
      await profile.save();
      console.log('Profile saved with experiences:', profile.experiences);
    } else {
      // Create new profile
      console.log('Creating new profile');
      profile = new Profile(updateData);
      await profile.save();
      console.log('New profile created with experiences:', profile.experiences);
    }
    
    return NextResponse.json({
      success: true,
      data: profile
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
