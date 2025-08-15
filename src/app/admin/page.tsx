"use client"

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  FolderOpen, 
  User, 
  Settings, 
  LogOut, 
  Plus,
  Edit,
  Trash2,
  Eye,
  FileText,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Sun,
  Moon,
  TrendingUp,
  Star,
  Calendar,
  Globe,
  Zap,
  Target,
  Award,
  Briefcase,
  Code2,
  Palette,
  MapPin,
  Mail
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useTheme } from 'next-themes'
import ProjectForm from '@/components/admin/ProjectForm'
import ProfileForm from '@/components/admin/ProfileForm'
import ContactMessages from '@/components/admin/ContactMessages'
import Image from 'next/image'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { IProject } from '@/lib/models/Project'

interface Project extends Omit<IProject, '_id'> {
  _id: string
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
  skills: { name: string; percentage: number }[]
  experiences: {
    title: string
    company: string
    period: string
    description: string
  }[]
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{username: string} | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [profile, setProfile] = useState<Profile | null>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [isLoading, setIsLoading] = useState(true)
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showProfileForm, setShowProfileForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const router = useRouter()
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const checkAuth = useCallback(() => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      setIsAuthenticated(true)
      const userData = localStorage.getItem('adminUser')
      if (userData) {
        setUser(JSON.parse(userData))
      }
    } else {
      router.push('/admin/login')
    }
  }, [router])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    checkAuth()
    if (isAuthenticated) {
      fetchData()
    }
  }, [isAuthenticated, checkAuth])

  const fetchData = async () => {
    try {
      const [projectsRes, profileRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/profile')
      ])
      
      if (projectsRes.ok) {
        const projectsData = await projectsRes.json()
        setProjects(projectsData)
      }
      
      if (profileRes.ok) {
        const result = await profileRes.json()
        console.log('Admin dashboard fetched profile result:', result)
        
        if (result.success && result.data) {
          console.log('Admin dashboard profile data:', result.data)
          console.log('Admin dashboard experiences:', result.data.experiences)
          setProfile(result.data)
        } else {
          console.error('Profile API returned error:', result.error)
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    setIsAuthenticated(false)
    router.push('/admin/login')
  }

  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return
    
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        setProjects(projects.filter(p => p._id !== id))
      }
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  const handleSaveProject = async (projectData: IProject) => {
    try {
      const token = localStorage.getItem('adminToken')
      const method = editingProject ? 'PUT' : 'POST'
      const url = editingProject ? `/api/projects/${editingProject._id}` : '/api/projects'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(projectData)
      })
      
      if (response.ok) {
        const savedProject = await response.json()
        
        if (editingProject) {
          setProjects(projects.map(p => p._id === editingProject._id ? savedProject : p))
        } else {
          setProjects([...projects, savedProject])
        }
        
        setShowProjectForm(false)
        setEditingProject(null)
      }
    } catch (error) {
      console.error('Error saving project:', error)
    }
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
    setShowProjectForm(true)
  }

  const handleAddProject = () => {
    setEditingProject(null)
    setShowProjectForm(true)
  }

  const handleCancelProjectForm = () => {
    setShowProjectForm(false)
    setEditingProject(null)
  }

  const handleSaveProfile = async (profileData: Partial<Profile>) => {
    try {
      console.log('Admin dashboard saving profile:', profileData)
      console.log('Experiences being saved:', profileData.experiences)
      const token = localStorage.getItem('adminToken')
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      })
      
      if (response.ok) {
        const result = await response.json()
        console.log('Profile update response:', result)
        
        if (result.success && result.data) {
          console.log('Profile updated successfully:', result.data)
          console.log('Updated experiences:', result.data.experiences)
          setProfile(result.data)
          setShowProfileForm(false)
        } else {
          console.error('Profile update failed:', result.error)
        }
      }
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  const handleEditProfile = () => {
    setShowProfileForm(true)
  }

  const handleCancelProfileForm = () => {
    setShowProfileForm(false)
  }

  // Prevent hydration mismatch - must be after all hooks but before render
  if (!mounted) {
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="w-32 h-32 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-32 h-32 border-4 border-transparent border-t-primary/60 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </motion.div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-32 h-32 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Profile Not Loaded</h2>
          <p className="text-muted-foreground mb-6">Unable to load profile data. Please check your connection.</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Retry
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Enhanced Header with Gradient */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-r from-card via-card to-card/95 shadow-2xl border-b border-border/50 backdrop-blur-sm"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center py-6 lg:py-8 space-y-4 lg:space-y-0">
            <motion.div 
              className="flex items-center space-x-3 lg:space-x-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="relative">
                <div className="p-2 lg:p-3 bg-gradient-to-br from-primary to-primary/80 rounded-xl lg:rounded-2xl shadow-lg transition-all duration-500 ease-out hover:scale-110 hover:shadow-2xl">
                  <LayoutDashboard className="h-6 w-6 lg:h-8 lg:w-8 text-primary-foreground" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 lg:w-4 lg:h-4 bg-green-500 rounded-full border-2 border-background animate-pulse"></div>
              </div>
              <div className="transition-all duration-500 ease-out">
                <h1 className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
                  Portfolio Dashboard
                </h1>
                <p className="text-xs lg:text-sm text-muted-foreground mt-1">Manage your portfolio with precision & creativity</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-2 lg:space-x-4 transition-all duration-500 ease-out w-full lg:w-auto justify-center lg:justify-end"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-right transition-all duration-500 ease-out hidden sm:block">
                <p className="text-sm font-medium text-foreground">Welcome back,</p>
                <p className="text-sm text-muted-foreground">{user?.username}</p>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className="transition-all duration-200 hover:scale-105 hover:shadow-md hover:bg-primary/10 hover:border-primary/30"
              >
                {resolvedTheme === 'dark' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleLogout} 
                className="flex gap-2 hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 hover:scale-105 hover:shadow-md border-destructive/30 hover:border-destructive"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8 transition-all duration-500 ease-out">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 sm:space-y-8">
          {/* Enhanced Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <TabsList className="grid w-full grid-cols-5 bg-gradient-to-r from-card via-card to-card shadow-2xl border border-border/50 backdrop-blur-sm p-1 gap-1">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 hover:scale-105 rounded-lg"
              >
                <LayoutDashboard className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline ml-2">Overview</span>
              </TabsTrigger>
              <TabsTrigger 
                value="projects" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 hover:scale-105 rounded-lg"
              >
                <FolderOpen className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline ml-2">Projects</span>
              </TabsTrigger>
              <TabsTrigger 
                value="profile" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 hover:scale-105 rounded-lg"
              >
                <User className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline ml-2">Profile</span>
              </TabsTrigger>
              <TabsTrigger 
                value="messages" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 hover:scale-105 rounded-lg"
              >
                <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline ml-2">Messages</span>
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 hover:scale-105 rounded-lg"
              >
                <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline ml-2">Settings</span>
              </TabsTrigger>
            </TabsList>
          </motion.div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Enhanced Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="relative overflow-hidden bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border-blue-500/20 hover:border-blue-500/40 transition-all duration-500 ease-out hover:shadow-2xl group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                      <CardTitle className="text-xs sm:text-sm font-medium text-card-foreground">Total Projects</CardTitle>
                      <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-500">
                        <FolderOpen className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">{projects.length}</div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Star className="h-3 w-3 mr-1 text-yellow-500" />
                        {projects.filter(p => p.featured).length} featured
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Card className="relative overflow-hidden bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent border-green-500/20 hover:border-green-500/40 transition-all duration-500 ease-out hover:shadow-2xl group">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                      <CardTitle className="text-xs sm:text-sm font-medium text-card-foreground">Experience</CardTitle>
                      <div className="p-2 sm:p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg sm:rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-500">
                        <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">{profile?.stats?.yearsExperience || 0}+</div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1 text-green-500" />
                        Years
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Card className="relative overflow-hidden bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 ease-out hover:shadow-2xl group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                      <CardTitle className="text-xs sm:text-sm font-medium text-card-foreground">Satisfaction</CardTitle>
                      <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg sm:rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-500">
                        <Target className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">{profile?.stats?.clientSatisfaction || 100}%</div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <TrendingUp className="h-3 w-3 mr-1 text-purple-500" />
                        Client satisfaction
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Card className="relative overflow-hidden bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent border-orange-500/20 hover:border-orange-500/40 transition-all duration-500 ease-out hover:shadow-2xl group">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                      <CardTitle className="text-xs sm:text-sm font-medium text-card-foreground">Skills</CardTitle>
                      <div className="p-2 sm:p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg sm:rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-500">
                        <Code2 className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1">{profile?.skills?.length || 0}</div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Palette className="h-3 w-3 mr-1 text-orange-500" />
                        {profile?.skills && profile.skills.length > 0 ? `${Math.round(profile.skills.reduce((acc, skill) => acc + skill.percentage, 0) / profile.skills.length)}% avg` : 'No skills'}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Enhanced Recent Projects */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card className="relative overflow-hidden bg-gradient-to-br from-card via-card to-muted/20 border-border/50 shadow-xl transition-all duration-500 ease-out hover:shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                  <CardHeader className="relative z-10">
                    <CardTitle className="text-xl sm:text-2xl font-bold text-card-foreground flex items-center">
                      <Zap className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-primary" />
                      Recent Projects
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="space-y-3 sm:space-y-4">
                      {projects.slice(0, 5).map((project, index) => (
                        <motion.div 
                          key={project._id} 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-muted/30 via-muted/20 to-muted/30 rounded-xl hover:from-muted/50 hover:via-muted/40 hover:to-muted/50 transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-lg border border-border/30 hover:border-border/50 space-y-3 sm:space-y-0"
                        >
                          <div className="flex items-center space-x-3 sm:space-x-4">
                            <div className="relative group">
                              <Image 
                                src={project.image} 
                                alt={project.title}
                                width={1000}
                                height={1000}
                                className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl object-cover shadow-lg transition-all duration-500 ease-out group-hover:scale-110 group-hover:shadow-xl"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div>
                              <h3 className="font-semibold text-card-foreground text-base sm:text-lg">{project.title}</h3>
                              <p className="text-muted-foreground text-xs sm:text-sm max-w-md">{project.shortDescription}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <Badge variant={project.featured ? "default" : "secondary"} className="shadow-sm text-xs">
                              {project.featured ? "⭐ Featured" : "Regular"}
                            </Badge>
                            <Badge variant="outline" className="border-primary/30 text-primary text-xs">
                              {project.category}
                            </Badge>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent transition-all duration-500 ease-out">
                    Manage Projects
                  </h2>
                  <p className="text-muted-foreground mt-2 text-sm sm:text-base">Create, edit, and organize your portfolio projects</p>
                </div>
                <Button 
                  onClick={handleAddProject} 
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-xl transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl text-white border-0 w-full sm:w-auto"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Project
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {projects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="group"
                  >
                    <Card className="flex flex-col overflow-hidden bg-gradient-to-br from-card via-card to-muted/20 hover:shadow-2xl transition-all duration-500 ease-out border-border/50 hover:border-primary/30 pt-0 h-full">
                      <div className="relative overflow-hidden">
                        <Image 
                          src={project.image} 
                          alt={project.title}
                          width={1000}
                          height={1000}
                          className="w-full h-40 sm:h-52 object-cover transition-all duration-700 ease-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute top-3 right-3">
                          <Badge variant={project.featured ? "default" : "secondary"} className="shadow-lg">
                            {project.featured ? "⭐ Featured" : "Regular"}
                          </Badge>
                        </div>
                      </div>
                      
                      <CardHeader className="relative z-10">
                        <CardTitle className="text-lg sm:text-xl font-bold text-card-foreground group-hover:text-primary transition-colors duration-300">
                          {project.title}
                        </CardTitle>
                        <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{project.shortDescription}</p>
                      </CardHeader>
                      
                      <CardContent className="mt-auto relative z-10">
                        <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
                          {project.technologies.map((tech) => (
                            <Badge 
                              key={tech} 
                              variant="secondary"
                              className="transition-all duration-300 ease-out hover:scale-105 hover:shadow-md hover:bg-primary/10 hover:text-primary text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="transition-all duration-300 ease-out hover:scale-105 hover:shadow-md hover:bg-primary/10 hover:border-primary/30"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleEditProject(project)}
                              className="transition-all duration-300 ease-out hover:scale-105 hover:shadow-md hover:bg-primary/10 hover:border-primary/30"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => deleteProject(project._id)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-300 ease-out hover:scale-105 hover:shadow-md border-destructive/30 hover:border-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <Badge variant="outline" className="border-primary/30 text-primary text-xs">
                            {project.category}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent transition-all duration-500 ease-out">
                    Profile Management
                  </h2>
                  <p className="text-muted-foreground mt-2 text-sm sm:text-base">Update your professional information and showcase</p>
                </div>
                <Button 
                  onClick={handleEditProfile} 
                  variant="outline"
                  className="transition-all duration-500 ease-out hover:scale-105 hover:shadow-md hover:bg-primary/10 hover:border-primary/30 border-primary/30 w-full sm:w-auto"
                >
                  <Edit className="h-5 w-5 mr-2" />
                  Edit Profile
                </Button>
              </div>

              {profile && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  {/* Enhanced Profile Overview */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <Card className="relative overflow-hidden bg-gradient-to-br from-card via-card to-muted/20 border-border/50 shadow-xl transition-all duration-500 ease-out hover:shadow-2xl">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                      <CardHeader className="relative z-10">
                        <CardTitle className="flex items-center space-x-2 text-xl">
                          <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-lg">
                            <User className="h-5 w-5 text-primary-foreground" />
                          </div>
                          <span className="text-card-foreground">Basic Information</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6 relative z-10">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                          <div className="relative group">
                            <Avatar className="w-20 h-20 sm:w-24 sm:h-24 transition-all duration-500 ease-out group-hover:scale-110 hover:shadow-2xl">
                              <AvatarImage src={profile.avatar} />
                              <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-2xl sm:text-3xl font-bold">
                                {profile.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full border-4 border-background animate-pulse"></div>
                          </div>
                          <div>
                            <h3 className="text-xl sm:text-2xl font-bold text-card-foreground mb-2">{profile.name}</h3>
                            <p className="text-primary text-base sm:text-lg font-medium mb-1">{profile.title}</p>
                            <p className="text-muted-foreground flex items-center justify-center sm:justify-start">
                              <MapPin className="h-4 w-4 mr-2" />
                              {profile.location}
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-3 text-card-foreground text-base sm:text-lg">Bio</h4>
                          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed bg-muted/30 p-3 sm:p-4 rounded-lg border border-border/30">
                            {profile.bio}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3 text-card-foreground text-base sm:text-lg">Contact Information</h4>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg border border-border/30">
                              <Mail className="h-4 w-4 text-primary" />
                              <span className="text-muted-foreground text-sm">{profile.email}</span>
                            </div>
                            {profile.phone && (
                              <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg border border-border/30">
                                <User className="h-4 w-4 text-primary" />
                                <span className="text-muted-foreground text-sm">{profile.phone}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Enhanced Statistics & Skills */}
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      <Card className="relative overflow-hidden bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent border-green-500/20 shadow-xl transition-all duration-500 ease-out hover:shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                        <CardHeader className="relative z-10">
                          <CardTitle className="flex items-center space-x-2 text-xl">
                            <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
                              <FileText className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-card-foreground">Statistics</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="relative z-10">
                          <div className="grid grid-cols-3 gap-6">
                            <div className="text-center group">
                              <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                                {profile?.stats?.projectsCompleted || 0}
                              </div>
                              <div className="text-xs text-muted-foreground">Projects</div>
                            </div>
                            <div className="text-center group">
                              <div className="text-3xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                                {profile?.stats?.yearsExperience || 0}+
                              </div>
                              <div className="text-xs text-muted-foreground">Years</div>
                            </div>
                            <div className="text-center group">
                              <div className="text-3xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                                {profile?.stats?.clientSatisfaction || 100}%
                              </div>
                              <div className="text-xs text-muted-foreground">Satisfaction</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                    >
                      <Card className="relative overflow-hidden bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border-blue-500/20 shadow-xl transition-all duration-500 ease-out hover:shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                        <CardHeader className="relative z-10">
                          <CardTitle className="text-xl text-card-foreground flex items-center">
                            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg mr-3">
                              <Code2 className="h-5 w-5 text-white" />
                            </div>
                            Skills & Proficiency
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="relative z-10">
                          <div className="space-y-4">
                            {profile?.skills && profile.skills.length > 0 ? (
                              profile.skills.map((skill, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.5, delay: index * 0.1 }}
                                  className="p-4 bg-gradient-to-r from-muted/40 via-muted/30 to-muted/40 rounded-xl border border-border/30 hover:border-blue-500/30 transition-all duration-300 hover:shadow-md"
                                >
                                  <div className="flex items-center justify-between mb-3">
                                    <span className="font-semibold text-card-foreground text-lg">{skill.name}</span>
                                    <span className="text-blue-600 font-bold text-lg">{skill.percentage}%</span>
                                  </div>
                                  <div className="w-full bg-muted/50 rounded-full h-3">
                                    <motion.div 
                                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-700 ease-out"
                                      initial={{ width: 0 }}
                                      animate={{ width: `${skill.percentage}%` }}
                                      transition={{ duration: 1, delay: index * 0.1 }}
                                    />
                                  </div>
                                </motion.div>
                              ))
                            ) : (
                              <div className="text-center py-8 text-muted-foreground">
                                <Code2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p>No skills added yet</p>
                                <p className="text-sm">Add your skills with proficiency levels</p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    >
                      <Card className="relative overflow-hidden bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent border-purple-500/20 shadow-xl transition-all duration-500 ease-out hover:shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                        <CardHeader className="relative z-10">
                          <CardTitle className="text-xl text-card-foreground flex items-center">
                            <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg mr-3">
                              <Award className="h-5 w-5 text-white" />
                            </div>
                            Professional Experience
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="relative z-10">
                          <div className="space-y-4">
                            {profile?.experiences && profile.experiences.map((experience, index) => (
                              <motion.div 
                                key={index} 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="p-4 bg-gradient-to-r from-muted/40 via-muted/30 to-muted/40 rounded-xl border border-border/30 hover:border-purple-500/30 transition-all duration-300 hover:shadow-md"
                              >
                                <h4 className="font-semibold text-card-foreground text-lg mb-2">{experience.title}</h4>
                                <p className="text-blue-600 text-sm font-medium mb-2">{experience.company}</p>
                                <Badge variant="outline" className="text-xs border-purple-500/30 text-purple-600 mb-3">
                                  {experience.period}
                                </Badge>
                                <p className="text-muted-foreground text-sm leading-relaxed">{experience.description}</p>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.9 }}
                    >
                      <Card className="relative overflow-hidden bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent border-orange-500/20 shadow-xl transition-all duration-500 ease-out hover:shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                        <CardHeader className="relative z-10">
                          <CardTitle className="text-xl text-card-foreground flex items-center">
                            <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg mr-3">
                              <Globe className="h-5 w-5 text-white" />
                            </div>
                            Social Links
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="relative z-10">
                          <div className="space-y-3">
                            {profile.socialLinks.github && (
                              <motion.div 
                                whileHover={{ scale: 1.05, x: 5 }}
                                className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg border border-border/30 hover:border-orange-500/30 transition-all duration-300 hover:shadow-md"
                              >
                                <Github className="h-5 w-5 text-muted-foreground" />
                                <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm font-medium">
                                  GitHub Profile
                                </a>
                              </motion.div>
                            )}
                            {profile.socialLinks.linkedin && (
                              <motion.div 
                                whileHover={{ scale: 1.05, x: 5 }}
                                className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg border border-border/30 hover:border-orange-500/30 transition-all duration-300 hover:shadow-md"
                              >
                                <Linkedin className="h-5 w-5 text-muted-foreground" />
                                <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm font-medium">
                                  LinkedIn Profile
                                </a>
                              </motion.div>
                            )}
                            {profile.socialLinks.twitter && (
                              <motion.div 
                                whileHover={{ scale: 1.05, x: 5 }}
                                className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg border border-border/30 hover:border-orange-500/30 transition-all duration-300 hover:shadow-md"
                              >
                                <Twitter className="h-5 w-5 text-muted-foreground" />
                                <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm font-medium">
                                  Twitter Profile
                                </a>
                              </motion.div>
                            )}
                            {profile.socialLinks.instagram && (
                              <motion.div 
                                whileHover={{ scale: 1.05, x: 5 }}
                                className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg border border-border/30 hover:border-orange-500/30 transition-all duration-300 hover:shadow-md"
                              >
                                <Instagram className="h-5 w-5 text-muted-foreground" />
                                <a href={profile.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm font-medium">
                                  Instagram Profile
                                </a>
                              </motion.div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </div>
              )}
            </motion.div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <ContactMessages />
            </motion.div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="relative overflow-hidden bg-gradient-to-br from-card via-card to-muted/20 border-border/50 shadow-xl transition-all duration-500 ease-out hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="text-xl sm:text-2xl font-bold text-card-foreground flex items-center">
                    <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-lg mr-3">
                      <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
                    </div>
                    Dashboard Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 sm:space-y-8 relative z-10">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-card-foreground">Security Settings</h3>
                    <div className="space-y-4 sm:space-y-6">
                      <div className="transition-all duration-500 ease-out">
                        <Label htmlFor="currentPassword" className="block text-sm font-medium mb-3 text-card-foreground">Current Password</Label>
                        <Input 
                          id="currentPassword"
                          type="password" 
                          placeholder="Enter current password"
                          className="transition-all duration-500 ease-out focus:scale-[1.02] focus:shadow-lg border-border/50 focus:border-primary/50"
                        />
                      </div>
                      <div className="transition-all duration-500 ease-out">
                        <Label htmlFor="newPassword" className="block text-sm font-medium mb-3 text-card-foreground">New Password</Label>
                        <Input 
                          id="newPassword"
                          type="password" 
                          placeholder="Enter new password"
                          className="transition-all duration-500 ease-out focus:scale-[1.02] focus:shadow-lg border-border/50 focus:border-primary/50"
                        />
                      </div>
                      <div className="transition-all duration-500 ease-out">
                        <Label htmlFor="confirmPassword" className="block text-sm font-medium mb-3 text-card-foreground">Confirm New Password</Label>
                        <Input 
                          id="confirmPassword"
                          type="password" 
                          placeholder="Confirm new password"
                          className="transition-all duration-500 ease-out focus:scale-[1.02] focus:shadow-lg border-border/50 focus:border-primary/50"
                        />
                      </div>
                      <Button 
                        className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-xl transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl text-white border-0"
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Enhanced Project Form Dialog */}
      <Dialog open={showProjectForm} onOpenChange={setShowProjectForm}>
        <DialogContent className="max-w-[95vw] sm:max-w-4xl lg:max-w-5xl max-h-[90vh] overflow-y-auto transition-all duration-500 ease-out bg-gradient-to-br from-card via-card to-muted/20 border-border/50 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-sm bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                <motion.div 
                className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="p-2 sm:p-3 bg-gradient-to-br from-primary to-primary/80 rounded-lg sm:rounded-xl shadow-lg">
                  <FolderOpen className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    {editingProject ? 'Edit Project' : 'Add New Project'}
                  </h2>
                  <p className="text-muted-foreground mt-1 text-sm sm:text-base">Create and manage your portfolio projects</p>
                </div>
              </motion.div>
            </DialogTitle>
          </DialogHeader>
          <ProjectForm
            project={editingProject}
            onSave={handleSaveProject}
            onCancel={handleCancelProjectForm}
            isEditing={!!editingProject}
          />
        </DialogContent>
      </Dialog>

      {/* Enhanced Profile Form Dialog */}
      <Dialog open={showProfileForm} onOpenChange={setShowProfileForm}>
        <DialogContent className="max-w-[95vw] sm:max-w-4xl lg:max-w-5xl max-h-[90vh] overflow-y-auto transition-all duration-500 ease-out bg-gradient-to-br from-card via-card to-muted/20 border-border/50 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-sm bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            <motion.div 
              className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="p-2 sm:p-3 bg-gradient-to-br from-primary to-primary/80 rounded-lg sm:rounded-xl shadow-lg">
                <User className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Edit Profile
                </h2>
                <p className="text-muted-foreground mt-1 text-sm sm:text-base">Update your professional information and showcase</p>
              </div>
            </motion.div>
            </DialogTitle>
          </DialogHeader>
          <ProfileForm
            profile={profile}
            onSave={handleSaveProfile}
            onCancel={handleCancelProfileForm}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
