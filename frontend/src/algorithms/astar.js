export class AStar {
  constructor(maze, start, end) {
    this.maze = maze;
    this.start = start;
    this.end = end;
    this.rows = maze.length;
    this.cols = maze[0].length;
  }

  async *solve() {
    const openSet = [{ pos: this.start, g: 0, h: this.heuristic(this.start), f: this.heuristic(this.start), path: [this.start] }];
    const closedSet = new Set();
    const cameFrom = new Map();
    const gScore = new Map();
    gScore.set(`${this.start[0]},${this.start[1]}`, 0);

    while (openSet.length > 0) {
      // Sort by f-score and get the best node
      openSet.sort((a, b) => a.f - b.f);
      const current = openSet.shift();
      const [row, col] = current.pos;
      const key = `${row},${col}`;

      if (closedSet.has(key)) continue;
      closedSet.add(key);

      // Yield current position for animation
      yield { type: 'visit', pos: current.pos, path: [...current.path] };

      // Check if we reached the end
      if (row === this.end[0] && col === this.end[1]) {
        yield { type: 'solution', path: [...current.path] };
        return current.path;
      }

      // Explore neighbors
      const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;
        const neighborKey = `${newRow},${newCol}`;

        if (!this.isValid(newRow, newCol) || closedSet.has(neighborKey)) continue;

        const tentativeG = gScore.get(key) + 1;
        const currentG = gScore.get(neighborKey);

        if (!currentG || tentativeG < currentG) {
          cameFrom.set(neighborKey, key);
          gScore.set(neighborKey, tentativeG);
          const h = this.heuristic([newRow, newCol]);
          const f = tentativeG + h;

          // Check if this neighbor is already in openSet
          const existingIndex = openSet.findIndex(node => 
            node.pos[0] === newRow && node.pos[1] === newCol
          );

          if (existingIndex !== -1) {
            openSet[existingIndex] = { 
              pos: [newRow, newCol], 
              g: tentativeG, 
              h, 
              f, 
              path: [...current.path, [newRow, newCol]] 
            };
          } else {
            openSet.push({ 
              pos: [newRow, newCol], 
              g: tentativeG, 
              h, 
              f, 
              path: [...current.path, [newRow, newCol]] 
            });
          }
        }
      }
    }

    yield { type: 'no-solution' };
    return null;
  }

  heuristic(pos) {
    // Manhattan distance
    return Math.abs(pos[0] - this.end[0]) + Math.abs(pos[1] - this.end[1]);
  }

  isValid(row, col) {
    return (
      row >= 0 && row < this.rows &&
      col >= 0 && col < this.cols &&
      this.maze[row][col] === 0
    );
  }
}
