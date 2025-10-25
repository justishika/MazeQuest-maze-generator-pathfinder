'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Play, Square, Target, Home, Maximize2, Minimize2, X, ZoomIn, ZoomOut, RotateCcw, MousePointer2 } from 'lucide-react';
import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const MazeGrid = ({ 
  maze, 
  start, 
  end, 
  visitedCells, 
  finalPath, 
  isAnimating,
  onCellClick,
  aiParams = null,
  onStartEndChange = null
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectionMode, setSelectionMode] = useState('none'); // 'start', 'end', 'none'
  const [customStart, setCustomStart] = useState(null);
  const [customEnd, setCustomEnd] = useState(null);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const gridRef = useRef(null);

  // Use custom start/end if set, otherwise use props
  const currentStart = customStart || start;
  const currentEnd = customEnd || end;

  // Handle cell click for start/end selection
  const handleCellClick = useCallback((row, col, event) => {
    event.stopPropagation();
    
    // Don't allow selection during animation
    if (isAnimating) return;
    
    // Don't allow selection on walls
    if (maze[row][col] === 1) return;
    
    if (selectionMode === 'start') {
      setCustomStart([row, col]);
      setSelectionMode('end');
      setIsSelecting(true);
      if (onStartEndChange) {
        onStartEndChange([row, col], currentEnd);
      }
    } else if (selectionMode === 'end') {
      setCustomEnd([row, col]);
      setSelectionMode('none');
      setIsSelecting(false);
      if (onStartEndChange) {
        onStartEndChange(currentStart, [row, col]);
      }
    } else if (onCellClick) {
      onCellClick(row, col);
    }
  }, [selectionMode, currentStart, currentEnd, onStartEndChange, onCellClick, isAnimating, maze]);

  // Clear custom selections
  const clearSelections = useCallback(() => {
    setCustomStart(null);
    setCustomEnd(null);
    setSelectionMode('none');
    setIsSelecting(false);
    if (onStartEndChange) {
      onStartEndChange(start, end);
    }
  }, [start, end, onStartEndChange]);

  // Handle mouse enter for hover effects
  const handleCellHover = useCallback((row, col) => {
    if (!isAnimating && maze[row][col] === 0) {
      setHoveredCell([row, col]);
    }
  }, [isAnimating, maze]);

  // Handle mouse leave
  const handleCellLeave = useCallback(() => {
    setHoveredCell(null);
  }, []);

  // Reset selection mode when animation starts
  useEffect(() => {
    if (isAnimating) {
      setSelectionMode('none');
      setIsSelecting(false);
    }
  }, [isAnimating]);

  if (!maze) {
    return (
      <motion.div 
        className="flex items-center justify-center h-96 bg-dark-surface/50 rounded-2xl border border-dark-border"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-4"
          >
            <Play className="w-full h-full text-neon-blue" />
          </motion.div>
          <p className="text-gray-400 text-lg">Generate a maze to begin</p>
        </div>
      </motion.div>
    );
  }

  const getCellClass = (row, col) => {
    const cellKey = `${row},${col}`;
    let baseClass = `maze-cell w-6 h-6 border border-gray-800 transition-all duration-300 flex items-center justify-center cursor-pointer`;
    
    // Check if it's a wall
    if (maze[row][col] === 1) {
      baseClass += ' wall';
    } else {
      baseClass += ' path';
      
      // Check if it's start position
      if (currentStart && row === currentStart[0] && col === currentStart[1]) {
        baseClass += ' start';
      }
      // Check if it's end position
      else if (currentEnd && row === currentEnd[0] && col === currentEnd[1]) {
        baseClass += ' end';
      }
      // Check if it's in final path
      else if (finalPath.some(([r, c]) => r === row && c === col)) {
        baseClass += ' final-path';
      }
      // Check if it's visited
      else if (visitedCells.has(cellKey)) {
        baseClass += ' visited';
      }
      
      // Add hover effect
      if (hoveredCell && row === hoveredCell[0] && col === hoveredCell[1]) {
        baseClass += ' hovered';
      }
      
      // Add selectable class if in selection mode and not already start/end
      if (selectionMode !== 'none' && 
          !(currentStart && row === currentStart[0] && col === currentStart[1]) &&
          !(currentEnd && row === currentEnd[0] && col === currentEnd[1])) {
        baseClass += ' selectable';
      }
    }
    
    return baseClass;
  };

  const getCellIcon = (row, col) => {
    if (currentStart && row === currentStart[0] && col === currentStart[1]) {
      return <Home className="w-4 h-4 text-white" />;
    }
    if (currentEnd && row === currentEnd[0] && col === currentEnd[1]) {
      return <Target className="w-4 h-4 text-white" />;
    }
    return null;
  };

  const containerClass = isExpanded 
    ? "fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
    : "bg-dark-surface/30 backdrop-blur-sm rounded-2xl p-6 border border-dark-border/50";

  return (
    <motion.div 
      className={containerClass}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full relative">
        {/* Header with controls */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-orbitron font-bold text-neon-blue">
            Maze Visualization
          </h3>
          <div className="flex items-center gap-3">
            {isAnimating && (
              <motion.div
                className="flex items-center gap-2 text-neon-green"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Square className="w-4 h-4" />
                <span className="text-sm font-space">Running...</span>
              </motion.div>
            )}
            
            {/* Selection mode buttons */}
            <div className="flex gap-2">
              <motion.button
                className={`px-3 py-1 rounded-lg text-xs font-space transition-all ${
                  selectionMode === 'start' 
                    ? 'bg-neon-cyan text-black' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
                onClick={() => setSelectionMode(selectionMode === 'start' ? 'none' : 'start')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isAnimating}
              >
                <MousePointer2 className="w-3 h-3 inline mr-1" />
                Set Start
              </motion.button>
              <motion.button
                className={`px-3 py-1 rounded-lg text-xs font-space transition-all ${
                  selectionMode === 'end' 
                    ? 'bg-neon-pink text-black' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
                onClick={() => setSelectionMode(selectionMode === 'end' ? 'none' : 'end')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isAnimating}
              >
                <Target className="w-3 h-3 inline mr-1" />
                Set End
              </motion.button>
              <motion.button
                className="px-3 py-1 rounded-lg text-xs font-space bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
                onClick={clearSelections}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isAnimating}
              >
                <X className="w-3 h-3 inline mr-1" />
                Clear
              </motion.button>
            </div>

            {/* Expand/minimize button */}
            <motion.button
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              onClick={() => setIsExpanded(!isExpanded)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isExpanded ? (
                <Minimize2 className="w-5 h-5 text-gray-400" />
              ) : (
                <Maximize2 className="w-5 h-5 text-gray-400" />
              )}
            </motion.button>
            
            {isExpanded && (
              <motion.button
                className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors"
                onClick={() => setIsExpanded(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5 text-red-400" />
              </motion.button>
            )}
          </div>
        </div>

        {/* AI Parameters HUD */}
        {aiParams && (
          <motion.div 
            className="mb-4 p-3 bg-neon-blue/10 rounded-lg border border-neon-blue/30"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h4 className="text-sm font-orbitron font-bold text-neon-blue mb-2">AI Parameters</h4>
            <div className="grid grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-gray-400">Density:</span>
                <span className="ml-2 text-neon-green font-mono">
                  {(aiParams.density * 100).toFixed(1)}%
                </span>
              </div>
              <div>
                <span className="text-gray-400">Connectivity:</span>
                <span className="ml-2 text-neon-purple font-mono">
                  {(aiParams.connectivity * 100).toFixed(1)}%
                </span>
              </div>
              <div>
                <span className="text-gray-400">Complexity:</span>
                <span className="ml-2 text-neon-pink font-mono">
                  {(aiParams.complexity * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Selection Status */}
        {isSelecting && (
          <motion.div 
            className="mb-4 p-3 bg-neon-cyan/10 rounded-lg border border-neon-cyan/30"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2 text-neon-cyan">
              <MousePointer2 className="w-4 h-4" />
              <span className="text-sm font-space">
                {selectionMode === 'start' ? 'Click to set start position' : 'Click to set end position'}
              </span>
            </div>
          </motion.div>
        )}

        {/* Maze Container with Pan/Zoom */}
        <div className="maze-container relative">
          <TransformWrapper
            initialScale={1}
            minScale={0.5}
            maxScale={3}
            centerOnInit={true}
            wheel={{ step: 0.1 }}
            pinch={{ step: 5 }}
            doubleClick={{ disabled: true }}
          >
            <TransformComponent>
              <div 
                className="maze-grid"
                style={{ 
                  gridTemplateColumns: `repeat(${maze[0].length}, 1fr)`,
                  width: '600px',
                  height: '600px',
                  maxWidth: '90vw',
                  maxHeight: '90vw',
                  aspectRatio: '1 / 1'
                }}
                ref={gridRef}
              >
                <AnimatePresence>
                  {maze.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                      <motion.div
                        key={`${rowIndex}-${colIndex}`}
                        className={getCellClass(rowIndex, colIndex)}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ 
                          duration: 0.1, 
                          delay: (rowIndex + colIndex) * 0.005 
                        }}
                        whileHover={{ scale: 1.05 }}
                        onClick={(e) => handleCellClick(rowIndex, colIndex, e)}
                        onMouseEnter={() => handleCellHover(rowIndex, colIndex)}
                        onMouseLeave={handleCellLeave}
                      >
                        {getCellIcon(rowIndex, colIndex)}
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </TransformComponent>
          </TransformWrapper>
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-neon-cyan rounded-sm"></div>
            <span>Start</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-neon-pink rounded-sm"></div>
            <span>End</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-neon-cyan/60 rounded-sm"></div>
            <span>Visited</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-neon-green rounded-sm"></div>
            <span>Path</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-600 rounded-sm"></div>
            <span>Wall</span>
          </div>
          {selectionMode !== 'none' && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border-2 border-dashed border-neon-cyan rounded-sm"></div>
              <span>Selectable</span>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-4 p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
          <div className="text-xs text-gray-400 space-y-1">
            <p><strong>Controls:</strong></p>
            <p>• Mouse wheel: Zoom in/out</p>
            <p>• Click and drag: Pan around</p>
            <p>• Click "Set Start" then click a cell to set start position</p>
            <p>• Click "Set End" then click a cell to set end position</p>
            <p>• Use "Clear" to reset start/end positions</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MazeGrid;
