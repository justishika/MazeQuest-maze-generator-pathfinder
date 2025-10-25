'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Clock, Route, Target, Zap, X } from 'lucide-react';

const MetricsDashboard = ({ 
  isVisible, 
  onClose, 
  algorithmStats = null,
  mazeStats = null 
}) => {
  if (!isVisible) return null;

  const formatTime = (ms) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const formatEfficiency = (visited, total) => {
    if (!total || total === 0) return '0%';
    return `${((visited / total) * 100).toFixed(1)}%`;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-dark-surface/95 backdrop-blur-sm rounded-2xl p-6 border border-neon-cyan/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-orbitron font-bold text-neon-cyan flex items-center gap-3">
                <BarChart3 className="w-6 h-6" />
                Performance Metrics
              </h3>
              <motion.button
                className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors"
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5 text-red-400" />
              </motion.button>
            </div>

            <div className="space-y-6">
              {/* Algorithm Performance */}
              {algorithmStats && (
                <div className="metrics-card">
                  <h4 className="text-lg font-orbitron font-bold text-neon-cyan mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Algorithm Performance
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="metric-item">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-neon-cyan" />
                        <span className="metric-label">Execution Time</span>
                      </div>
                      <span className="metric-value">
                        {formatTime(algorithmStats.executionTime || 0)}
                      </span>
                    </div>

                    <div className="metric-item">
                      <div className="flex items-center gap-2">
                        <Route className="w-4 h-4 text-neon-green" />
                        <span className="metric-label">Path Length</span>
                      </div>
                      <span className="metric-value">
                        {algorithmStats.pathLength || 0} steps
                      </span>
                    </div>

                    <div className="metric-item">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-neon-purple" />
                        <span className="metric-label">Nodes Visited</span>
                      </div>
                      <span className="metric-value">
                        {algorithmStats.nodesVisited || 0}
                      </span>
                    </div>

                    <div className="metric-item">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-neon-pink" />
                        <span className="metric-label">Efficiency</span>
                      </div>
                      <span className="metric-value">
                        {formatEfficiency(algorithmStats.nodesVisited, algorithmStats.totalNodes)}
                      </span>
                    </div>
                  </div>

                  {algorithmStats.algorithm && (
                    <div className="mt-4 p-3 bg-neon-cyan/5 rounded-lg border border-neon-cyan/20">
                      <p className="text-sm text-gray-300">
                        <span className="font-semibold text-neon-cyan">Algorithm:</span> {algorithmStats.algorithm}
                      </p>
                      {algorithmStats.complexity && (
                        <p className="text-sm text-gray-400 mt-1">
                          <span className="font-semibold">Complexity:</span> {algorithmStats.complexity}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Maze Statistics */}
              {mazeStats && (
                <div className="metrics-card">
                  <h4 className="text-lg font-orbitron font-bold text-neon-purple mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Maze Statistics
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="metric-item">
                      <span className="metric-label">Dimensions</span>
                      <span className="metric-value">
                        {mazeStats.rows} × {mazeStats.cols}
                      </span>
                    </div>

                    <div className="metric-item">
                      <span className="metric-label">Total Cells</span>
                      <span className="metric-value">
                        {mazeStats.totalCells || 0}
                      </span>
                    </div>

                    <div className="metric-item">
                      <span className="metric-label">Wall Density</span>
                      <span className="metric-value">
                        {((mazeStats.wallCount / mazeStats.totalCells) * 100).toFixed(1)}%
                      </span>
                    </div>

                    <div className="metric-item">
                      <span className="metric-label">Path Density</span>
                      <span className="metric-value">
                        {((mazeStats.pathCount / mazeStats.totalCells) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* AI Parameters */}
              {mazeStats?.aiParams && (
                <div className="metrics-card">
                  <h4 className="text-lg font-orbitron font-bold text-neon-pink mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    AI Generation Parameters
                  </h4>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-orbitron font-bold text-neon-green mb-1">
                        {(mazeStats.aiParams.density * 100).toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-400">Density</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-orbitron font-bold text-neon-purple mb-1">
                        {(mazeStats.aiParams.connectivity * 100).toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-400">Connectivity</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-orbitron font-bold text-neon-pink mb-1">
                        {(mazeStats.aiParams.complexity * 100).toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-400">Complexity</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Performance Insights */}
              {algorithmStats && (
                <div className="metrics-card">
                  <h4 className="text-lg font-orbitron font-bold text-neon-yellow mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Performance Insights
                  </h4>
                  
                  <div className="space-y-3">
                    {algorithmStats.efficiency > 0.8 && (
                      <div className="flex items-center gap-2 text-green-400">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-sm">Excellent efficiency - algorithm found optimal path quickly</span>
                      </div>
                    )}
                    
                    {algorithmStats.pathLength > 0 && algorithmStats.nodesVisited > 0 && (
                      <div className="flex items-center gap-2 text-blue-400">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-sm">
                          Explored {algorithmStats.nodesVisited} nodes to find {algorithmStats.pathLength}-step solution
                        </span>
                      </div>
                    )}
                    
                    {algorithmStats.executionTime > 1000 && (
                      <div className="flex items-center gap-2 text-yellow-400">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span className="text-sm">Consider using a faster algorithm for larger mazes</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MetricsDashboard;
