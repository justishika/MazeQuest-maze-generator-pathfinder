import { useState, useCallback } from 'react';
import { mazeAPI } from '../lib/api';

export const useMaze = () => {
  const [maze, setMaze] = useState(null);
  const [aiParams, setAiParams] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  const generateMaze = useCallback(async (rows = 20, cols = 20) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const mazeData = await mazeAPI.generateMaze(rows, cols);
      
      // Extract AI parameters if available
      if (mazeData.aiParams) {
        setAiParams(mazeData.aiParams);
      } else {
        // Generate mock AI parameters for display
        setAiParams({
          density: Math.random(),
          connectivity: Math.random(),
          complexity: Math.random()
        });
      }
      
      setMaze(mazeData);
      return mazeData;
    } catch (err) {
      console.error('Error generating maze:', err);
      setError(err.message || 'Failed to generate maze');
      throw err;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const resetMaze = useCallback(() => {
    setMaze(null);
    setAiParams(null);
    setError(null);
  }, []);

  return {
    maze,
    aiParams,
    isGenerating,
    error,
    generateMaze,
    resetMaze
  };
};
