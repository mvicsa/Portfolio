import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/lib/models/Project';
import { isAuthenticated, isAdmin } from '@/lib/auth';

// GET all projects
export async function GET(req: NextRequest) {
  try {
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
