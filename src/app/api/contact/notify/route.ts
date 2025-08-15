import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Here you would integrate with your preferred email service
    // Examples: Resend, SendGrid, Nodemailer, etc.
    
    // For now, we'll simulate sending an email
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@mvicsa.dev';
    const noreplyEmail = process.env.NOREPLY_EMAIL || 'noreply@mvicsa.dev';
    
    console.log('Sending email notification:', {
      to: adminEmail,
      from: noreplyEmail,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><em>This message was sent from your portfolio contact form.</em></p>
      `
    })

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // In production, you would use something like:
    /*
    import { Resend } from 'resend'
    
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    const { data, error } = await resend.emails.send({
      from: process.env.NOREPLY_EMAIL || 'noreply@mvicsa.dev',
      to: process.env.ADMIN_EMAIL || 'admin@mvicsa.dev',
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><em>This message was sent from your portfolio contact form.</em></p>
      `
    })
    
    if (error) {
      throw new Error(error.message)
    }
    */

    return NextResponse.json({
      success: true,
      message: 'Email notification sent successfully'
    })

  } catch (error) {
    console.error('Error sending email notification:', error)
    return NextResponse.json(
      { error: 'Failed to send email notification' },
      { status: 500 }
    )
  }
}
