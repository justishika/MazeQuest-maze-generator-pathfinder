export class DFS {
  constructor(maze, start, end) {
    this.maze = maze;
    this.start = start;
    this.end = end;
    this.rows = maze.length;
    this.cols = maze[0].length;
  }

  async *solve() {
    const stack = [{ pos: this.start, path: [this.start] }];
    const visited = new Set();
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // up, down, left, right

    while (stack.length > 0) {
      const { pos, path } = stack.pop();
      const [row, col] = pos;
      const key = `${row},${col}`;

      if (visited.has(key)) continue;
      visited.add(key);

      // Yield current position for animation
      yield { type: 'visit', pos, path: [...path] };

      // Check if we reached the end
      if (row === this.end[0] && col === this.end[1]) {
        yield { type: 'solution', path: [...path] };
        return path;
      }

      // Explore neighbors (in reverse order for better visualization)
      for (let i = directions.length - 1; i >= 0; i--) {
        const [dr, dc] = directions[i];
        const newRow = row + dr;
        const newCol = col + dc;

        if (this.isValid(newRow, newCol) && !visited.has(`${newRow},${newCol}`)) {
          stack.push({ 
            pos: [newRow, newCol], 
            path: [...path, [newRow, newCol]] 
          });
        }
      }
    }

    yield { type: 'no-solution' };
    return null;
  }

  isValid(row, col) {
    return (
      row >= 0 && row < this.rows &&
      col >= 0 && col < this.cols &&
      this.maze[row][col] === 0
    );
  }
}
