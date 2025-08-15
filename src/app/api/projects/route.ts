import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/lib/models/Project';
import { isAuthenticated, isAdmin } from '@/lib/auth';

// GET all projects
export async function GET(req: NextRequest) {
  try {
    // Check if MongoDB URI is configured
    if (!process.env.MONGODB_URI) {
      console.error('MONGODB_URI environment variable is not configured');
      return NextResponse.json(
        { error: 'Database configuration error' },
        { status: 500 }
      );
    }

    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get('featured');
    const category = searchParams.get('category');
    
    const query: {
      featured?: boolean;
      category?: string;
    } = {};
    
    if (featured === 'true') {
      query.featured = true;
    }
    
    if (category) {
      query.category = category;
    }
    
    const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });
    
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('ECONNREFUSED') || error.message.includes('ENOTFOUND')) {
        return NextResponse.json(
          { error: 'Database connection failed' },
          { status: 500 }
        );
      }
      if (error.message.includes('MongoNetworkError')) {
        return NextResponse.json(
          { error: 'Database network error' },
          { status: 500 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST new project (admin only)
export async function POST(req: NextRequest) {
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
    
    const projectData = await req.json();
    const project = new Project(projectData);
    await project.save();
    
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Create project error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
