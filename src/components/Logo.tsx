"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface LogoProps {
  className?: string
  showText?: boolean
  size?: "sm" | "md" | "lg"
}

const Logo = ({ className = "", showText = true, size = "md" }: LogoProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10", 
    lg: "w-12 h-12"
  }

  const textSizes = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl"
  }

  const logoVariants = {
    initial: { scale: 1, rotate: 0 },
    animate: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.1, 
      rotate: [0, -5, 5, 0],
      transition: { 
        duration: 0.6,
        ease: "easeInOut" as const
      }
    }
  }

  const iconVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: 1.5,
        ease: "easeInOut" as const
      }
    },
    hover: { 
      pathLength: 1.2,
      transition: { 
        duration: 0.3,
        ease: "easeInOut" as const
      }
    }
  }

  const textVariants = {
    initial: { opacity: 0, x: 0 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.8,
        delay: 0.5,
        ease: "easeOut" as const
      }
    },
    hover: { 
      x: 5,
      transition: { 
        duration: 0.3,
        ease: "easeOut" as const
      }
    }
  }



  return (
    <motion.div 
      className={`flex items-center space-x-3 ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Animated Logo Icon */}
             <motion.div
         className={`relative ${sizeClasses[size]} bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg`}
         variants={logoVariants}
         initial="initial"
         whileHover="hover"
         animate="initial"
       >
        {/* Main Icon - Abstract M with creative elements */}
        <svg 
          className="w-full h-full p-2" 
          viewBox="0 0 24 24" 
          fill="none"
        >
          {/* Background glow effect */}
          <motion.circle
            cx="12"
            cy="12"
            r="10"
            className="fill-white/20"
            animate={{
              scale: isHovered ? [1, 1.2, 1] : 1,
              opacity: isHovered ? [0.2, 0.4, 0.2] : 0.2
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Main M shape */}
          <motion.path
            d="M4 18V8L8 14L12 8L16 14L20 8V18"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={iconVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          />
          
          {/* Creative accent lines */}
          <motion.path
            d="M6 12L10 16"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
            variants={iconVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.3 }}
          />
          
          <motion.path
            d="M18 12L14 16"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
            variants={iconVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.5 }}
          />
        </svg>

        {/* Floating particles around logo */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${10 + (i * 14)}%`,
              top: `${10 + (i * 14)}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400/30 to-purple-400/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Animated Text */}
      {showText && (
        <motion.div
          variants={textVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="flex flex-col"
        >
          <motion.span 
            className={`font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent ${textSizes[size]}`}
            whileHover={{ 
              backgroundPosition: "100% 0%",
              transition: { duration: 0.5 }
            }}
            style={{
              backgroundSize: "200% 100%",
              backgroundPosition: "0% 0%"
            }}
          >
            MOHAMED
          </motion.span>
          
          {/* Subtitle */}
          <motion.span 
            className="text-xs text-muted-foreground font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            Developer
          </motion.span>
        </motion.div>
      )}
    </motion.div>
  )
}

export default Logo
