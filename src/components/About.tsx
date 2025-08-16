"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Palette, Smartphone, Globe, Database, Zap, Sparkles, Star, Award, Download } from "lucide-react"
import { Globe as GlobeComponent } from "@/components/magicui/globe"
import { motion } from "framer-motion"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useLoading } from "@/components/loading-provider"

interface Profile {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone?: string;
  location: string;
  avatar: string;
  resumeUrl: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  stats: {
    projectsCompleted: number;
    yearsExperience: number;
    clientSatisfaction: number;
  };
  skills: {
    name: string;
    percentage: number;
  }[];
  experiences: {
    title: string;
    company: string;
    period: string;
    description: string;
  }[];
}

const About = () => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const { isLoading } = useLoading()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile')
        if (response.ok) {
          const result = await response.json()
          console.log('About component fetched profile result:', result)
          
          if (result.success && result.data) {
            console.log('About component profile data:', result.data)
            console.log('About component experiences:', result.data.experiences)
            setProfile(result.data)
          } else {
            console.error('Profile API returned error:', result.error)
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
      }
    }

    fetchProfile()
  }, [])

  // Don't render anything while the global loading is active
  if (isLoading) {
    return null
  }

  // Don't render if profile is not loaded yet
  if (!profile) {
    return null
  }

  // Default skills with icons and colors if no profile data
  const getSkillWithIcon = (skillName: string, index: number) => {
    const skillIcons: { [key: string]: React.ElementType } = {
      'React': Code,
      'Next.js': Globe,
      'TypeScript': Code,
      'Node.js': Zap,
      'UI/UX Design': Palette,
      'Mobile Development': Smartphone,
      'Database Design': Database,
      'API Development': Zap,
      'MongoDB': Database,
      'Express': Zap,
      'JavaScript': Code,
      'Python': Code,
      'Docker': Globe,
      'AWS': Globe,
      'Git': Code,
      'GraphQL': Code,
      'Redux': Code,
      'Tailwind CSS': Palette,
      'PostgreSQL': Database,
      'Firebase': Zap
    }

    const colors = [
      "from-blue-600 to-cyan-600",
      "from-purple-600 to-pink-600", 
      "from-pink-600 to-rose-600",
      "from-yellow-600 to-orange-600",
      "from-green-600 to-emerald-600",
      "from-indigo-600 to-purple-600",
      "from-red-600 to-pink-600",
      "from-cyan-600 to-blue-600"
    ]

    return {
      name: skillName,
      icon: skillIcons[skillName] || Code,
      color: colors[index % colors.length]
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  }

  const skillVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  }

  const floatingVariants = {
    animate: {
      y: [-5, 5, -5],
      rotate: [0, 2, -2, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  }

  // Enhanced text animation variants
  const textRevealVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  }

  const typingVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: "100%",
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut" as const,
        delay: 0.5,
      },
    },
  }

  const textGlowVariants = {
    hover: {
      textShadow: "0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(147, 51, 234, 0.3)",
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
      },
    },
  }

  return (
    <motion.section 
      id="about" 
      className="py-20 bg-muted/30 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      {/* Enhanced Background Globe */}
      <motion.div 
        className="absolute left-150 top-1/2 transform -translate-y-1/2 opacity-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
      >
        <GlobeComponent className="w-96 h-96" />
      </motion.div>

      {/* Floating Magic Elements */}
      <motion.div
        className="absolute top-20 left-20 text-blue-400/20"
        variants={floatingVariants}
        animate="animate"
      >
        <Sparkles size={32} />
      </motion.div>
      
      <motion.div
        className="absolute bottom-20 left-20 text-purple-400/20"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "2s" }}
      >
        <Star size={28} />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div className="text-center mb-16" variants={textRevealVariants}>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            About <motion.span 
              className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              whileHover="hover"
              custom={textGlowVariants}
            >Me</motion.span>
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <motion.span
              variants={typingVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {profile.bio}
            </motion.span>
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* About Text */}
          <motion.div variants={itemVariants}>
            <motion.h3 
              className="text-2xl font-semibold mb-6"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.span
                variants={textRevealVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                My Journey
              </motion.span>
            </motion.h3>
            <div className="space-y-4 text-muted-foreground">
              <motion.p
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <motion.span
                  variants={typingVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  I&apos;m {profile.name}, a {profile.title} based in {profile.location}. I started my journey in web development with a curiosity about how websites work and a desire to create something meaningful. 
                  Over the years, I&apos;ve worked on diverse projects that have shaped my skills and perspective.
                </motion.span>
              </motion.p>
              <motion.p
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <motion.span
                  variants={typingVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  My approach combines technical expertise with creative problem-solving. I believe that great software isn&apos;t just about 
                  functionality—it&apos;s about creating experiences that users love and remember.
                </motion.span>
              </motion.p>
              <motion.p
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <motion.span
                  variants={typingVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open-source projects, 
                  or sharing knowledge with the developer community.
                </motion.span>
              </motion.p>
            </div>

            {/* Contact and Social Links */}
            <div className="mt-8 space-y-4">
              {/* Resume Download */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-lg"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Resume</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced Skills */}
          <motion.div variants={itemVariants}>
            <motion.h3 
              className="text-2xl font-semibold mb-6"
              whileHover={{ x: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.span
                variants={textRevealVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Technical Skills
              </motion.span>
            </motion.h3>
            <div className="space-y-4">
              {profile?.skills && profile.skills.map((skill, index) => {
                const skillData = getSkillWithIcon(skill.name, index)
                return (
                  <motion.div 
                    key={skill.name} 
                    className="group"
                    variants={skillVariants}
                    whileHover={{ scale: 1.02, x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.2 }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                          className={`p-1 rounded-full bg-gradient-to-r ${skillData.color}`}
                        >
                          <skillData.icon className="h-4 w-4 text-white" />
                        </motion.div>
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{skill.percentage}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <motion.div
                        className={`bg-gradient-to-r ${skillData.color} h-2 rounded-full relative`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                        viewport={{ once: true }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                      </motion.div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Enhanced Professional Experience */}
        {profile?.experiences && profile.experiences.length > 0 && (
          <motion.div variants={itemVariants} className="mb-12">
            <motion.h3 
              className="text-2xl font-semibold text-center mb-12"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.span
                variants={textRevealVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Professional Experience
              </motion.span>
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {profile.experiences.map((experience, index) => {
                const colors = [
                  "from-blue-600 to-purple-600",
                  "from-purple-600 to-pink-600",
                  "from-pink-600 to-rose-600",
                  "from-yellow-600 to-orange-600",
                  "from-green-600 to-emerald-600",
                  "from-indigo-600 to-purple-600"
                ]
                const icons = [Award, Star, Sparkles, Award, Star, Sparkles]
                
                return (
                  <motion.div 
                    key={index}
                    className="group"
                    variants={cardVariants}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="h-full hover:shadow-xl transition-all duration-300 relative overflow-hidden border-0 bg-gradient-to-br from-background to-muted/50 shadow-sm">
                      <CardHeader className="relative">
                        <motion.div
                          className={`absolute top-4 right-4 p-2 rounded-full bg-gradient-to-r ${colors[index % colors.length]} text-white`}
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        >
                          {React.createElement(icons[index % icons.length], { className: "h-5 w-5" })}
                        </motion.div>
                        <CardTitle className="text-lg">{experience.title}</CardTitle>
                        <CardDescription className="text-blue-600 font-medium">
                          {experience.company}
                        </CardDescription>
                        <Badge variant="secondary" className="w-fit">
                          {experience.period}
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{experience.description}</p>
                      </CardContent>
                      
                      {/* Enhanced gradient overlay */}
                      <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${colors[index % colors.length]} opacity-0 group-hover:opacity-5 transition-all duration-500 pointer-events-none`} />
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* Enhanced Stats */}
        <motion.div variants={itemVariants}>
          <motion.h3 
            className="text-2xl font-semibold text-center mb-12"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.span
              variants={textRevealVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              My Achievements
            </motion.span>
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <motion.div 
              className="group"
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 relative overflow-hidden border-0 bg-gradient-to-br from-background to-muted/50 text-center shadow-sm">
                <CardHeader className="relative">
                  <motion.div
                    className="absolute top-4 right-4 p-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Award className="h-5 w-5" />
                  </motion.div>
                  <CardTitle className="text-4xl font-bold text-blue-600">{profile.stats.projectsCompleted}+</CardTitle>
                  <CardDescription className="text-lg">Projects Completed</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div 
              className="group"
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 relative overflow-hidden border-0 bg-gradient-to-br from-background to-muted/50 text-center shadow-sm">
                <CardHeader className="relative">
                  <motion.div
                    className="absolute top-4 right-4 p-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Star className="h-5 w-5" />
                  </motion.div>
                  <CardTitle className="text-4xl font-bold text-purple-600">{profile.stats.yearsExperience}+</CardTitle>
                  <CardDescription className="text-lg">Years Experience</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div 
              className="group"
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 relative overflow-hidden border-0 bg-gradient-to-br from-background to-muted/50 text-center shadow-sm">
                <CardHeader className="relative">
                  <motion.div
                    className="absolute top-4 right-4 p-2 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 text-white"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Sparkles className="h-5 w-5" />
                  </motion.div>
                  <CardTitle className="text-4xl font-bold text-pink-600">{profile.stats.clientSatisfaction}%</CardTitle>
                  <CardDescription className="text-lg">Client Satisfaction</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default About
