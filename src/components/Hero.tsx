"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Mail, Sparkles, Star, Zap } from "lucide-react"
import Link from "next/link"
import { Globe } from "@/components/magicui/globe"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { scrollToSection } from "@/lib/utils"
import Logo from "@/components/Logo"

interface Profile {
  name: string
  title: string
  bio: string
  email: string
  phone?: string
  location: string
  avatar: string
  resumeUrl: string
  stats: {
    projectsCompleted: number
    yearsExperience: number
    clientSatisfaction: number
  }
}

const Hero = () => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile')
        if (response.ok) {
          const result = await response.json()
          
          if (result.success && result.data) {
            console.log('Hero component fetched profile:', result.data)
            setProfile(result.data)
          } else {
            console.error('Profile API returned error:', result.error)
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [])

  // Predefined positions for sparkles to avoid hydration issues
  const sparklePositions = [
    { left: 10, top: 15, delay: 0, duration: 2.5 },
    { left: 25, top: 8, delay: 0.3, duration: 2.8 },
    { left: 40, top: 25, delay: 0.6, duration: 2.2 },
    { left: 60, top: 12, delay: 0.9, duration: 3.1 },
    { left: 75, top: 30, delay: 1.2, duration: 2.6 },
    { left: 85, top: 18, delay: 1.5, duration: 2.9 },
    { left: 15, top: 45, delay: 1.8, duration: 2.4 },
    { left: 35, top: 55, delay: 0.2, duration: 3.2 },
    { left: 55, top: 48, delay: 0.5, duration: 2.7 },
    { left: 70, top: 60, delay: 0.8, duration: 2.3 },
    { left: 90, top: 42, delay: 1.1, duration: 2.8 },
    { left: 5, top: 70, delay: 1.4, duration: 2.5 },
    { left: 20, top: 75, delay: 1.7, duration: 3.0 },
    { left: 45, top: 68, delay: 0.1, duration: 2.6 },
    { left: 65, top: 78, delay: 0.4, duration: 2.9 },
    { left: 80, top: 72, delay: 0.7, duration: 2.4 },
    { left: 95, top: 65, delay: 1.0, duration: 2.7 },
    { left: 8, top: 85, delay: 1.3, duration: 3.1 },
    { left: 30, top: 88, delay: 1.6, duration: 2.8 },
    { left: 50, top: 82, delay: 0.2, duration: 2.5 },
    { left: 68, top: 90, delay: 0.5, duration: 2.6 },
    { left: 88, top: 85, delay: 0.8, duration: 2.9 },
    { left: 12, top: 95, delay: 1.1, duration: 2.7 },
    { left: 28, top: 92, delay: 1.4, duration: 3.0 },
    { left: 42, top: 98, delay: 1.7, duration: 2.4 },
    { left: 58, top: 94, delay: 0.3, duration: 2.8 },
    { left: 72, top: 96, delay: 0.6, duration: 2.3 },
    { left: 92, top: 89, delay: 0.9, duration: 2.6 },
    { left: 18, top: 35, delay: 1.2, duration: 3.2 },
    { left: 38, top: 38, delay: 1.5, duration: 2.5 },
    { left: 62, top: 35, delay: 1.8, duration: 2.9 },
    { left: 82, top: 38, delay: 0.4, duration: 2.7 },
    { left: 22, top: 62, delay: 0.7, duration: 2.4 },
    { left: 48, top: 65, delay: 1.0, duration: 3.1 },
    { left: 78, top: 62, delay: 1.3, duration: 2.6 },
    { left: 32, top: 78, delay: 1.6, duration: 2.8 },
    { left: 52, top: 82, delay: 0.1, duration: 2.5 },
    { left: 72, top: 78, delay: 0.4, duration: 2.9 },
    { left: 92, top: 82, delay: 0.7, duration: 2.3 },
    { left: 15, top: 25, delay: 1.0, duration: 3.0 },
    { left: 35, top: 28, delay: 1.3, duration: 2.7 },
    { left: 55, top: 25, delay: 1.6, duration: 2.4 },
    { left: 75, top: 28, delay: 1.9, duration: 2.8 },
    { left: 25, top: 45, delay: 0.2, duration: 2.6 },
    { left: 45, top: 48, delay: 0.5, duration: 3.1 },
    { left: 65, top: 45, delay: 0.8, duration: 2.5 },
    { left: 85, top: 48, delay: 1.1, duration: 2.9 },
    { left: 18, top: 68, delay: 1.4, duration: 2.7 },
    { left: 38, top: 72, delay: 1.7, duration: 2.3 },
    { left: 58, top: 68, delay: 0.3, duration: 2.8 },
    { left: 78, top: 72, delay: 0.6, duration: 2.4 },
    { left: 98, top: 68, delay: 0.9, duration: 2.6 },
    { left: 8, top: 88, delay: 1.2, duration: 3.0 },
    { left: 28, top: 92, delay: 1.5, duration: 2.5 },
    { left: 48, top: 88, delay: 1.8, duration: 2.9 },
    { left: 68, top: 92, delay: 0.1, duration: 2.7 },
    { left: 88, top: 88, delay: 0.4, duration: 2.3 },
  ]

  // Predefined positions for name sparkles to avoid hydration issues
  const nameSparklePositions = [
    { left: 90, top: 50, delay: 0 },
    { left: 50, top: 10, delay: 0.1 },
    { left: 10, top: 50, delay: 0.2 },
    { left: 50, top: 90, delay: 0.3 },
    { left: 75, top: 25, delay: 0.4 },
    { left: 25, top: 75, delay: 0.5 },
    { left: 75, top: 75, delay: 0.6 },
    { left: 25, top: 25, delay: 0.7 },
    { left: 85, top: 35, delay: 0.8 },
    { left: 15, top: 65, delay: 0.9 },
    { left: 65, top: 15, delay: 1.0 },
    { left: 35, top: 85, delay: 1.1 },
  ]

  // Animation variants for smooth transitions
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-32 h-32 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </motion.div>
      </div>
    )
  }

  return (
         <motion.section 
       id="home"
       className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 py-30"
       initial="hidden"
       animate="visible"
       variants={containerVariants}
     >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" as const }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" as const }}
        />
      </div>

      {/* MagicUI Globe Background with enhanced animation */}
      <motion.div 
        className="absolute inset-0 w-full h-full opacity-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        <Globe className="opacity-30" />
      </motion.div>

      {/* Enhanced Sparkles Effect */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {sparklePositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
            }}
                         animate={{
               scale: [0, 1, 0],
               opacity: [0, 1, 0],
             }}
             transition={{
               duration: pos.duration,
               repeat: Infinity,
               delay: pos.delay,
               ease: "easeInOut" as const,
             }}
          />
        ))}
      </div>

      {/* Floating Magic Elements */}
      <motion.div
        className="absolute top-20 left-20 text-blue-400/30"
        variants={floatingVariants}
        animate="animate"
      >
        <Sparkles size={24} />
      </motion.div>
      
      <motion.div
        className="absolute top-32 right-32 text-purple-400/30"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "1s" }}
      >
        <Star size={20} />
      </motion.div>
      
      <motion.div
        className="absolute bottom-40 left-32 text-pink-400/30"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "2s" }}
      >
        <Zap size={22} />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
                     {/* Logo Display */}
           <motion.div 
             className="mb-8 flex justify-center"
             variants={itemVariants}
           >
             <Logo size="lg" showText={false} />
           </motion.div>

           {/* Greeting with enhanced animation */}
           <motion.div 
             className="text-lg text-muted-foreground mb-4 flex items-center justify-center gap-2"
             variants={itemVariants}
           >
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              👋
            </motion.span>
            <motion.span
              variants={textRevealVariants}
              whileHover={{ scale: 1.05, x: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Hello, I&apos;m
            </motion.span>
          </motion.div>

          {/* Name with enhanced effect */}
          <motion.div 
            className="relative mb-6 group"
            variants={itemVariants}
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold"
              variants={textRevealVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.span 
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent uppercase"
                variants={typingVariants}
                whileHover="hover"
                custom={textGlowVariants}
              >
                {profile?.name || 'Mohamed Abdelqader'}
              </motion.span>
            </motion.h1>
            
            {/* Enhanced sparkles around the name */}
            <div className="absolute inset-0 -m-4">
              {nameSparklePositions.map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-blue-500 rounded-full"
                  style={{
                    left: `${pos.left}%`,
                    top: `${pos.top}%`,
                  }}
                                     animate={{
                     scale: [0, 1, 0],
                     opacity: [0, 1, 0],
                   }}
                   transition={{
                     duration: 2,
                     repeat: Infinity,
                     delay: pos.delay,
                     ease: "easeInOut" as const,
                   }}
                />
              ))}
            </div>
          </motion.div>

          {/* Title with enhanced animation */}
          <motion.h2 
            className="text-2xl md:text-3xl font-semibold text-foreground/80 mb-8"
            variants={textRevealVariants}
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.span
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="inline-block overflow-hidden whitespace-nowrap"
            >
              {profile?.title || 'MERN Stack Developer'}
            </motion.span>
            {/* <motion.span
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
              className="inline-block overflow-hidden whitespace-nowrap ml-2"
            >
              / Mern Stack Developer
            </motion.span> */}
          </motion.h2>

          {/* Description with enhanced animation */}
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
            variants={textRevealVariants}
            whileHover={{ scale: 1.01, y: -1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <motion.span
              variants={typingVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {profile?.bio || 'I craft exceptional digital experiences by combining cutting-edge technology with beautiful design. From concept to deployment, I bring ideas to life with passion and precision.'}
            </motion.span>
          </motion.p>

          {/* Enhanced CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={itemVariants}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                 onClick={() => scrollToSection('projects')}
                 size="lg" 
                 className="group hover-lift bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg cursor-pointer"
               >
                 <motion.span
                   whileHover={{ scale: 1.05 }}
                   transition={{ type: "spring", stiffness: 300 }}
                 >
                   View My Work
                 </motion.span>
                 <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
               </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                 onClick={() => scrollToSection('contact')}
                 variant="outline" 
                 size="lg" 
                 className="group hover-lift border-2 hover:border-purple-500 hover:text-purple-600 transition-all duration-300 cursor-pointer"
               >
                 <Mail className="mr-2 h-4 w-4" />
                 <motion.span
                   whileHover={{ scale: 1.05 }}
                   transition={{ type: "spring", stiffness: 300 }}
                 >
                   Let&apos;s Talk
                 </motion.span>
               </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="ghost" size="lg" className="group hover-lift hover:bg-gradient-to-r hover:from-pink-500/10 hover:to-purple-500/10 transition-all duration-300 cursor-pointer">
                <Link href="/resume.pdf" target="_blank">
                  <Download className="mr-2 h-4 w-4" />
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Download CV
                  </motion.span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Enhanced Stats with hover effects */}
          <motion.div 
            className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            <motion.div 
              className="text-center group p-4 rounded-lg hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-blue-600/10 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <motion.div 
                className="text-3xl font-bold text-foreground group-hover:text-blue-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {profile?.stats?.projectsCompleted || 50}+
              </motion.div>
              <motion.div 
                className="text-sm text-muted-foreground"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Projects Completed
              </motion.div>
            </motion.div>
            <motion.div 
              className="text-center group p-4 rounded-lg hover:bg-gradient-to-br hover:from-purple-500/10 hover:to-purple-600/10 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <motion.div 
                className="text-3xl font-bold text-foreground group-hover:text-purple-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {profile?.stats?.yearsExperience || 3}+
              </motion.div>
              <motion.div 
                className="text-sm text-muted-foreground"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Years Experience
              </motion.div>
            </motion.div>
            <motion.div 
              className="text-center group p-4 rounded-lg hover:bg-gradient-to-br hover:from-pink-500/10 hover:to-pink-600/10 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <motion.div 
                className="text-3xl font-bold text-foreground group-hover:text-pink-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {profile?.stats?.clientSatisfaction || 100}%
              </motion.div>
              <motion.div 
                className="text-sm text-muted-foreground"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Client Satisfaction
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        variants={itemVariants}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
      >
        <div className="w-6 h-10 border-2 border-foreground/20 rounded-full flex justify-center group hover:border-foreground/40 transition-colors">
          <motion.div 
            className="w-1 h-3 bg-foreground/60 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
          />
        </div>
      </motion.div>
    </motion.section>
  )
}

export default Hero
