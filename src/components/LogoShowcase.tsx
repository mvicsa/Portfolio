"use client"

import { motion } from "framer-motion"
import Logo from "./Logo"

const LogoShowcase = () => {
  return (
    <div className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-4">Logo Showcase</h2>
          <p className="text-xl text-muted-foreground">
            Different sizes and configurations of the MVICSA logo
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          {/* Small Logo */}
          <motion.div 
            className="text-center p-8 bg-background rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            whileHover={{ y: -5 }}
          >
            <h3 className="text-lg font-semibold mb-4">Small Logo</h3>
            <div className="flex justify-center mb-4">
              <Logo size="sm" showText={true} />
            </div>
            <p className="text-sm text-muted-foreground">
              Perfect for compact spaces
            </p>
          </motion.div>

          {/* Medium Logo */}
          <motion.div 
            className="text-center p-8 bg-background rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ y: -5 }}
          >
            <h3 className="text-lg font-semibold mb-4">Medium Logo</h3>
            <div className="flex justify-center mb-4">
              <Logo size="md" showText={true} />
            </div>
            <p className="text-sm text-muted-foreground">
              Standard size for headers
            </p>
          </motion.div>

          {/* Large Logo */}
          <motion.div 
            className="text-center p-8 bg-background rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ y: -5 }}
          >
            <h3 className="text-lg font-semibold mb-4">Large Logo</h3>
            <div className="flex justify-center mb-4">
              <Logo size="lg" showText={true} />
            </div>
            <p className="text-sm text-muted-foreground">
              Hero sections and branding
            </p>
          </motion.div>
        </div>

        {/* Icon Only Versions */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-8">Icon Only Versions</h3>
          <div className="flex justify-center space-x-8">
            <div className="text-center">
              <div className="mb-2">
                <Logo size="sm" showText={false} />
              </div>
              <p className="text-sm text-muted-foreground">Small Icon</p>
            </div>
            <div className="text-center">
              <div className="mb-2">
                <Logo size="md" showText={false} />
              </div>
              <p className="text-sm text-muted-foreground">Medium Icon</p>
            </div>
            <div className="text-center">
              <div className="mb-2">
                <Logo size="lg" showText={false} />
              </div>
              <p className="text-sm text-muted-foreground">Large Icon</p>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="p-6 bg-background rounded-xl shadow-lg">
            <h4 className="text-lg font-semibold mb-3">✨ Creative Design</h4>
            <p className="text-muted-foreground">
              Abstract M shape with gradient colors and floating particles
            </p>
          </div>
          <div className="p-6 bg-background rounded-xl shadow-lg">
            <h4 className="text-lg font-semibold mb-3">🎭 Smooth Animations</h4>
            <p className="text-muted-foreground">
              Hover effects, path animations, and particle systems
            </p>
          </div>
          <div className="p-6 bg-background rounded-xl shadow-lg">
            <h4 className="text-lg font-semibold mb-3">🎨 Gradient Colors</h4>
            <p className="text-muted-foreground">
              Blue to purple to pink gradient with hover glow effects
            </p>
          </div>
          <div className="p-6 bg-background rounded-xl shadow-lg">
            <h4 className="text-lg font-semibold mb-3">📱 Responsive</h4>
            <p className="text-muted-foreground">
              Multiple sizes and configurations for different use cases
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default LogoShowcase
