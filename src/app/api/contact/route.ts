import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Contact } from '@/lib/models/Contact'

// Simple in-memory rate limiting (in production, use Redis or similar)
const submissionCounts = new Map<string, { count: number; resetTime: number }>()

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    const now = Date.now()
    const windowMs = 15 * 60 * 1000 // 15 minutes
    const maxSubmissions = 3 // Max 3 submissions per 15 minutes
    
    // Check rate limit
    const userData = submissionCounts.get(ip)
    if (userData && now < userData.resetTime) {
      if (userData.count >= maxSubmissions) {
        return NextResponse.json(
          { error: 'Too many submissions. Please try again later.' },
          { status: 429 }
        )
      }
      userData.count++
    } else {
      submissionCounts.set(ip, { count: 1, resetTime: now + windowMs })
    }
    
    const body = await request.json()
    let { name, email, subject, message } = body
    
    // Basic sanitization to prevent XSS
    const sanitizeInput = (input: string) => {
      return input
        .trim()
        .replace(/[<>]/g, '') // Remove < and > characters
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+=/gi, '') // Remove event handlers
    }
    
    name = sanitizeInput(name)
    email = sanitizeInput(email)
    subject = sanitizeInput(subject)
    message = sanitizeInput(message)

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate field lengths
    if (name.length > 100) {
      return NextResponse.json(
        { error: 'Name is too long (max 100 characters)' },
        { status: 400 }
      )
    }
    
    if (email.length > 254) {
      return NextResponse.json(
        { error: 'Email is too long' },
        { status: 400 }
      )
    }
    
    if (subject.length > 200) {
      return NextResponse.json(
        { error: 'Subject is too long (max 200 characters)' },
        { status: 400 }
      )
    }
    
    if (message.length > 2000) {
      return NextResponse.json(
        { error: 'Message is too long (max 2000 characters)' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Connect to database
    await connectDB()
    
    // Save contact message to database
    const contact = new Contact({
      name,
      email,
      subject,
      message,
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      status: 'unread'
    })
    
    await contact.save()
    
    // Send email notification (in background)
    try {
      fetch(`${request.nextUrl.origin}/api/contact/notify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, subject, message }),
      }).catch(error => {
        console.error('Failed to send email notification:', error)
      })
    } catch (error) {
      console.error('Error sending email notification:', error)
    }
    
    // Log successful submission
    console.log('Contact form submission saved to database:', { 
      id: contact._id,
      name, 
      email, 
      subject, 
      messageLength: message.length,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    })

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000))

    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact form submitted successfully',
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    
    // Provide more specific error messages
    let errorMessage = 'Internal server error'
    let statusCode = 500
    
    if (error instanceof Error) {
      if (error.message.includes('MongoDB')) {
        errorMessage = 'Database connection error. Please try again later.'
        statusCode = 503
      } else if (error.message.includes('validation')) {
        errorMessage = 'Data validation error: ' + error.message
        statusCode = 400
      } else {
        errorMessage = error.message
      }
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    )
  }
}
