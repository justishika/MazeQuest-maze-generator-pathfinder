'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  RotateCcw, 
  Settings, 
  Zap, 
  Brain,
  ChevronDown,
  Gauge,
  Trash2,
  BarChart3,
  Info,
  AlertTriangle
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const ControlPanel = ({
  onGenerateMaze,
  onVisualizePath,
  onReset,
  isGenerating,
  isRunning,
  currentAlgorithm,
  onAlgorithmChange,
  animationSpeed,
  onSpeedChange,
  onResetMaze,
  onResetPath,
  onResetStartEnd,
  algorithmStats = null,
  showMetrics = false,
  onToggleMetrics
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const dropdownRef = useRef(null);

  const algorithms = [
    { value: 'BFS', label: 'Breadth-First Search', description: 'Explores level by level', complexity: 'O(V+E)' },
    { value: 'DFS', label: 'Depth-First Search', description: 'Explores as far as possible', complexity: 'O(V+E)' },
    { value: 'A*', label: 'A* Algorithm', description: 'Heuristic-based optimal search', complexity: 'O(b^d)' },
    { value: 'Dijkstra', label: "Dijkstra's Algorithm", description: 'Shortest path algorithm', complexity: 'O((V+E)logV)' },
    { value: 'Q-Learning', label: 'Q-Learning', description: 'AI reinforcement learning', complexity: 'Variable' }
  ];

  const currentAlgo = algorithms.find(algo => algo.value === currentAlgorithm);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Show toast notification
  const showToastNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleAlgorithmChange = (algorithm) => {
    onAlgorithmChange(algorithm);
    setShowDropdown(false);
    showToastNotification(`Algorithm changed to ${algorithms.find(a => a.value === algorithm)?.label}`);
  };

  const handleReset = (type) => {
    switch (type) {
      case 'maze':
        onResetMaze?.();
        showToastNotification('Maze reset');
        break;
      case 'path':
        onResetPath?.();
        showToastNotification('Path cleared');
        break;
      case 'startend':
        onResetStartEnd?.();
        showToastNotification('Start/End positions reset');
        break;
      default:
        onReset();
        showToastNotification('All reset');
    }
  };

  return (
    <>
      <motion.div 
        className="glass-dark rounded-2xl p-6 border border-white/10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-orbitron font-bold text-neon-blue flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Control Panel
          </h3>
          <div className="flex items-center gap-2">
            <motion.button
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              onClick={() => onToggleMetrics?.()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </motion.button>
            <motion.button
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              onClick={() => setIsExpanded(!isExpanded)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronDown 
                className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
              />
            </motion.button>
          </div>
        </div>

        {/* Main Controls */}
        <div className="space-y-4">
          {/* Generate Maze Button */}
          <motion.button
            className="w-full btn-hover bg-gradient-to-r from-neon-cyan to-neon-purple text-black font-space font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onGenerateMaze}
            disabled={isGenerating || isRunning}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isGenerating ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Brain className="w-5 h-5" />
              </motion.div>
            ) : (
              <Zap className="w-5 h-5" />
            )}
            {isGenerating ? 'Generating AI Maze...' : 'Generate AI Maze'}
          </motion.button>

          {/* Visualize Path Button */}
          <motion.button
            className="w-full btn-hover bg-gradient-to-r from-neon-green to-neon-cyan text-black font-space font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onVisualizePath}
            disabled={isGenerating || isRunning}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Play className="w-5 h-5" />
            {isRunning ? 'Visualizing...' : 'Visualize Path'}
          </motion.button>

          {/* Reset Options */}
          <div className="grid grid-cols-2 gap-2">
            <motion.button
              className="btn-hover bg-gradient-to-r from-gray-600 to-gray-700 text-white font-space font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 text-sm"
              onClick={() => handleReset('maze')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Trash2 className="w-4 h-4" />
              Reset Maze
            </motion.button>
            <motion.button
              className="btn-hover bg-gradient-to-r from-gray-600 to-gray-700 text-white font-space font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 text-sm"
              onClick={() => handleReset('path')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RotateCcw className="w-4 h-4" />
              Clear Path
            </motion.button>
          </div>
        </div>

        {/* Expanded Controls */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="mt-6 space-y-4"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="border-t border-white/10 pt-4">
                {/* Algorithm Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-space font-medium text-gray-300 mb-2">
                    Algorithm
                  </label>
                  <div className="relative" ref={dropdownRef}>
                    <motion.button
                      className="w-full custom-dropdown px-3 py-2 text-left flex items-center justify-between"
                      onClick={() => setShowDropdown(!showDropdown)}
                      whileHover={{ scale: 1.01 }}
                    >
                      <span>{currentAlgo?.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                    </motion.button>
                    
                    <AnimatePresence>
                      {showDropdown && (
                        <motion.div
                          className="custom-dropdown-options"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {algorithms.map((algo) => (
                            <div
                              key={algo.value}
                              className="custom-dropdown-option"
                              onClick={() => handleAlgorithmChange(algo.value)}
                            >
                              <div className="flex justify-between items-center">
                                <span>{algo.label}</span>
                                <span className="text-xs text-gray-500">{algo.complexity}</span>
                              </div>
                              <p className="text-xs text-gray-400 mt-1">{algo.description}</p>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Animation Speed */}
                <div className="mb-4">
                  <label className="block text-sm font-space font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <Gauge className="w-4 h-4" />
                    Animation Speed
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={animationSpeed}
                      onChange={(e) => onSpeedChange(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Instant</span>
                      <span className="text-neon-cyan font-medium">{animationSpeed}ms</span>
                      <span>Slow</span>
                    </div>
                  </div>
                </div>

                {/* Algorithm Info */}
                {currentAlgo && (
                  <div className="p-3 bg-neon-cyan/10 rounded-lg border border-neon-cyan/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-4 h-4 text-neon-cyan" />
                      <span className="text-sm font-orbitron font-bold text-neon-cyan">Algorithm Info</span>
                    </div>
                    <p className="text-xs text-gray-300 mb-1">{currentAlgo.description}</p>
                    <p className="text-xs text-gray-400">Time Complexity: {currentAlgo.complexity}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            className="toast"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ControlPanel;
