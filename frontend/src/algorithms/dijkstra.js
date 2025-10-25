export class Dijkstra {
  constructor(maze, start, end) {
    this.maze = maze;
    this.start = start;
    this.end = end;
    this.rows = maze.length;
    this.cols = maze[0].length;
  }

  async *solve() {
    const distances = new Map();
    const previous = new Map();
    const visited = new Set();
    const unvisited = new Set();

    // Initialize distances
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.maze[i][j] === 0) {
          const key = `${i},${j}`;
          distances.set(key, Infinity);
          unvisited.add(key);
        }
      }
    }

    const startKey = `${this.start[0]},${this.start[1]}`;
    distances.set(startKey, 0);

    while (unvisited.size > 0) {
      // Find the unvisited node with the smallest distance
      let current = null;
      let minDistance = Infinity;
      
      for (const key of unvisited) {
        if (distances.get(key) < minDistance) {
          minDistance = distances.get(key);
          current = key;
        }
      }

      if (current === null) break;

      unvisited.delete(current);
      visited.add(current);

      const [row, col] = current.split(',').map(Number);
      const path = this.reconstructPath(previous, current);

      // Yield current position for animation
      yield { type: 'visit', pos: [row, col], path: [...path] };

      // Check if we reached the end
      if (row === this.end[0] && col === this.end[1]) {
        yield { type: 'solution', path: [...path] };
        return path;
      }

      // Explore neighbors
      const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;
        const neighborKey = `${newRow},${newCol}`;

        if (!this.isValid(newRow, newCol) || visited.has(neighborKey)) continue;

        const alt = distances.get(current) + 1;
        if (alt < distances.get(neighborKey)) {
          distances.set(neighborKey, alt);
          previous.set(neighborKey, current);
        }
      }
    }

    yield { type: 'no-solution' };
    return null;
  }

  reconstructPath(previous, current) {
    const path = [];
    while (current) {
      const [row, col] = current.split(',').map(Number);
      path.unshift([row, col]);
      current = previous.get(current);
    }
    return path;
  }

  isValid(row, col) {
    return (
      row >= 0 && row < this.rows &&
      col >= 0 && col < this.cols &&
      this.maze[row][col] === 0
    );
  }
}
