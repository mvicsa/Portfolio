import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'

export async function GET() {
  try {
    console.log('Testing MongoDB connection...')
    
    // Test database connection
    await connectDB()
    
    console.log('MongoDB connection successful!')
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('MongoDB connection error:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown database error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
