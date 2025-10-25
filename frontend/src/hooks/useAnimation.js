import { useState, useCallback } from 'react';

export const useAnimation = () => {
  const [visitedCells, setVisitedCells] = useState(new Set());
  const [finalPath, setFinalPath] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const resetAnimation = useCallback(() => {
    setVisitedCells(new Set());
    setFinalPath([]);
    setIsAnimating(false);
  }, []);

  const handleAnimationStep = useCallback((step) => {
    switch (step.type) {
      case 'visit':
        setVisitedCells(prev => new Set([...prev, `${step.pos[0]},${step.pos[1]}`]));
        break;
      case 'solution':
        setFinalPath(step.path);
        setIsAnimating(false);
        break;
      case 'no-solution':
        setIsAnimating(false);
        break;
      case 'training':
        // For Q-Learning training messages
        console.log(step.message);
        break;
      default:
        break;
    }
  }, []);

  const startAnimation = useCallback(() => {
    setIsAnimating(true);
  }, []);

  return {
    visitedCells,
    finalPath,
    isAnimating,
    resetAnimation,
    handleAnimationStep,
    startAnimation
  };
};
