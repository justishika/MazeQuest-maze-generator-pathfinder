import torch
import torch.nn as nn
import numpy as np
from .classical_gen import recursive_backtracker
from .utils import add_ai_bias

class MazeAIModel(nn.Module):
    """Simple neural network to influence maze generation"""
    def __init__(self, input_size=10, hidden_size=32):
        super().__init__()
        self.network = nn.Sequential(
            nn.Linear(input_size, hidden_size),
            nn.ReLU(),
            nn.Linear(hidden_size, hidden_size),
            nn.ReLU(),
            nn.Linear(hidden_size, 3),  # density, connectivity, complexity
            nn.Sigmoid()
        )
    
    def forward(self, x):
        return self.network(x)

def generate_ai_maze(rows: int, cols: int) -> dict:
    """Generate an AI-enhanced maze using classical algorithm + AI bias"""
    
    # Create AI model (in practice, this would be pre-trained)
    model = MazeAIModel()
    
    # Generate random latent vector for uniqueness
    latent_vector = torch.randn(10)
    
    # Get AI predictions for maze characteristics
    with torch.no_grad():
        ai_params = model(latent_vector).numpy()
    
    # Extract parameters
    density = float(ai_params[0])  # How dense the walls should be
    connectivity = float(ai_params[1])  # How connected paths should be
    complexity = float(ai_params[2])  # Overall complexity
    
    # Generate base maze using recursive backtracker
    maze = recursive_backtracker(rows, cols)
    
    # Apply AI bias to modify the maze
    maze = add_ai_bias(maze, density, connectivity, complexity)
    
    # Find start and end points
    start = find_start_position(maze)
    end = find_end_position(maze, start)
    
    return {
        "maze": maze.tolist(),
        "rows": rows,
        "cols": cols,
        "start": start,
        "end": end,
        "aiParams": {
            "density": density,
            "connectivity": connectivity,
            "complexity": complexity
        }
    }

def find_start_position(maze):
    """Find a suitable start position (top-left area)"""
    rows, cols = maze.shape
    for i in range(1, min(rows//3, 5)):
        for j in range(1, min(cols//3, 5)):
            if maze[i, j] == 0:  # Empty cell
                return [i, j]
    return [1, 1]

def find_end_position(maze, start):
    """Find a suitable end position (bottom-right area)"""
    rows, cols = maze.shape
    for i in range(rows-2, max(rows-rows//3, rows-5), -1):
        for j in range(cols-2, max(cols-cols//3, cols-5), -1):
            if maze[i, j] == 0:  # Empty cell
                return [i, j]
    return [rows-2, cols-2]
