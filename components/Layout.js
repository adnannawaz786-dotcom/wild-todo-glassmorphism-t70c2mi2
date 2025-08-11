/* EXPORTS: Layout as default */

import { motion } from 'framer-motion';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Wild Nature Background */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-green-900"></div>
        
        {/* Animated gradient overlays */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-amber-600/30 via-transparent to-lime-500/20"
          animate={{
            background: [
              'linear-gradient(45deg, rgba(217, 119, 6, 0.3) 0%, transparent 50%, rgba(132, 204, 22, 0.2) 100%)',
              'linear-gradient(45deg, rgba(132, 204, 22, 0.3) 0%, transparent 50%, rgba(217, 119, 6, 0.2) 100%)',
              'linear-gradient(45deg, rgba(217, 119, 6, 0.3) 0%, transparent 50%, rgba(132, 204, 22, 0.2) 100%)'
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-500/20 blur-xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-3/4 right-1/3 w-24 h-24 rounded-full bg-gradient-to-r from-green-400/20 to-teal-500/20 blur-xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <motion.div
          className="absolute top-1/2 right-1/4 w-20 h-20 rounded-full bg-gradient-to-r from-lime-400/20 to-emerald-500/20 blur-xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>
      
      {/* Main content container with glassmorphism */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-4xl mx-auto"
        >
          {/* Glassmorphism container */}
          <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 md:p-12">
            {/* Inner glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
            
            {/* Content */}
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Subtle animated particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>
  );
};

export default Layout;