import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';

export async function GET() {
  try {
    // Check if MongoDB URI is configured
    if (!process.env.MONGODB_URI) {
      console.error('Health check: MONGODB_URI environment variable is not configured');
      return NextResponse.json({
        status: 'error',
        message: 'MONGODB_URI environment variable is not configured',
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }

    console.log('Health check: MONGODB_URI exists, length:', process.env.MONGODB_URI.length);
    console.log('Health check: Attempting database connection...');

    // Test database connection
    await connectDB();
    
    console.log('Health check: Database connection successful');
    
    return NextResponse.json({
      status: 'healthy',
      message: 'Database connection successful',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      mongoUriLength: process.env.MONGODB_URI?.length || 0
    });
  } catch (error) {
    console.error('Health check error:', error);
    console.error('Health check error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    });
    
    return NextResponse.json({
      status: 'unhealthy',
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      mongoUriExists: !!process.env.MONGODB_URI,
      mongoUriLength: process.env.MONGODB_URI?.length || 0
    }, { status: 500 });
  }
}
