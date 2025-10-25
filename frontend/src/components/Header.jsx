'use client';

import { motion } from 'framer-motion';
import { Brain, Zap } from 'lucide-react';

const Header = () => {
  return (
    <motion.header 
      className="relative z-10 p-8 text-center"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="flex items-center justify-center gap-4 mb-4"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.div
          className="relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Brain className="w-12 h-12 text-neon-blue neon-glow-blue" />
        </motion.div>
        <motion.div
          className="relative"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <Zap className="w-10 h-10 text-neon-purple neon-glow-purple" />
        </motion.div>
      </motion.div>

      <motion.h1 
        className="text-6xl md:text-8xl font-orbitron font-black mb-4 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        MazeQuest AI
      </motion.h1>

      <motion.p 
        className="text-xl md:text-2xl text-gray-300 font-space font-light max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        Watch Artificial Intelligence Solve Its Own Mazes
      </motion.p>

      <motion.div
        className="mt-8 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-neon-blue to-transparent rounded-full"></div>
      </motion.div>
    </motion.header>
  );
};

export default Header;
