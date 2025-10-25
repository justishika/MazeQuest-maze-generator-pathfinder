import numpy as np
import random

def recursive_backtracker(rows: int, cols: int) -> np.ndarray:
    """Generate a maze using recursive backtracking algorithm"""
    # Create grid filled with walls (1)
    maze = np.ones((rows, cols), dtype=int)
    
    # Start from a random cell
    start_row = random.randint(1, rows-2) if rows > 2 else 1
    start_col = random.randint(1, cols-2) if cols > 2 else 1
    
    # Stack for backtracking
    stack = [(start_row, start_col)]
    maze[start_row, start_col] = 0  # Mark as path
    
    # Directions: up, down, left, right
    directions = [(-2, 0), (2, 0), (0, -2), (0, 2)]
    
    while stack:
        current_row, current_col = stack[-1]
        
        # Get unvisited neighbors
        neighbors = []
        for dr, dc in directions:
            new_row = current_row + dr
            new_col = current_col + dc
            
            # Check bounds
            if (0 < new_row < rows-1 and 
                0 < new_col < cols-1 and 
                maze[new_row, new_col] == 1):
                neighbors.append((new_row, new_col))
        
        if neighbors:
            # Choose random neighbor
            next_row, next_col = random.choice(neighbors)
            
            # Carve path
            wall_row = current_row + (next_row - current_row) // 2
            wall_col = current_col + (next_col - current_col) // 2
            
            maze[wall_row, wall_col] = 0
            maze[next_row, next_col] = 0
            
            stack.append((next_row, next_col))
        else:
            # Backtrack
            stack.pop()
    
    return maze
