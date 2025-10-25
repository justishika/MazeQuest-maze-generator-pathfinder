import { useState, useCallback } from 'react';
import { BFS } from '../algorithms/bfs';
import { DFS } from '../algorithms/dfs';
import { AStar } from '../algorithms/astar';
import { Dijkstra } from '../algorithms/dijkstra';
import { QLearning } from '../algorithms/qlearning';

const ALGORITHMS = {
  'BFS': BFS,
  'DFS': DFS,
  'A*': AStar,
  'Dijkstra': Dijkstra,
  'Q-Learning': QLearning
};

export const useAlgorithm = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentAlgorithm, setCurrentAlgorithm] = useState('BFS');
  const [animationSpeed, setAnimationSpeed] = useState(50);

  const runAlgorithm = useCallback(async (maze, start, end, algorithmName = currentAlgorithm, onStep = () => {}) => {
    if (!maze || !start || !end) return null;

    setIsRunning(true);
    
    try {
      const AlgorithmClass = ALGORITHMS[algorithmName];
      if (!AlgorithmClass) {
        throw new Error(`Unknown algorithm: ${algorithmName}`);
      }

      const algorithm = new AlgorithmClass(maze, start, end);
      let result = null;

      for await (const step of algorithm.solve()) {
        onStep(step);
        
        // Add delay for animation
        if (animationSpeed > 0) {
          await new Promise(resolve => setTimeout(resolve, animationSpeed));
        }

        if (step.type === 'solution') {
          result = step.path;
          break;
        }
      }

      return result;
    } catch (error) {
      console.error('Algorithm error:', error);
      throw error;
    } finally {
      setIsRunning(false);
    }
  }, [currentAlgorithm, animationSpeed]);

  const stopAlgorithm = useCallback(() => {
    setIsRunning(false);
  }, []);

  return {
    isRunning,
    currentAlgorithm,
    animationSpeed,
    setCurrentAlgorithm,
    setAnimationSpeed,
    runAlgorithm,
    stopAlgorithm
  };
};
