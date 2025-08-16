"use client"

import { useState, useEffect } from 'react'
import { Save, User, FileText, Github, Linkedin, Twitter, Instagram, Code, Plus, Trash2, Globe, Briefcase, Calendar, Star, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { motion } from 'framer-motion'
import { useLoadingState } from '@/hooks/useLoadingState'

interface Skill {
  name: string
  percentage: number
}

interface Profile {
  _id: string
  name: string
  title: string
  bio: string
  email: string
  phone?: string
  location: string
  avatar: string
  resumeUrl: string
  socialLinks: {
    github?: string
    linkedin?: string
    twitter?: string
    instagram?: string
  }
  stats: {
    projectsCompleted: number
    yearsExperience: number
    clientSatisfaction: number
  }
  skills: Skill[]
  experiences: {
    title: string
    company: string
    period: string
    description: string
  }[]
}

interface ProfileFormProps {
  profile: Profile | null
  onSave: (profileData: Partial<Profile>) => void
  onCancel: () => void
}

export default function ProfileForm({ profile, onSave, onCancel }: ProfileFormProps) {
  const [formData, setFormData] = useState<Partial<Profile>>({
    name: '',
    title: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    avatar: '',
    resumeUrl: '',
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      instagram: '',
    },
    stats: {
      projectsCompleted: 0,
      yearsExperience: 0,
      clientSatisfaction: 100,
    },
    skills: [],
    experiences: [],
  })
  const [newSkill, setNewSkill] = useState('')
  const [skillPercentage, setSkillPercentage] = useState(0)
  const { isLoading, startLoading, stopLoading } = useLoadingState()

  useEffect(() => {
    if (profile) {
      console.log('ProfileForm received profile:', profile)
      console.log('Profile skills:', profile.skills)
      setFormData({
        name: profile.name || '',
        title: profile.title || '',
        bio: profile.bio || '',
        email: profile.email || '',
        phone: profile.phone || '',
        location: profile.location || '',
        avatar: profile.avatar || '',
        resumeUrl: profile.resumeUrl || '',
        socialLinks: {
          github: profile.socialLinks?.github || '',
          linkedin: profile.socialLinks?.linkedin || '',
          twitter: profile.socialLinks?.twitter || '',
          instagram: profile.socialLinks?.instagram || '',
        },
        stats: {
          projectsCompleted: profile.stats?.projectsCompleted || 0,
          yearsExperience: profile.stats?.yearsExperience || 0,
          clientSatisfaction: profile.stats?.clientSatisfaction || 100,
        },
        skills: profile.skills || [],
        experiences: profile.experiences || [],
      })
      console.log('FormData skills set to:', profile.skills || [])
    }
  }, [profile])

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof Profile] as Record<string, string>),
          [child]: value,
        },
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  const addSkill = () => {
    if (newSkill.trim() && skillPercentage > 0) {
      setFormData(prev => ({
        ...prev,
        skills: [...(prev.skills || []), { name: newSkill.trim(), percentage: skillPercentage }],
      }))
      setNewSkill('')
      setSkillPercentage(0)
    }
  }

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills?.filter((_, i) => i !== index) || [],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
          startLoading()
    
    try {
      console.log('Saving profile data:', formData)
      console.log('Experiences to save:', formData.experiences)
      await onSave(formData)
    } catch (error) {
      console.error('Error saving profile:', error)
    } finally {
      stopLoading()
    }
  }

  // Debug logging
  console.log('ProfileForm render - formData.skills:', formData.skills)
  console.log('ProfileForm render - profile?.skills:', profile?.skills)

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Enhanced Basic Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border-blue-500/20 shadow-xl transition-all duration-500 ease-out hover:shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center space-x-3 text-xl">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                  <User className="h-5 w-5 text-white" />
                </div>
                <span className="text-card-foreground">Basic Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div 
                  className="space-y-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Label htmlFor="name" className="text-sm font-semibold text-card-foreground">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    required
                    className="transition-all duration-300 ease-out focus:scale-[1.02] focus:shadow-lg border-border/50 focus:border-blue-500/50"
                  />
                </motion.div>
                <motion.div 
                  className="space-y-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Label htmlFor="title" className="text-sm font-semibold text-card-foreground">Professional Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., Full Stack Developer"
                    required
                    className="transition-all duration-300 ease-out focus:scale-[1.02] focus:shadow-lg border-border/50 focus:border-blue-500/50"
                  />
                </motion.div>
                <motion.div 
                  className="space-y-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Label htmlFor="email" className="text-sm font-semibold text-card-foreground">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="transition-all duration-300 ease-out focus:scale-[1.02] focus:shadow-lg border-border/50 focus:border-blue-500/50"
                  />
                </motion.div>
                <motion.div 
                  className="space-y-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Label htmlFor="phone" className="text-sm font-semibold text-card-foreground">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="transition-all duration-300 ease-out focus:scale-[1.02] focus:shadow-lg border-border/50 focus:border-blue-500/50"
                  />
                </motion.div>
                <motion.div 
                  className="space-y-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Label htmlFor="location" className="text-sm font-semibold text-card-foreground">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="City, Country"
                    required
                    className="transition-all duration-300 ease-out focus:scale-[1.02] focus:shadow-lg border-border/50 focus:border-blue-500/50"
                  />
                </motion.div>
                <motion.div 
                  className="space-y-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Label htmlFor="avatar" className="text-sm font-semibold text-card-foreground">Avatar URL</Label>
                  <Input
                    id="avatar"
                    value={formData.avatar}
                    onChange={(e) => handleInputChange('avatar', e.target.value)}
                    placeholder="https://example.com/avatar.jpg"
                    required
                    className="transition-all duration-300 ease-out focus:scale-[1.02] focus:shadow-lg border-border/50 focus:border-blue-500/50"
                  />
                </motion.div>
              </div>
              
              <motion.div 
                className="space-y-3"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <Label htmlFor="bio" className="text-sm font-semibold text-card-foreground">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell us about yourself..."
                  rows={4}
                  required
                  className="transition-all duration-300 ease-out focus:scale-[1.01] focus:shadow-lg border-border/50 focus:border-blue-500/50 resize-none"
                />
              </motion.div>

              <motion.div 
                className="space-y-3"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Label htmlFor="resumeUrl" className="text-sm font-semibold text-card-foreground">Resume URL</Label>
                <Input
                  id="resumeUrl"
                  value={formData.resumeUrl}
                  onChange={(e) => handleInputChange('resumeUrl', e.target.value)}
                  placeholder="https://example.com/resume.pdf"
                  required
                  className="transition-all duration-300 ease-out focus:scale-[1.02] focus:shadow-lg border-border/50 focus:border-blue-500/50"
                />
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent border-green-500/20 shadow-xl transition-all duration-500 ease-out hover:shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center space-x-3 text-xl">
                <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <span className="text-card-foreground">Social Links</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div 
                  className="space-y-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Label htmlFor="github" className="text-sm font-semibold text-card-foreground flex items-center">
                    <Github className="h-4 w-4 mr-2 text-muted-foreground" />
                    GitHub
                  </Label>
                  <Input
                    id="github"
                    value={formData.socialLinks?.github}
                    onChange={(e) => handleInputChange('socialLinks.github', e.target.value)}
                    placeholder="https://github.com/username"
                    className="transition-all duration-300 ease-out focus:scale-[1.02] focus:shadow-lg border-border/50 focus:border-green-500/50"
                  />
                </motion.div>
                <motion.div 
                  className="space-y-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Label htmlFor="linkedin" className="text-sm font-semibold text-card-foreground flex items-center">
                    <Linkedin className="h-4 w-4 mr-2 text-muted-foreground" />
                    LinkedIn
                  </Label>
                  <Input
                    id="linkedin"
                    value={formData.socialLinks?.linkedin}
                    onChange={(e) => handleInputChange('socialLinks.linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                    className="transition-all duration-300 ease-out focus:scale-[1.02] focus:shadow-lg border-border/50 focus:border-green-500/50"
                  />
                </motion.div>
                <motion.div 
                  className="space-y-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Label htmlFor="twitter" className="text-sm font-semibold text-card-foreground flex items-center">
                    <Twitter className="h-4 w-4 mr-2 text-muted-foreground" />
                    Twitter
                  </Label>
                  <Input
                    id="twitter"
                    value={formData.socialLinks?.twitter}
                    onChange={(e) => handleInputChange('socialLinks.twitter', e.target.value)}
                    placeholder="https://twitter.com/username"
                    className="transition-all duration-300 ease-out focus:scale-[1.02] focus:shadow-lg border-border/50 focus:border-green-500/50"
                  />
                </motion.div>
                <motion.div 
                  className="space-y-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Label htmlFor="instagram" className="text-sm font-semibold text-card-foreground flex items-center">
                    <Instagram className="h-4 w-4 mr-2 text-muted-foreground" />
                    Instagram
                  </Label>
                  <Input
                    id="instagram"
                    value={formData.socialLinks?.instagram}
                    onChange={(e) => handleInputChange('socialLinks.instagram', e.target.value)}
                    placeholder="https://instagram.com/username"
                    className="transition-all duration-300 ease-out focus:scale-[1.02] focus:shadow-lg border-border/50 focus:border-green-500/50"
                  />
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent border-purple-500/20 shadow-xl transition-all duration-500 ease-out hover:shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center space-x-3 text-xl">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <span className="text-card-foreground">Statistics</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div 
                  className="space-y-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Label htmlFor="projectsCompleted" className="text-sm font-semibold text-card-foreground flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                    Projects Completed
                  </Label>
                  <Input
                    id="projectsCompleted"
                    type="number"
                    value={formData.stats?.projectsCompleted}
                    onChange={(e) => handleInputChange('stats.projectsCompleted', e.target.value)}
                    min="0"
                    className="transition-all duration-300 ease-out focus:scale-[1.02] focus:shadow-lg border-border/50 focus:border-purple-500/50"
                  />
                </motion.div>
                <motion.div 
                  className="space-y-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Label htmlFor="yearsExperience" className="text-sm font-semibold text-card-foreground flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    Years of Experience
                  </Label>
                  <Input
                    id="yearsExperience"
                    type="number"
                    value={formData.stats?.yearsExperience}
                    onChange={(e) => handleInputChange('stats.yearsExperience', e.target.value)}
                    min="0"
                    className="transition-all duration-300 ease-out focus:scale-[1.02] focus:shadow-lg border-border/50 focus:border-purple-500/50"
                  />
                </motion.div>
                <motion.div 
                  className="space-y-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Label htmlFor="clientSatisfaction" className="text-sm font-semibold text-card-foreground flex items-center">
                    <Star className="h-4 w-4 mr-2 text-muted-foreground" />
                    Client Satisfaction (%)
                  </Label>
                  <Input
                    id="clientSatisfaction"
                    type="number"
                    value={formData.stats?.clientSatisfaction}
                    onChange={(e) => handleInputChange('stats.clientSatisfaction', e.target.value)}
                    min="0"
                    max="100"
                    className="transition-all duration-300 ease-out focus:scale-[1.02] focus:shadow-lg border-border/50 focus:border-purple-500/50"
                  />
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Professional Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent border-orange-500/20 shadow-xl transition-all duration-500 ease-out hover:shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center space-x-3 text-xl">
                <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg">
                  <Briefcase className="h-5 w-5 text-white" />
                </div>
                <span className="text-card-foreground">Professional Experience</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              {/* Add New Experience Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  type="button" 
                  onClick={() => {
                    const newExperience = { title: '', company: '', period: '', description: '' }
                    setFormData(prev => ({
                      ...prev,
                      experiences: [...(prev.experiences || []), newExperience]
                    }))
                  }}
                  variant="outline"
                  className="w-full border-orange-500/30 hover:border-orange-500/50 hover:bg-orange-500/10 transition-all duration-300 ease-out hover:shadow-md"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Experience
                </Button>
              </motion.div>

              {/* Dynamic Experience Fields */}
              {formData.experiences?.map((experience, index) => (
                <motion.div 
                  key={index} 
                  className="p-6 bg-gradient-to-r from-muted/40 via-muted/30 to-muted/40 rounded-xl border border-border/30 hover:border-orange-500/30 transition-all duration-300 hover:shadow-md"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-semibold text-lg text-card-foreground">Experience {index + 1}</h4>
                    <Button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          experiences: prev.experiences?.filter((_, i) => i !== index) || []
                        }))
                      }}
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-300 ease-out hover:scale-105 hover:shadow-md border-destructive/30 hover:border-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <motion.div 
                      className="space-y-2"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Label htmlFor={`experience${index}Title`} className="text-sm font-medium text-card-foreground">Position</Label>
                      <Input
                        id={`experience${index}Title`}
                        value={experience.title}
                        onChange={(e) => {
                          const newExperiences = [...(formData.experiences || [])]
                          newExperiences[index] = { ...newExperiences[index], title: e.target.value }
                          setFormData(prev => ({ ...prev, experiences: newExperiences }))
                        }}
                        placeholder="e.g., Senior Full Stack Developer"
                        className="transition-all duration-300 ease-out focus:scale-[1.01] focus:shadow-md border-border/50 focus:border-orange-500/50"
                      />
                    </motion.div>
                    <motion.div 
                      className="space-y-2"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Label htmlFor={`experience${index}Company`} className="text-sm font-medium text-card-foreground">Company</Label>
                      <Input
                        id={`experience${index}Company`}
                        value={experience.company}
                        onChange={(e) => {
                          const newExperiences = [...(formData.experiences || [])]
                          newExperiences[index] = { ...newExperiences[index], company: e.target.value }
                          setFormData(prev => ({ ...prev, experiences: newExperiences }))
                        }}
                        placeholder="e.g., TechCorp"
                        className="transition-all duration-300 ease-out focus:scale-[1.01] focus:shadow-md border-border/50 focus:border-orange-500/50"
                      />
                    </motion.div>
                    <motion.div 
                      className="space-y-2"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Label htmlFor={`experience${index}Period`} className="text-sm font-medium text-card-foreground">Period</Label>
                      <Input
                        id={`experience${index}Period`}
                        value={experience.period}
                        onChange={(e) => {
                          const newExperiences = [...(formData.experiences || [])]
                          newExperiences[index] = { ...newExperiences[index], period: e.target.value }
                          setFormData(prev => ({ ...prev, experiences: newExperiences }))
                        }}
                        placeholder="e.g., 2022 - Present"
                        className="transition-all duration-300 ease-out focus:scale-[1.01] focus:shadow-md border-border/50 focus:border-orange-500/50"
                      />
                    </motion.div>
                  </div>
                  <motion.div 
                    className="space-y-2"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Label htmlFor={`experience${index}Description`} className="text-sm font-medium text-card-foreground">Description</Label>
                    <Textarea
                      id={`experience${index}Description`}
                      value={experience.description}
                      onChange={(e) => {
                        const newExperiences = [...(formData.experiences || [])]
                        newExperiences[index] = { ...newExperiences[index], description: e.target.value }
                        setFormData(prev => ({ ...prev, experiences: newExperiences }))
                      }}
                      placeholder="Describe your role and achievements..."
                      rows={3}
                      className="transition-all duration-300 ease-out focus:scale-[1.01] focus:shadow-md border-border/50 focus:border-orange-500/50 resize-none"
                    />
                  </motion.div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-indigo-500/10 via-indigo-500/5 to-transparent border-indigo-500/20 shadow-xl transition-all duration-500 ease-out hover:shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center space-x-3 text-xl">
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg">
                  <Code className="h-5 w-5 text-white" />
                </div>
                <span className="text-card-foreground">Skills & Proficiency</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <div className="flex space-x-3">
                <motion.div 
                  className="flex-1"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Skill name (e.g., React, Node.js)"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    className="transition-all duration-300 ease-out focus:scale-[1.02] focus:shadow-lg border-border/50 focus:border-indigo-500/50"
                  />
                </motion.div>
                <motion.div 
                  className="w-32"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="%"
                    className="transition-all duration-300 ease-out focus:scale-[1.02] focus:shadow-lg border-border/50 focus:border-indigo-500/50 text-center"
                    onChange={(e) => setSkillPercentage(parseInt(e.target.value) || 0)}
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button type="button" onClick={addSkill} variant="outline" className="border-indigo-500/30 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all duration-300 ease-out hover:shadow-md">
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </motion.div>
              </div>
              
              <div className="space-y-4">
                {formData.skills && formData.skills.length > 0 ? (
                  formData.skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-muted/40 via-muted/30 to-muted/40 rounded-xl border border-border/30 hover:border-indigo-500/30 transition-all duration-300 hover:shadow-md"
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-card-foreground">{skill.name}</span>
                          <span className="text-indigo-600 font-bold">{skill.percentage}%</span>
                        </div>
                        <div className="w-full bg-muted/50 rounded-full h-2">
                          <motion.div 
                            className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.percentage}%` }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                          />
                        </div>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className="ml-4"
                      >
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeSkill(index)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-300 ease-out hover:shadow-md border-destructive/30 hover:border-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No skills added yet</p>
                    <p className="text-sm">Add your skills with proficiency levels</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Action Buttons */}
        <motion.div 
          className="flex justify-end space-x-4 pt-8 border-t border-border/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button type="button" variant="outline" onClick={onCancel} className="border-border/50 hover:border-border hover:bg-muted/50 transition-all duration-300 ease-out hover:shadow-md">
              Cancel
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button type="submit" disabled={isLoading} className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-xl transition-all duration-300 ease-out hover:shadow-2xl text-white border-0">
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </motion.div>
        </motion.div>
      </form>
    </motion.div>
  )
}
