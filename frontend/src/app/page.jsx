'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import MazeGrid from '../components/MazeGrid';
import ControlPanel from '../components/ControlPanel';
import MetricsDashboard from '../components/MetricsDashboard';
import GlowBackground from '../components/GlowBackground';
import Footer from '../components/Footer';
import { useMaze } from '../hooks/useMaze';
import { useAlgorithm } from '../hooks/useAlgorithm';
import { useAnimation } from '../hooks/useAnimation';

export default function Home() {
  const { maze, aiParams, isGenerating, error, generateMaze, resetMaze } = useMaze();
  const { 
    isRunning, 
    currentAlgorithm, 
    animationSpeed, 
    setCurrentAlgorithm, 
    setAnimationSpeed, 
    runAlgorithm, 
    stopAlgorithm 
  } = useAlgorithm();
  const { 
    visitedCells, 
    finalPath, 
    isAnimating, 
    resetAnimation, 
    handleAnimationStep, 
    startAnimation 
  } = useAnimation();

  // New state for enhanced features
  const [customStart, setCustomStart] = useState(null);
  const [customEnd, setCustomEnd] = useState(null);
  const [showMetrics, setShowMetrics] = useState(false);
  const [algorithmStats, setAlgorithmStats] = useState(null);
  const [mazeStats, setMazeStats] = useState(null);
  const [startTime, setStartTime] = useState(null);

  const handleGenerateMaze = useCallback(async () => {
    try {
      resetAnimation();
      setCustomStart(null);
      setCustomEnd(null);
      setAlgorithmStats(null);
      setMazeStats(null);
      
      const mazeData = await generateMaze(20, 20);
      
      // Calculate maze statistics
      const totalCells = mazeData.rows * mazeData.cols;
      const wallCount = mazeData.maze.flat().filter(cell => cell === 1).length;
      const pathCount = totalCells - wallCount;
      
      setMazeStats({
        rows: mazeData.rows,
        cols: mazeData.cols,
        totalCells,
        wallCount,
        pathCount,
        aiParams: mazeData.aiParams
      });
    } catch (err) {
      console.error('Failed to generate maze:', err);
    }
  }, [generateMaze, resetAnimation]);

  const handleVisualizePath = useCallback(async () => {
    const startPos = customStart || maze?.start;
    const endPos = customEnd || maze?.end;
    
    if (!maze || !startPos || !endPos) {
      console.warn('No valid start/end positions set');
      return;
    }

    try {
      resetAnimation();
      startAnimation();
      setStartTime(Date.now());
      setAlgorithmStats(null);
      
      const result = await runAlgorithm(
        maze.maze, 
        startPos, 
        endPos, 
        currentAlgorithm, 
        handleAnimationStep
      );
      
      // Calculate algorithm statistics
      const executionTime = Date.now() - startTime;
      const pathLength = finalPath.length;
      const nodesVisited = visitedCells.size;
      const totalNodes = mazeStats?.totalCells || 0;
      
      setAlgorithmStats({
        algorithm: currentAlgorithm,
        executionTime,
        pathLength,
        nodesVisited,
        totalNodes,
        efficiency: totalNodes > 0 ? nodesVisited / totalNodes : 0,
        complexity: getAlgorithmComplexity(currentAlgorithm)
      });
    } catch (err) {
      console.error('Failed to run algorithm:', err);
    }
  }, [maze, customStart, customEnd, currentAlgorithm, runAlgorithm, resetAnimation, startAnimation, handleAnimationStep, finalPath, visitedCells, mazeStats, startTime]);

  const getAlgorithmComplexity = (algorithm) => {
    const complexities = {
      'BFS': 'O(V+E)',
      'DFS': 'O(V+E)',
      'A*': 'O(b^d)',
      'Dijkstra': 'O((V+E)logV)',
      'Q-Learning': 'Variable'
    };
    return complexities[algorithm] || 'Unknown';
  };

  const handleStartEndChange = useCallback((start, end) => {
    setCustomStart(start);
    setCustomEnd(end);
  }, []);

  const handleResetMaze = useCallback(() => {
    resetMaze();
    setCustomStart(null);
    setCustomEnd(null);
    setAlgorithmStats(null);
    setMazeStats(null);
  }, [resetMaze]);

  const handleResetPath = useCallback(() => {
    resetAnimation();
    setAlgorithmStats(null);
  }, [resetAnimation]);

  const handleResetStartEnd = useCallback(() => {
    setCustomStart(null);
    setCustomEnd(null);
  }, []);

  const handleReset = useCallback(() => {
    handleResetMaze();
    resetAnimation();
    stopAlgorithm();
  }, [handleResetMaze, resetAnimation, stopAlgorithm]);

  const handleCellClick = useCallback((row, col) => {
    // Optional: Add cell click functionality
    console.log(`Clicked cell: ${row}, ${col}`);
  }, []);

  return (
    <div className="min-h-screen relative">
      <GlowBackground />
      
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <motion.div
            className="grid lg:grid-cols-5 gap-8 max-w-[95vw] mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Maze Grid - Takes up 3 columns on large screens (60% width) */}
            <div className="lg:col-span-3">
              <MazeGrid
                maze={maze?.maze}
                start={customStart || maze?.start}
                end={customEnd || maze?.end}
                visitedCells={visitedCells}
                finalPath={finalPath}
                isAnimating={isAnimating || isRunning}
                onCellClick={handleCellClick}
                onStartEndChange={handleStartEndChange}
                aiParams={aiParams}
              />
            </div>

            {/* Control Panel - Takes up 2 columns on large screens (40% width) */}
            <div className="lg:col-span-2">
              <ControlPanel
                onGenerateMaze={handleGenerateMaze}
                onVisualizePath={handleVisualizePath}
                onReset={handleReset}
                onResetMaze={handleResetMaze}
                onResetPath={handleResetPath}
                onResetStartEnd={handleResetStartEnd}
                isGenerating={isGenerating}
                isRunning={isRunning}
                currentAlgorithm={currentAlgorithm}
                onAlgorithmChange={setCurrentAlgorithm}
                animationSpeed={animationSpeed}
                onSpeedChange={setAnimationSpeed}
                algorithmStats={algorithmStats}
                showMetrics={showMetrics}
                onToggleMetrics={() => setShowMetrics(!showMetrics)}
              />
            </div>
          </motion.div>

          {/* Error Display */}
          {error && (
            <motion.div
              className="mt-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-center">{error}</p>
            </motion.div>
          )}

          {/* Algorithm Status */}
          {(isRunning || isAnimating) && (
            <motion.div
              className="mt-6 p-4 glass-dark rounded-lg border border-neon-blue/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5"
                >
                  <div className="w-full h-full border-2 border-neon-blue border-t-transparent rounded-full"></div>
                </motion.div>
                <span className="text-neon-blue font-space">
                  Running {currentAlgorithm} algorithm...
                </span>
              </div>
            </motion.div>
          )}
        </main>

        <Footer />
      </div>

      {/* Metrics Dashboard */}
      <MetricsDashboard
        isVisible={showMetrics}
        onClose={() => setShowMetrics(false)}
        algorithmStats={algorithmStats}
        mazeStats={mazeStats}
      />
    </div>
  );
}
