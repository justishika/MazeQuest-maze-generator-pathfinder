// Mock API for demo purposes
export const mockMazeAPI = {
  generateMaze: async (rows = 20, cols = 20) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate a simple maze pattern
    const maze = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        // Create a simple maze pattern
        if (i === 0 || i === rows - 1 || j === 0 || j === cols - 1) {
          row.push(1); // Walls on borders
        } else if (i % 2 === 0 && j % 2 === 0) {
          row.push(1); // Wall pattern
        } else {
          row.push(0); // Path
        }
      }
      maze.push(row);
    }
    
    // Ensure start and end are paths
    maze[1][1] = 0; // Start
    maze[rows - 2][cols - 2] = 0; // End
    
    return {
      maze,
      rows,
      cols,
      start: [1, 1],
      end: [rows - 2, cols - 2],
      aiParams: {
        density: Math.random(),
        connectivity: Math.random(),
        complexity: Math.random()
      }
    };
  }
};
