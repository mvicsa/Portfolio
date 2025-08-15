"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Sparkles, Star, Zap, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion, AnimatePresence } from "framer-motion"
import { scrollToSection } from "@/lib/utils"
import Logo from "@/components/Logo"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
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

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const,
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const,
        staggerChildren: 0.1,
      },
    },
  }

  const mobileItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
      },
    },
  }

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-[100] bg-background/80 backdrop-blur-md border-b border-border overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Floating Magic Elements */}
      <motion.div
        className="absolute top-2 left-8 text-blue-400/20"
        variants={floatingVariants}
        animate="animate"
      >
        <Sparkles size={16} />
      </motion.div>
      
      <motion.div
        className="absolute top-3 right-16 text-purple-400/20"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "1s" }}
      >
        <Star size={14} />
      </motion.div>

      <motion.div
        className="absolute top-1 right-8 text-pink-400/20"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "2s" }}
      >
        <Zap size={12} />
      </motion.div>

      <motion.div
        className="absolute top-2 left-16 text-green-400/20"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "3s" }}
      >
        <Globe size={13} />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-16">
          {/* Enhanced Logo */}
          <motion.div variants={itemVariants}>
            <Link href="/">
              <Logo size="md" showText={true} />
            </Link>
          </motion.div>

          {/* Enhanced Desktop Navigation */}
          <motion.nav className="hidden md:flex items-center space-x-8" variants={itemVariants}>
            {[
              { href: "#home", label: "Home" },
              { href: "#about", label: "About" },
              { href: "#projects", label: "Projects" },
              { href: "#contact", label: "Contact" }
            ].map((link, index) => (
              <motion.div
                key={link.href}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, delay: index * 0.1 }}
              >
                {link.href.startsWith('#') ? (
                  <button 
                    onClick={() => scrollToSection(link.href.substring(1))}
                    className="text-foreground/80 hover:text-foreground transition-colors relative group cursor-pointer"
                  >
                    {link.label}
                    <motion.span
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                    />
                  </button>
                ) : (
                  <Link 
                    href={link.href} 
                    className="text-foreground/80 hover:text-foreground transition-colors relative group"
                  >
                    {link.label}
                    <motion.span
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                    />
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.nav>

          {/* Enhanced Right side - Theme toggle and CTA */}
          <motion.div className="hidden md:flex items-center space-x-4" variants={itemVariants}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ThemeToggle />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
                <Button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Get In Touch
                </Button>
            </motion.div>
          </motion.div>

          {/* Enhanced Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-md text-foreground/80 hover:text-foreground hover:bg-accent transition-colors"
            onClick={toggleMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            variants={itemVariants}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden border-t border-border overflow-hidden"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <motion.nav className="py-4 flex flex-col space-y-4">
                {[
                  { href: "#home", label: "Home" },
                  { href: "#about", label: "About" },
                  { href: "#projects", label: "Projects" },
                  { href: "#contact", label: "Contact" }
                ].map((link) => (
                  <motion.div
                    key={link.href}
                    variants={mobileItemVariants}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {link.href.startsWith('#') ? (
                      <button 
                        onClick={() => {
                          scrollToSection(link.href.substring(1))
                          setIsMenuOpen(false)
                        }}
                        className="text-foreground/80 hover:text-foreground transition-colors py-2 block text-left w-full"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link 
                        href={link.href} 
                        className="text-foreground/80 hover:text-foreground transition-colors py-2 block"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
                <motion.div 
                  className="flex items-center justify-between pt-2"
                  variants={mobileItemVariants}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <ThemeToggle />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex-1 ml-4"
                  >
                    <Button 
                      onClick={() => scrollToSection('contact')}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      Get In Touch
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

export default Header
