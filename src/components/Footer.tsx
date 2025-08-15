"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Github, Linkedin, Twitter, Instagram, Mail, Heart, Sparkles, Star, Zap, Globe, ArrowUp } from "lucide-react"
import { motion } from "framer-motion"
import Logo from "@/components/Logo"

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [socialLinks, setSocialLinks] = useState([
    { name: "GitHub", icon: Github, href: "https://github.com/mvicsa", color: "from-gray-600 to-gray-800" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/mvicsa", color: "from-blue-600 to-blue-700" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/mvicsa", color: "from-blue-400 to-blue-500" },
    { name: "Email", icon: Mail, href: "mailto:hello@mvicsa.dev", color: "from-green-600 to-emerald-600" }
  ])

  // Fetch social links from Profile database on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile')
        const result = await response.json()
        
        if (result.success && result.data) {
          const profile = result.data
          const dynamicSocialLinks = [
            ...(profile.socialLinks?.github ? [{ name: "GitHub", icon: Github, href: profile.socialLinks.github, color: "from-gray-600 to-gray-800" }] : []),
            ...(profile.socialLinks?.linkedin ? [{ name: "LinkedIn", icon: Linkedin, href: profile.socialLinks.linkedin, color: "from-blue-600 to-blue-700" }] : []),
            ...(profile.socialLinks?.twitter ? [{ name: "Twitter", icon: Twitter, href: profile.socialLinks.twitter, color: "from-blue-400 to-blue-500" }] : []),
            ...(profile.socialLinks?.instagram ? [{ name: "Instagram", icon: Instagram, href: profile.socialLinks.instagram, color: "from-pink-500 to-purple-600" }] : []),
            ...(profile.email ? [{ name: "Email", icon: Mail, href: `mailto:${profile.email}`, color: "from-green-600 to-emerald-600" }] : [])
          ].filter(Boolean)
          
          if (dynamicSocialLinks.length > 0) {
            setSocialLinks(dynamicSocialLinks)
          }
        } else {
          console.error('Failed to fetch profile:', result.error)
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
      }
    }
    
    fetchProfile()
  }, [])

  const footerLinks = {
    sections: [
      {
        title: "Navigation",
        links: [
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
          { name: "Projects", href: "/projects" },
          { name: "Contact", href: "/contact" }
        ]
      },
      {
        title: "Services",
        links: [
          { name: "Web Development", href: "#" },
          { name: "Mobile Apps", href: "#" },
          { name: "UI/UX Design", href: "#" },
          { name: "Consulting", href: "#" }
        ]
      },
      {
        title: "Resources",
        links: [
          { name: "Blog", href: "#" },
          { name: "Documentation", href: "#" },
          { name: "Tutorials", href: "#" },
          { name: "Case Studies", href: "#" }
        ]
      }
    ],
    social: socialLinks
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
      y: [-8, 8, -8],
      rotate: [0, 3, -3, 0],
      transition: {
        duration: 6,
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.footer 
      className="bg-background border-t border-border relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      {/* Floating Magic Elements */}
      <motion.div
        className="absolute top-10 left-20 text-blue-400/20"
        variants={floatingVariants}
        animate="animate"
      >
        <Sparkles size={24} />
      </motion.div>
      
      <motion.div
        className="absolute top-20 right-20 text-purple-400/20"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "2s" }}
      >
        <Star size={20} />
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-32 text-pink-400/20"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "4s" }}
      >
        <Zap size={18} />
      </motion.div>

      <motion.div
        className="absolute bottom-10 right-32 text-green-400/20"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "1s" }}
      >
        <Globe size={22} />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Enhanced Brand Section */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link href="/" className="mb-4 inline-block">
                <Logo size="md" showText={true} />
              </Link>
            </motion.div>
            <motion.p 
              className="text-muted-foreground mb-4 max-w-md"
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.span
                variants={textRevealVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Full-stack developer passionate about creating exceptional digital experiences. 
                Let&apos;s build something amazing together.
              </motion.span>
            </motion.p>
            {socialLinks.length > 0 && (
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                  aria-label={social.name}
                                     whileHover={{ y: -5, scale: 1.1, rotate: 5 }}
                   whileTap={{ scale: 0.95 }}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ type: "spring", stiffness: 300, delay: index * 0.1 }}
                  style={{
                    background: `linear-gradient(135deg, var(--${social.color.split('-')[1]}-600), var(--${social.color.split('-')[2]}-600))`
                  }}
                >
                <social.icon className="h-4 w-4" />
              </motion.a>
            ))}
              </div>
            )}
          </motion.div>

          {/* Enhanced Footer Links */}
          {footerLinks.sections.map((section, sectionIndex) => (
            <motion.div key={section.title} variants={itemVariants}>
              <motion.h3 
                className="font-semibold mb-4"
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.span
                  variants={textRevealVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {section.title}
                </motion.span>
              </motion.h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.li 
                    key={link.name}
                                         whileHover={{ x: 5 }}
                     initial={{ opacity: 0, x: -10 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ type: "spring", stiffness: 400, delay: (sectionIndex * 0.1) + (linkIndex * 0.05) }}
                  >
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <motion.span
                        variants={textRevealVariants}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {link.name}
                      </motion.span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Newsletter Signup */}
        <motion.div 
          className="border-t border-border pt-8 mb-8"
          variants={itemVariants}
        >
          <div className="max-w-md">
            <motion.h3 
              className="font-semibold mb-2"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.span
                variants={textRevealVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Stay Updated
              </motion.span>
            </motion.h3>
            <motion.p 
              className="text-sm text-muted-foreground mb-4"
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.span
                variants={textRevealVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Get notified about new projects, tech insights, and opportunities.
              </motion.span>
            </motion.p>
            <div className="flex space-x-2">
              <motion.input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
              <motion.button 
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-sm shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Bottom Footer */}
        <motion.div 
          className="border-t border-border pt-8"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.div 
              className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.span
                variants={textRevealVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                © {currentYear} MVICSA. All rights reserved.
              </motion.span>
              <span>•</span>
              <motion.span
                variants={textRevealVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Made with
              </motion.span>
              <motion.div
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Heart className="h-4 w-4 text-red-500" />
              </motion.div>
              <motion.span
                variants={textRevealVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                using Next.js & Tailwind CSS
              </motion.span>
            </motion.div>
            <div className="flex space-x-6 text-sm">
                              {[
                  { name: "Privacy Policy", href: "#" },
                  { name: "Terms of Service", href: "#" },
                  { name: "Cookie Policy", href: "#" }
                ].map((link, index) => (
                  <motion.div
                    key={link.name}
                    whileHover={{ y: -2 }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 300, delay: index * 0.1 }}
                  >
                    <Link 
                      href={link.href} 
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <motion.span
                        variants={textRevealVariants}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {link.name}
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 cursor-pointer"
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, delay: 1 }}
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>

      {/* Floating Logo */}
      <motion.div
        className="fixed bottom-6 left-6 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, delay: 1.5 }}
      >
        <Logo size="sm" showText={false} />
      </motion.div>
    </motion.footer>
  )
}

export default Footer
