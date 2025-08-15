"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Eye, Sparkles, Star, Zap, Rocket, Code2, FolderOpen } from "lucide-react"
import Link from "next/link"
import { Globe } from "@/components/magicui/globe"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"
import { IProject } from "@/lib/models/Project"

const Projects = () => {
  const [projects, setProjects] = useState<(IProject & { icon: React.ElementType; color: string })[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects')
        if (response.ok) {
          const data = await response.json()
          // Add icon and color properties to each project
          const projectsWithIcons = data.map((project: IProject, index: number) => {
            const icons = [Rocket, Star, Sparkles, Zap, Code2]
            const colors = [
              "from-blue-600 to-cyan-600",
              "from-purple-600 to-pink-600", 
              "from-pink-600 to-rose-600",
              "from-yellow-600 to-orange-600",
              "from-green-600 to-emerald-600",
              "from-indigo-600 to-purple-600"
            ]
            return {
              ...project,
              icon: icons[index % icons.length],
              color: colors[index % icons.length]
            } as unknown as IProject & { icon: React.ElementType; color: string }
          })
          setProjects(projectsWithIcons)
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const featuredProjects = projects.filter(project => project.featured)
  const otherProjects = projects.filter(project => !project.featured)

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
      y: [-8, 8, -8],
      rotate: [0, 3, -3, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  }

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
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

  if (isLoading) {
    return (
      <div className="py-20 bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading projects...</p>
        </div>
      </div>
    )
  }

  return (
    <motion.section 
      id="projects" 
      className="py-20 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      {/* Enhanced Background Globe */}
      <motion.div 
        className="absolute right-50 top-1/2 transform -translate-y-1/2 opacity-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
      >
        <Globe className="w-96 h-96" />
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
        className="absolute bottom-50 right-50 text-purple-400/20"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "2s" }}
      >
        <Star size={28} />
      </motion.div>

      <motion.div
        className="absolute top-40 right-40 text-pink-400/20"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "4s" }}
      >
        <Zap size={24} />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div className="text-center mb-16" variants={textRevealVariants}>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Featured <motion.span 
              className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              whileHover="hover"
              custom={textGlowVariants}
            >Projects</motion.span>
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
              Here are some of my recent projects that showcase my skills in full-stack development, 
              UI/UX design, and problem-solving abilities.
            </motion.span>
          </motion.p>
        </motion.div>

        {/* Enhanced Featured Projects */}
        <div className={`grid lg:grid-cols-2 gap-8 ${otherProjects.length > 0 || projects.length > 5 ? 'mb-20' : ''}`}>
          {featuredProjects.map((project) => (
            <motion.div 
              key={project.title} 
              className="group"
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="flex flex-col h-full hover:shadow-2xl transition-all duration-500 group overflow-hidden relative border-0 bg-gradient-to-br from-background to-muted/30 pt-0 shadow-sm">
                <div className="relative overflow-hidden">
                  <motion.div 
                    className="w-full h-80 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image src={project.image} alt={project.title} width={1000} height={1000} className="w-full h-full object-cover" />
                    <motion.div
                      className="absolute top-4 right-4 p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <FolderOpen className="h-4 w-4" />
                    </motion.div>
                  </motion.div>
                  <motion.div 
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <div className="flex space-x-4">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button asChild size="sm" variant="secondary" disabled={!project.liveUrl}>
                          <Link href={project.liveUrl || '#'}>
                            <Eye className="h-4 w-4 mr-2" />
                            Live Demo
                          </Link>
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button asChild size="sm" variant="secondary" disabled={!project.githubUrl}>
                          <Link href={project.githubUrl || '#'}>
                            <Github className="h-4 w-4 mr-2" />
                            Code
                          </Link>
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
                <CardHeader>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <CardTitle>
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-3xl font-bold">
                        {project.title}
                      </span>
                    </CardTitle>
                  </motion.div>
                  <CardDescription className="text-base">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech: string, techIndex: number) => (
                      <motion.div
                        key={tech}
                        variants={badgeVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ delay: techIndex * 0.1 }}
                      >
                        <Badge variant="secondary" className="hover:scale-105 transition-transform">
                          {tech}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex space-x-3">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                                              <Button asChild size="sm" className="w-full hover-lift bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0" disabled={!project.liveUrl}>
                          <Link href={project.liveUrl || '#'}>
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Live
                          </Link>
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                        <Button asChild variant="outline" size="sm" className="w-full hover-lift border-2 hover:border-purple-500 hover:text-purple-600" disabled={!project.githubUrl}>
                          <Link href={project.githubUrl || '#'}>
                            <Github className="h-4 w-4 mr-2" />
                            View Code
                          </Link>
                        </Button>
                    </motion.div>
                  </div>
                </CardContent>
                
                {/* Enhanced gradient overlay */}
                <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-5 transition-all duration-500 pointer-events-none`} />
                
                {/* Animated border */}
                {/* <motion.div 
                  className={`absolute inset-0 rounded-lg border-2 border-transparent`}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ 
                    borderImage: `linear-gradient(45deg, var(--${project.color.split('-')[1]}-600), var(--${project.color.split('-')[2]}-600)) 1`
                  }}
                /> */}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Other Projects show if there are other projects */}
        {otherProjects.length > 0 && (
        <motion.div variants={itemVariants}>
          <motion.h3 
            className="text-3xl font-bold text-center mb-12"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.span
              variants={textRevealVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              More Projects
            </motion.span>
          </motion.h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project) => (
              <motion.div 
                key={project.title} 
                className="group"
                variants={cardVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-500 hover:-translate-y-1 relative overflow-hidden border-0 bg-gradient-to-br from-background to-muted/20 pt-0 shadow-sm">
                  <div className="relative overflow-hidden">
                    <motion.div 
                      className="w-full h-55 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center relative"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image src={project.image} alt={project.title} width={1000} height={1000} className="w-full h-full object-cover" />
                      <motion.div
                        className={`absolute top-2 right-2 p-1.5 rounded-full bg-gradient-to-r ${project.color} text-white shadow-md`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <project.icon className="h-3 w-3" />
                      </motion.div>
                    </motion.div>
                  </div>
                  <CardHeader className="pb-3">
                    <motion.div
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </CardTitle>
                    </motion.div>
                    <CardDescription className="text-sm line-clamp-3">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.technologies.slice(0, 3).map((tech: string, techIndex: number) => (
                        <motion.div
                          key={tech}
                          variants={badgeVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          transition={{ delay: techIndex * 0.1 }}
                        >
                          <Badge variant="outline" className="text-xs hover:scale-105 transition-transform">
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                        <Button asChild size="sm" variant="outline" className="w-full hover-lift" disabled={!project.liveUrl}>
                          <Link href={project.liveUrl || '#'}>
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Demo
                          </Link>
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                        <Button asChild size="sm" variant="outline" className="w-full hover-lift" disabled={!project.githubUrl}>
                          <Link href={project.githubUrl || '#'}>
                            <Github className="h-3 w-3 mr-1" />
                            Code
                          </Link>
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                  
                  {/* Enhanced gradient overlay */}
                  <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-5 transition-all duration-500 pointer-events-none`} />
                </Card>
              </motion.div>
            ))}
            </div>
          </motion.div>
        )}
        {/* Enhanced CTA show if there is more than 5 projects */}
        {projects.length > 5 && (
          <motion.div 
            className="text-center mt-16"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Button asChild size="lg" className="hover-lift bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg">
              <Link href="/projects">
                View All Projects
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}

export default Projects
