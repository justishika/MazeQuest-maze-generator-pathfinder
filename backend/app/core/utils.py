import numpy as np
import random

def add_ai_bias(maze: np.ndarray, density: float, connectivity: float, complexity: float) -> np.ndarray:
    """Apply AI bias to modify maze characteristics"""
    rows, cols = maze.shape
    modified_maze = maze.copy()
    
    # Adjust density based on AI parameter
    if density > 0.7:  # High density - add more walls
        for i in range(1, rows-1):
            for j in range(1, cols-1):
                if modified_maze[i, j] == 0 and random.random() < (density - 0.5) * 0.3:
                    modified_maze[i, j] = 1
    
    elif density < 0.3:  # Low density - remove some walls
        for i in range(1, rows-1):
            for j in range(1, cols-1):
                if modified_maze[i, j] == 1 and random.random() < (0.5 - density) * 0.3:
                    modified_maze[i, j] = 0
    
    # Adjust connectivity based on AI parameter
    if connectivity > 0.6:  # High connectivity - add more paths
        for i in range(1, rows-1):
            for j in range(1, cols-1):
                if (modified_maze[i, j] == 1 and 
                    count_adjacent_paths(modified_maze, i, j) >= 2 and
                    random.random() < (connectivity - 0.5) * 0.2):
                    modified_maze[i, j] = 0
    
    # Adjust complexity based on AI parameter
    if complexity > 0.6:  # High complexity - add more twists and turns
        for _ in range(int(complexity * 10)):
            i = random.randint(1, rows-2)
            j = random.randint(1, cols-2)
            if modified_maze[i, j] == 0:
                # Add a small obstacle
                if random.random() < 0.3:
                    modified_maze[i, j] = 1
    
    return modified_maze

def count_adjacent_paths(maze: np.ndarray, row: int, col: int) -> int:
    """Count adjacent path cells (0s)"""
    count = 0
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
    for dr, dc in directions:
        new_row, new_col = row + dr, col + dc
        if (0 <= new_row < maze.shape[0] and 
            0 <= new_col < maze.shape[1] and 
            maze[new_row, new_col] == 0):
            count += 1
    return count
