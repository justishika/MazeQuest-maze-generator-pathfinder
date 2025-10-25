'use client';

import { motion } from 'framer-motion';
import { Github, Heart, Code } from 'lucide-react';

const Footer = () => {
  return (
    <motion.footer 
      className="relative z-10 py-8 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 1 }}
    >
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          className="flex items-center justify-center gap-2 mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <Code className="w-5 h-5 text-neon-blue" />
          <span className="text-gray-400 font-space">
            Built with Next.js, FastAPI, PyTorch & Framer Motion
          </span>
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-1 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <span>Made with</span>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          >
            <Heart className="w-4 h-4 text-red-500 fill-current" />
          </motion.div>
          <span>for Algorithms' enthusiasts</span>
        </motion.div>

        <motion.div
          className="mt-4 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
