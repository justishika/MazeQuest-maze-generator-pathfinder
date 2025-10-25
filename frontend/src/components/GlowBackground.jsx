'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const GlowBackground = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      delay: Math.random() * 6,
      duration: Math.random() * 4 + 4
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-gray-900 to-black" />
      
      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }}
        />
      </div>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-neon-blue rounded-full opacity-60"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-purple/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-neon-green/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  );
};

export default GlowBackground;
