"use client"

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Sparkles, Star, Rocket } from 'lucide-react'

interface LoadingContextType {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  setLoadingMessage: (message: string) => void
  setDataLoaded: (type: 'profile' | 'projects', loaded: boolean) => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}

interface LoadingProviderProps {
  children: ReactNode
}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingMessage, setLoadingMessage] = useState('Initializing...')
  const [dataLoaded, setDataLoaded] = useState({ profile: false, projects: false })

  useEffect(() => {
    // Check if all data is loaded
    if (dataLoaded.profile && dataLoaded.projects) {
      setIsLoading(false)
    }
    
    // Fallback: if data takes too long, show content anyway
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false)
    }, 10000) // 10 seconds fallback
    
    return () => clearTimeout(fallbackTimer)
  }, [dataLoaded])

  const setDataLoadedHandler = useCallback((type: 'profile' | 'projects', loaded: boolean) => {
    setDataLoaded(prev => ({ ...prev, [type]: loaded }))
  }, [])

  const setLoadingMessageHandler = useCallback((message: string) => {
    setLoadingMessage(message)
  }, [])

  // Predefined positions to avoid hydration errors while keeping the amazing design
  const lightningPositions = [
    { left: '15%', delay: 0, duration: 0.3, repeatDelay: 2 },
    { left: '35%', delay: 0.5, duration: 0.4, repeatDelay: 1.5 },
    { left: '55%', delay: 1, duration: 0.35, repeatDelay: 2.5 },
    { left: '75%', delay: 1.5, duration: 0.3, repeatDelay: 2 },
    { left: '85%', delay: 2, duration: 0.4, repeatDelay: 1.5 }
  ]

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, setLoadingMessage: setLoadingMessageHandler, setDataLoaded: setDataLoadedHandler }}>
      {children}
      
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-150 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden"
          >
            {/* Lightning Background Effect */}
            <div className="absolute inset-0">
              {/* Animated lightning bolts */}
              {lightningPositions.map((pos, i) => (
                <motion.div
                  key={`lightning-${i}`}
                  className="absolute top-0 w-1 h-32 bg-gradient-to-b from-yellow-400 to-transparent"
                  style={{ left: pos.left }}
                  animate={{
                    opacity: [0, 1, 0],
                    scaleY: [0, 1, 0],
                  }}
                  transition={{
                    duration: pos.duration,
                    repeat: Infinity,
                    repeatDelay: pos.repeatDelay,
                  }}
                />
              ))}
              {/* Additional lightning effects with better positioning */}
              <motion.div
                className="absolute top-0 w-1 h-36 bg-gradient-to-b from-blue-400 to-transparent"
                style={{ left: '45%' }}
                animate={{
                  opacity: [0, 1, 0],
                  scaleY: [0, 1, 0],
                }}
                transition={{
                  duration: 0.4,
                  repeat: Infinity,
                  repeatDelay: 1.8,
                }}
              />
              <motion.div
                className="absolute top-0 w-1 h-32 bg-gradient-to-b from-purple-400 to-transparent"
                style={{ left: '65%' }}
                animate={{
                  opacity: [0, 1, 0],
                  scaleY: [0, 1, 0],
                }}
                transition={{
                  duration: 0.35,
                  repeat: Infinity,
                  repeatDelay: 2.2,
                }}
              />
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{
                    left: `${10 + (i * 4.5)}%`,
                    top: `${15 + (i * 3.8)}%`,
                  }}
                  animate={{
                    y: [0, -100, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + (i * 0.1),
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>

            {/* Main Loading Content */}
            <div className="relative z-10 text-center">
              {/* Animated Logo/Icon */}
              <motion.div
                className="mb-8"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="relative">
                  {/* Central glowing orb */}
                  <motion.div
                    className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-2xl"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(59, 130, 246, 0.5)",
                        "0 0 40px rgba(147, 51, 234, 0.8)",
                        "0 0 60px rgba(236, 72, 153, 0.6)",
                        "0 0 20px rgba(59, 130, 246, 0.5)",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  
                  {/* Rotating icons around the orb */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <Zap className="w-8 h-8 text-yellow-400" />
                    </div>
                    <div className="absolute top-1/2 -right-2 transform -translate-y-1/2">
                      <Sparkles className="w-8 h-8 text-pink-400" />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <Star className="w-8 h-8 text-blue-400" />
                    </div>
                    <div className="absolute top-1/2 -left-2 transform -translate-y-1/2">
                      <Rocket className="w-8 h-8 text-purple-400" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Loading Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mb-6"
              >
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                  MOHAMED
                </h1>
                <p className="text-xl md:text-2xl text-white/80 font-medium">
                  Portfolio Loading...
                </p>
              </motion.div>

              {/* Loading Message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mb-8"
              >
                <p className="text-lg text-white/60 max-w-md mx-auto">
                  {loadingMessage}
                </p>
              </motion.div>

              {/* Progress Bar */}
              <motion.div
                className="w-64 h-2 bg-white/20 rounded-full mx-auto overflow-hidden"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 2.5,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              {/* Animated Dots */}
              <motion.div
                className="flex justify-center space-x-2 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.8 }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 bg-white rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            </div>

            {/* Background Globe */}
            {/* <motion.div
              className="absolute bottom-10 right-10 opacity-20"
              animate={{ rotate: 360 }}
              transition={{
                duration: 60,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Globe className="w-32 h-32 text-white" />
            </motion.div> */}
          </motion.div>
        )}
      </AnimatePresence>
    </LoadingContext.Provider>
  )
}
