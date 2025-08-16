"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Instagram, Send, CheckCircle, Sparkles, Star, Zap, MessageCircle } from "lucide-react"
import { Globe } from "@/components/magicui/globe"
import { motion } from "framer-motion"
import { useLoading } from "@/components/loading-provider"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const { isLoading } = useLoading()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submissionTime, setSubmissionTime] = useState<string | null>(null)
  const [contactInfo, setContactInfo] = useState({
    email: "",
    phone: "",
    location: "",
    github: "",
    linkedin: "",
    twitter: "",
    instagram: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear error when user starts typing
    if (error) {
      setError(null)
    }
  }

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required'
    if (!formData.email.trim()) return 'Email is required'
    if (!formData.subject.trim()) return 'Subject is required'
    if (!formData.message.trim()) return 'Message is required'
    
    if (formData.name.length > 100) return 'Name is too long (max 100 characters)'
    if (formData.email.length > 254) return 'Email is too long'
    if (formData.subject.length > 200) return 'Subject is too long (max 200 characters)'
    if (formData.message.length > 2000) return 'Message is too long (max 2000 characters)'
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) return 'Please enter a valid email address'
    
    return null
  }

  // Fetch contact info from Profile database on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile')
        const result = await response.json()
        
        if (result.success && result.data) {
          const profile = result.data
          setContactInfo({
            email: profile.email || '',
            phone: profile.phone || '',
            location: profile.location || '',
            github: profile.socialLinks?.github || '',
            linkedin: profile.socialLinks?.linkedin || '',
            twitter: profile.socialLinks?.twitter || '',
            instagram: profile.socialLinks?.instagram || ''
          })
        } else {
          console.error('Failed to fetch profile:', result.error)
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
      }
    }
    
    fetchProfile()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Frontend validation
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }
    
    setIsSubmitting(true)
    setError(null)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        setError(null)
        setSubmissionTime(result.timestamp)
        console.log('✅ Contact form submitted successfully:', result)
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false)
          setFormData({ name: "", email: "", subject: "", message: "" })
          setSubmissionTime(null)
        }, 3000)
      } else {
        // Handle error response
        console.error('❌ Contact form error:', result)
        setError(result.error || 'Failed to send message')
      }
    } catch (error) {
      console.error('Network error:', error)
      setError('Network error: Please check your connection and try again')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Contact info structure for display
  const contactInfoDisplay = [
    {
      icon: Mail,
      title: "Email",
      value: contactInfo.email,
      link: `mailto:${contactInfo.email}`,
      color: "from-blue-600 to-cyan-600"
    },
    {
      icon: Phone,
      title: "Phone",
      value: contactInfo.phone,
      link: `tel:${contactInfo.phone.replace(/\s/g, '')}`,
      color: "from-green-600 to-emerald-600"
    },
    {
      icon: MapPin,
      title: "Location",
      value: contactInfo.location,
      link: "#",
      color: "from-purple-600 to-pink-600"
    }
  ]

  // Dynamic social links structure for display - only show if they exist in profile
  const socialLinksDisplay = [
    ...(contactInfo.github ? [{
      icon: Github,
      name: "GitHub",
      url: contactInfo.github,
      color: "hover:text-gray-800",
      bgColor: "from-gray-600 to-gray-800"
    }] : []),
    ...(contactInfo.linkedin ? [{
      icon: Linkedin,
      name: "LinkedIn",
      url: contactInfo.linkedin,
      color: "hover:text-blue-600",
      bgColor: "from-blue-600 to-blue-700"
    }] : []),
    ...(contactInfo.twitter ? [{
      icon: Twitter,
      name: "Twitter",
      url: contactInfo.twitter,
      color: "hover:text-blue-400",
      bgColor: "from-blue-400 to-blue-500"
    }] : []),
    ...(contactInfo.instagram ? [{
      icon: Instagram,
      name: "Instagram",
      url: contactInfo.instagram,
      color: "hover:text-pink-600",
      bgColor: "from-pink-500 to-purple-600"
    }] : [])
  ].filter(Boolean)

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

  const floatingVariants = {
    animate: {
      y: [-6, 6, -6],
      rotate: [0, 2, -2, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  }

  const inputVariants = {
    focus: {
      scale: 1.02,
      transition: { duration: 0.2 }
    }
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
    return null
  }

  return (
    <motion.section 
      id="contact" 
      className="py-20 bg-muted/30 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      {/* Enhanced Background Globe */}
      <motion.div 
        className="absolute left-0 top-1/2 transform -translate-y-1/2 opacity-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
      >
        <Globe className="w-96 h-96" />
      </motion.div>

      {/* Floating Magic Elements */}
      <motion.div
        className="absolute top-20 right-20 text-blue-400/20"
        variants={floatingVariants}
        animate="animate"
      >
        <MessageCircle size={32} />
      </motion.div>
      
      <motion.div
        className="absolute bottom-20 left-20 text-purple-400/20"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "2s" }}
      >
        <Sparkles size={28} />
      </motion.div>

      <motion.div
        className="absolute top-40 left-40 text-pink-400/20"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "4s" }}
      >
        <Star size={24} />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div className="text-center mb-16" variants={textRevealVariants}>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Let&apos;s <motion.span 
              className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              whileHover="hover"
              custom={textGlowVariants}
            >Connect</motion.span>
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
              I&apos;m always interested in hearing about new opportunities and exciting projects. 
              Whether you have a question or just want to say hi, feel free to reach out!
            </motion.span>
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Enhanced Contact Form */}
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="group hover:shadow-2xl transition-all duration-500 relative overflow-hidden border-0 bg-gradient-to-br from-background to-muted/50">
                <CardHeader>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <CardTitle className="text-2xl">
                      <motion.span
                        variants={textRevealVariants}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        Send me a message
                      </motion.span>
                    </CardTitle>
                  </motion.div>
                  <CardDescription>
                    <motion.span
                      variants={typingVariants}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      Fill out the form below and I&apos;ll get back to you as soon as possible.
                    </motion.span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <motion.div 
                      className="text-center py-8"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      >
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      </motion.div>
                      <motion.h3 
                        className="text-xl font-semibold mb-2"
                        variants={textRevealVariants}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        Message Sent!
                      </motion.h3>
                      <motion.p 
                        className="text-muted-foreground"
                        variants={textRevealVariants}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        Thank you for reaching out. I&apos;ll get back to you soon!
                      </motion.p>
                      {submissionTime && (
                        <motion.p 
                          className="text-xs text-muted-foreground mt-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          Submitted at: {new Date(submissionTime).toLocaleString()}
                        </motion.p>
                      )}
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <motion.div
                          variants={inputVariants}
                          whileFocus="focus"
                        >
                          <motion.label 
                            htmlFor="name" 
                            className="block text-sm font-medium mb-2"
                            variants={textRevealVariants}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            Name *
                          </motion.label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            maxLength={100}
                            className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="Your name"
                          />
                          <div className={`text-xs text-right mt-1 ${
                            formData.name.length > 90 ? 'text-red-500' : 
                            formData.name.length > 80 ? 'text-yellow-500' : 
                            'text-muted-foreground'
                          }`}>
                            {formData.name.length}/100
                          </div>
                        </motion.div>
                        <motion.div
                          variants={inputVariants}
                          whileFocus="focus"
                        >
                          <motion.label 
                            htmlFor="email" 
                            className="block text-sm font-medium mb-2"
                            variants={textRevealVariants}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            Email *
                          </motion.label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            maxLength={254}
                            className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="your@email.com"
                          />
                          <div className={`text-xs text-right mt-1 ${
                            formData.email.length > 240 ? 'text-red-500' : 
                            formData.email.length > 220 ? 'text-yellow-500' : 
                            'text-muted-foreground'
                          }`}>
                            {formData.email.length}/254
                          </div>
                        </motion.div>
                      </div>
                      <motion.div
                        variants={inputVariants}
                        whileFocus="focus"
                      >
                        <motion.label 
                          htmlFor="subject" 
                          className="block text-sm font-medium mb-2"
                          variants={textRevealVariants}
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          Subject *
                        </motion.label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          maxLength={200}
                          className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="What's this about?"
                        />
                        <div className={`text-xs text-right mt-1 ${
                          formData.subject.length > 180 ? 'text-red-500' : 
                          formData.subject.length > 160 ? 'text-yellow-500' : 
                          'text-muted-foreground'
                        }`}>
                          {formData.subject.length}/200
                        </div>
                      </motion.div>
                      <motion.div
                        variants={inputVariants}
                        whileFocus="focus"
                      >
                        <motion.label 
                          htmlFor="message" 
                          className="block text-sm font-medium mb-2"
                          variants={textRevealVariants}
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          Message *
                        </motion.label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          maxLength={2000}
                          className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                          placeholder="Tell me about your project or inquiry..."
                        />
                        <div className={`text-xs text-right mt-1 ${
                          formData.message.length > 1800 ? 'text-red-500' : 
                          formData.message.length > 1600 ? 'text-yellow-500' : 
                          'text-muted-foreground'
                        }`}>
                          {formData.message.length}/2000
                        </div>
                      </motion.div>
                      
                      {/* Error Display */}
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3 bg-red-50 border border-red-200 rounded-md"
                        >
                          <p className="text-red-600 text-sm">{error}</p>
                        </motion.div>
                      )}
                      
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full group hover-lift bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg cursor-pointer"
                        >
                          {isSubmitting ? (
                            <motion.div className="flex items-center justify-center">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="mr-2"
                              >
                                <Zap className="h-4 w-4" />
                              </motion.div>
                              <span>Sending...</span>
                            </motion.div>
                          ) : (
                            <>
                              <motion.span
                                variants={textRevealVariants}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                Send Message
                              </motion.span>
                              <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </form>
                  )}
                </CardContent>
                
                {/* Enhanced gradient overlay */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none" />
              </Card>
            </motion.div>
          </motion.div>

          {/* Enhanced Contact Information */}
          <motion.div className="space-y-8" variants={itemVariants}>
            {/* Contact Details */}
            <div>
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
                Get in touch
              </motion.span>
            </motion.h3>
              <div className="space-y-4">
                {contactInfoDisplay.map((info, index) => (
                  <motion.div
                    key={info.title}
                    className="flex items-center space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-all duration-300 group"
                    whileHover={{ x: 5, scale: 1.02 }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 300, delay: index * 0.1 }}
                  >
                    <motion.div 
                      className={`p-2 rounded-lg group-hover:scale-110 transition-all duration-300 bg-gradient-to-r ${info.color} text-white shadow-lg`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <info.icon className="h-5 w-5" />
                    </motion.div>
                    <div>
                      <motion.p 
                        className="font-medium"
                        variants={textRevealVariants}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {info.title}
                      </motion.p>
                      <motion.a 
                        href={info.link}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        variants={textRevealVariants}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {info.value}
                      </motion.a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Enhanced Social Links - Only show if social links exist */}
            {socialLinksDisplay.length > 0 && (
              <div>
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
                    Follow me
                  </motion.span>
                </motion.h3>
                <div className="flex space-x-4">
                  {socialLinksDisplay.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg`}
                    aria-label={social.name}
                    whileHover={{ y: -5, scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 300, delay: index * 0.1 }}
                    style={{
                      background: `linear-gradient(135deg, var(--${social.bgColor.split('-')[1]}-600), var(--${social.bgColor.split('-')[2]}-600))`
                    }}
                  >
                  <social.icon className="h-5 w-5" />
              </motion.a>
            ))}
                </div>
              </div>
            )}

            {/* Enhanced Additional Info */}
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="group hover:shadow-xl transition-all duration-500 relative overflow-hidden border-0 bg-gradient-to-br from-background to-muted/30">
                <CardContent>
                  <motion.h4 
                    className="font-semibold mb-3"
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.span
                      variants={textRevealVariants}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      Available for:
                    </motion.span>
                  </motion.h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    {[
                      "Full-time opportunities",
                      "Freelance projects", 
                      "Open source contributions",
                      "Technical consulting"
                    ].map((item, index) => (
                      <motion.p
                        key={item}
                        whileHover={{ x: 5 }}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 400, delay: index * 0.1 }}
                      >
                        • <motion.span
                          variants={textRevealVariants}
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {item}
                        </motion.span>
                      </motion.p>
                    ))}
                  </div>
                </CardContent>
                
                {/* Enhanced gradient overlay */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none" />
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default Contact