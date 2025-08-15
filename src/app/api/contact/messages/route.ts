import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Contact } from '@/lib/models/Contact'

export async function GET(request: NextRequest) {
  try {
    // Connect to database
    await connectDB()
    
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status') || 'all'
    const search = searchParams.get('search') || ''
    
    // Build query
    const query: {
      status?: string;
      $or?: Array<{
        name?: { $regex: string; $options: string };
        email?: { $regex: string; $options: string };
        subject?: { $regex: string; $options: string };
        message?: { $regex: string; $options: string };
      }>;
    } = {}
    
    if (status !== 'all') {
      query.status = status
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ]
    }
    
    // Calculate skip value for pagination
    const skip = (page - 1) * limit
    
    // Get messages with pagination
    const messages = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v')
    
    // Get total count for pagination
    const total = await Contact.countDocuments(query)
    
    // Get counts by status
    const statusCounts = await Contact.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ])
    
    const counts = {
      unread: 0,
      read: 0,
      replied: 0,
      total: total
    }
    
    statusCounts.forEach((item: { _id: string; count: number }) => {
      if (item._id in counts) {
        counts[item._id as keyof typeof counts] = item.count
      }
    })
    
    return NextResponse.json({
      messages,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      counts
    })
    
  } catch (error) {
    console.error('Error fetching contact messages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { messageId, status } = body
    
    if (!messageId || !status) {
      return NextResponse.json(
        { error: 'Message ID and status are required' },
        { status: 400 }
      )
    }
    
    // Connect to database
    await connectDB()
    
    // Update message status
    const updatedMessage = await Contact.findByIdAndUpdate(
      messageId,
      { status },
      { new: true }
    ).select('-__v')
    
    if (!updatedMessage) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      message: 'Status updated successfully',
      data: updatedMessage
    })
    
  } catch (error) {
    console.error('Error updating message status:', error)
    return NextResponse.json(
      { error: 'Failed to update message status' },
      { status: 500 }
    )
  }
}
