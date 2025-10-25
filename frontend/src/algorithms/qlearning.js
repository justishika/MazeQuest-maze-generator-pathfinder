export class QLearning {
  constructor(maze, start, end) {
    this.maze = maze;
    this.start = start;
    this.end = end;
    this.rows = maze.length;
    this.cols = maze[0].length;
    this.qTable = new Map();
    this.epsilon = 0.3; // Exploration rate
    this.alpha = 0.1; // Learning rate
    this.gamma = 0.9; // Discount factor
    this.directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // up, down, left, right
  }

  async *solve() {
    // Train the Q-learning agent
    yield { type: 'training', message: 'Training Q-Learning agent...' };
    
    for (let episode = 0; episode < 50; episode++) {
      const path = await this.runEpisode();
      if (episode % 10 === 0) {
        yield { type: 'training', message: `Episode ${episode}/50` };
      }
    }

    // Run the final solution with visualization
    yield { type: 'training', message: 'Running final solution...' };
    const finalPath = await this.runEpisodeWithVisualization();

    if (finalPath && finalPath.length > 0) {
      yield { type: 'solution', path: finalPath };
      return finalPath;
    } else {
      yield { type: 'no-solution' };
      return null;
    }
  }

  async runEpisodeWithVisualization() {
    let current = [...this.start];
    const path = [current];
    const visited = new Set();
    visited.add(`${current[0]},${current[1]}`);

    for (let step = 0; step < this.rows * this.cols; step++) {
      const state = `${current[0]},${current[1]}`;
      
      // Choose best action (no exploration)
      const action = this.chooseBestAction(state);
      
      if (action === -1) break; // No valid actions

      const [dr, dc] = this.directions[action];
      const nextPos = [current[0] + dr, current[1] + dc];
      const nextState = `${nextPos[0]},${nextPos[1]}`;

      // Move to next position
      if (this.isValid(nextPos[0], nextPos[1]) && !visited.has(nextState)) {
        current = nextPos;
        path.push(current);
        visited.add(nextState);

        // Check if we reached the goal
        if (current[0] === this.end[0] && current[1] === this.end[1]) {
          return path;
        }
      } else {
        break; // Invalid move, end episode
      }
    }

    return path;
  }

  async runEpisode(explore = true) {
    let current = [...this.start];
    const path = [current];
    const visited = new Set();
    visited.add(`${current[0]},${current[1]}`);

    for (let step = 0; step < this.rows * this.cols; step++) {
      const state = `${current[0]},${current[1]}`;
      
      // Choose action
      const action = explore ? this.chooseAction(state) : this.chooseBestAction(state);
      
      if (action === -1) break; // No valid actions

      const [dr, dc] = this.directions[action];
      const nextPos = [current[0] + dr, current[1] + dc];
      const nextState = `${nextPos[0]},${nextPos[1]}`;

      // Calculate reward
      let reward = -0.1; // Small negative reward for each step
      if (nextPos[0] === this.end[0] && nextPos[1] === this.end[1]) {
        reward = 100; // Large positive reward for reaching goal
      } else if (!this.isValid(nextPos[0], nextPos[1]) || visited.has(nextState)) {
        reward = -10; // Negative reward for invalid moves
      }

      // Update Q-value
      if (explore) {
        this.updateQValue(state, action, reward, nextState);
      }

      // Move to next position
      if (this.isValid(nextPos[0], nextPos[1]) && !visited.has(nextState)) {
        current = nextPos;
        path.push(current);
        visited.add(nextState);

        // Check if we reached the goal
        if (current[0] === this.end[0] && current[1] === this.end[1]) {
          return path;
        }
      } else {
        break; // Invalid move, end episode
      }
    }

    return path;
  }

  chooseAction(state) {
    const validActions = this.getValidActions(state);
    if (validActions.length === 0) return -1;

    // Epsilon-greedy action selection
    if (Math.random() < this.epsilon) {
      // Explore: choose random valid action
      return validActions[Math.floor(Math.random() * validActions.length)];
    } else {
      // Exploit: choose best action
      return this.chooseBestAction(state);
    }
  }

  chooseBestAction(state) {
    const validActions = this.getValidActions(state);
    if (validActions.length === 0) return -1;

    let bestAction = validActions[0];
    let bestQValue = this.getQValue(state, bestAction);

    for (const action of validActions) {
      const qValue = this.getQValue(state, action);
      if (qValue > bestQValue) {
        bestQValue = qValue;
        bestAction = action;
      }
    }

    return bestAction;
  }

  getValidActions(state) {
    const [row, col] = state.split(',').map(Number);
    const validActions = [];

    for (let i = 0; i < this.directions.length; i++) {
      const [dr, dc] = this.directions[i];
      const newRow = row + dr;
      const newCol = col + dc;

      if (this.isValid(newRow, newCol)) {
        validActions.push(i);
      }
    }

    return validActions;
  }

  updateQValue(state, action, reward, nextState) {
    const currentQ = this.getQValue(state, action);
    const maxNextQ = this.getMaxQValue(nextState);
    const newQ = currentQ + this.alpha * (reward + this.gamma * maxNextQ - currentQ);
    
    this.setQValue(state, action, newQ);
  }

  getQValue(state, action) {
    const key = `${state}-${action}`;
    return this.qTable.get(key) || 0;
  }

  setQValue(state, action, value) {
    const key = `${state}-${action}`;
    this.qTable.set(key, value);
  }

  getMaxQValue(state) {
    const validActions = this.getValidActions(state);
    if (validActions.length === 0) return 0;

    let maxQ = this.getQValue(state, validActions[0]);
    for (const action of validActions) {
      const qValue = this.getQValue(state, action);
      if (qValue > maxQ) {
        maxQ = qValue;
      }
    }

    return maxQ;
  }

  isValid(row, col) {
    return (
      row >= 0 && row < this.rows &&
      col >= 0 && col < this.cols &&
      this.maze[row][col] === 0
    );
  }
}
