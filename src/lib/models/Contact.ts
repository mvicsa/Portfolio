import mongoose from 'mongoose'

export interface IContact {
  name: string
  email: string
  subject: string
  message: string
  ip: string
  status: 'unread' | 'read' | 'replied'
  createdAt: Date
  updatedAt: Date
}

const contactSchema = new mongoose.Schema<IContact>({
  name: {
    type: String,
    required: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    maxlength: 254
  },
  subject: {
    type: String,
    required: true,
    maxlength: 200
  },
  message: {
    type: String,
    required: true,
    maxlength: 2000
  },
  ip: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['unread', 'read', 'replied'],
    default: 'unread'
  }
}, {
  timestamps: true
})

// Create index for better query performance
contactSchema.index({ status: 1, createdAt: -1 })
contactSchema.index({ email: 1 })

export const Contact = mongoose.models.Contact || mongoose.model<IContact>('Contact', contactSchema)
