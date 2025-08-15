"use client"

import { useState, useEffect } from 'react'
import { Plus, Trash2, FolderOpen, Globe, Code, Star, Image as ImageIcon, Link, Settings, Zap, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { IProject } from '@/lib/models/Project'

interface ProjectFormProps {
  project?: {
    _id: string
    title: string
    description: string
    shortDescription: string
    image: string
    technologies: string[]
    githubUrl?: string
    liveUrl?: string
    featured: boolean
    order: number
    category: string
  } | null
  onSave: (projectData: IProject) => Promise<void>
  onCancel: () => void
  isEditing?: boolean
}

export default function ProjectForm({ project, onSave, onCancel, isEditing = false }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    image: '',
    technologies: [''],
    githubUrl: '',
    liveUrl: '',
    featured: false,
    order: 0,
    category: 'web'
  })
  const [newTech, setNewTech] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        shortDescription: project.shortDescription,
        image: project.image,
        technologies: project.technologies.length > 0 ? project.technologies : [''],
        githubUrl: project.githubUrl || '',
        liveUrl: project.liveUrl || '',
        featured: project.featured,
        order: project.order,
        category: project.category
      })
    }
  }, [project])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const addTechnology = () => {
    if (newTech.trim() && !formData.technologies.includes(newTech.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTech.trim()]
      }))
      setNewTech('')
    }
  }

  const removeTechnology = (index: number) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const projectData = {
        ...formData,
        technologies: formData.technologies.filter(tech => tech.trim() !== '')
      }

      if (isEditing && project) {
        await onSave({ ...projectData, _id: project._id } as IProject)
      } else {
        await onSave(projectData as IProject)
      }
    } catch (error) {
      console.error('Error saving project:', error)
    } finally {
      setIsLoading(false)
    }
  }

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
                  <FolderOpen className="h-5 w-5 text-white" />
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
                  <Label htmlFor="title" className="text-sm font-semibold text-card-foreground flex items-center">
                    <Star className="h-4 w-4 mr-2 text-muted-foreground" />
                    Title *
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter project title"
                    required
                    className="transition-all duration-300 ease-out focus:scale-[1.02] focus:shadow-lg border-border/50 focus:border-blue-500/50"
                  />
                </motion.div>
                
                <motion.div 
                  className="space-y-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Label htmlFor="category" className="text-sm font-semibold text-card-foreground flex items-center">
                    <Settings className="h-4 w-4 mr-2 text-muted-foreground" />
                    Category *
                  </Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger className="transition-all duration-300 ease-out focus:scale-[1.02] focus:shadow-lg border-border/50 focus:border-blue-500/50">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web">Web</SelectItem>
                      <SelectItem value="mobile">Mobile</SelectItem>
                      <SelectItem value="desktop">Desktop</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="category" value={formData.category} />
                </motion.div>
              </div>

              <motion.div 
                className="space-y-3"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <Label htmlFor="shortDescription" className="text-sm font-semibold text-card-foreground flex items-center">
                  <Code className="h-4 w-4 mr-2 text-muted-foreground" />
                  Short Description *
                </Label>
                <Textarea
                  id="shortDescription"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="Brief description (max 200 characters)"
                  maxLength={200}
                  required
                  className="transition-all duration-300 ease-out focus:scale-[1.01] focus:shadow-lg border-border/50 focus:border-blue-500/50 resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  {formData.shortDescription.length}/200 characters
                </p>
              </motion.div>

              <motion.div 
                className="space-y-3"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <Label htmlFor="description" className="text-sm font-semibold text-card-foreground flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                  Full Description *
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Enter full project description"
                  required
                  className="transition-all duration-300 ease-out focus:scale-[1.01] focus:shadow-lg border-border/50 focus:border-blue-500/50 resize-none"
                />
              </motion.div>

              <motion.div 
                className="space-y-3"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Label htmlFor="image" className="text-sm font-semibold text-card-foreground flex items-center">
                  <ImageIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  Image URL *
                </Label>
                <Input
                  id="image"
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  required
                  className="transition-all duration-300 ease-out focus:scale-[1.02] focus:shadow-lg border-border/50 focus:border-blue-500/50"
                />
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced URLs and Settings */}
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
                  <Link className="h-5 w-5 text-white" />
                </div>
                <span className="text-card-foreground">Links & Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div 
                  className="space-y-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Label htmlFor="githubUrl" className="text-sm font-semibold text-card-foreground flex items-center">
                    <Code className="h-4 w-4 mr-2 text-muted-foreground" />
                    GitHub URL
                  </Label>
                  <Input
                    id="githubUrl"
                    type="url"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleInputChange}
                    placeholder="https://github.com/username/repo"
                    className="transition-all duration-300 ease-out focus:scale-[1.02] focus:shadow-lg border-border/50 focus:border-green-500/50"
                  />
                </motion.div>

                <motion.div 
                  className="space-y-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Label htmlFor="liveUrl" className="text-sm font-semibold text-card-foreground flex items-center">
                    <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                    Live URL
                  </Label>
                  <Input
                    id="liveUrl"
                    type="url"
                    name="liveUrl"
                    value={formData.liveUrl}
                    onChange={handleInputChange}
                    placeholder="https://project-demo.com"
                    className="transition-all duration-300 ease-out focus:scale-[1.02] focus:shadow-lg border-border/50 focus:border-green-500/50"
                  />
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div 
                  className="space-y-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Label htmlFor="order" className="text-sm font-semibold text-card-foreground flex items-center">
                    <Settings className="h-4 w-4 mr-2 text-muted-foreground" />
                    Display Order
                  </Label>
                  <Input
                    id="order"
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    className="transition-all duration-300 ease-out focus:scale-[1.02] focus:shadow-lg border-border/50 focus:border-green-500/50"
                  />
                </motion.div>

                <motion.div 
                  className="space-y-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center space-x-3 pt-6">
                    <Checkbox
                      id="featured"
                      name="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked as boolean }))}
                      className="transition-all duration-300 ease-out hover:scale-110"
                    />
                    <Label htmlFor="featured" className="text-sm font-semibold text-card-foreground cursor-pointer">
                      Featured Project
                    </Label>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Technologies */}
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
                  <Code className="h-5 w-5 text-white" />
                </div>
                <span className="text-card-foreground">Technologies</span>
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
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    placeholder="Add a new technology"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                    className="transition-all duration-300 ease-out focus:scale-[1.02] focus:shadow-lg border-border/50 focus:border-purple-500/50"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button type="button" onClick={addTechnology} variant="outline" className="border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300 ease-out hover:shadow-md">
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </motion.div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {formData.technologies.filter(tech => tech.trim() !== '').map((tech, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Badge 
                      variant="secondary" 
                      className="cursor-pointer transition-all duration-300 ease-out hover:shadow-md hover:bg-purple-500/20 hover:text-purple-600 border-purple-500/30 text-sm px-4 py-2 group" 
                      onClick={() => removeTechnology(index)}
                    >
                      {tech}
                      <Trash2 className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Action Buttons */}
        <motion.div 
          className="flex justify-end space-x-4 pt-8 border-t border-border/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
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
              <Zap className="h-4 w-4 mr-2" />
              {isLoading ? 'Saving...' : (isEditing ? 'Update Project' : 'Create Project')}
            </Button>
          </motion.div>
        </motion.div>
      </form>
    </motion.div>
  )
}
