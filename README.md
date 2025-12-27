# 🧠 MazeQuest AI - Real-Time Pathfinding Visualizer

MazeQuest AI is a full-stack web application that visualizes classic and AI-based pathfinding algorithms in real time. The project focuses on clean backend design, deterministic algorithm execution, and smooth real-time rendering rather than just UI polish.

Built with Next.js, FastAPI, and PyTorch, MazeQuest demonstrates how algorithmic systems can be exposed through HTTP APIs and visualized interactively without performance bottlenecks.

---

## Table of Contents

- [Features](#features)
- [System Architecture](#system-architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Run both services](#run-both-services)
- [API](#api)
- [Usage](#usage)
- [Algorithms Implemented](#algorithms-implemented)
- [Project Structure](#project-structure)
- [Design Notes & Trade-offs](#design-notes--trade-offs)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Features

- Step-by-step visualization of pathfinding algorithms (not just final states)
- Smooth front-end animations (target ≈50 FPS)
- Deterministic pathfinding execution (separated from rendering)
- Classical and AI-assisted maze generation (PyTorch)
- Interactive controls: choose algorithm, adjust speed, set start/end, regenerate/reset

---

## System Architecture

Frontend (Next.js) ↔ HTTP APIs ↔ Backend (FastAPI)

- Frontend animates algorithm states using step-wise updates returned by the backend.
- Backend generates mazes, runs pathfinding algorithms, and returns intermediate states for visualization.

---

## Tech Stack

- Frontend: Next.js, React, Tailwind CSS, Framer Motion, Axios
- Backend: FastAPI, Python, PyTorch (maze generation), Uvicorn
- Language composition in repo: JavaScript, CSS, Python

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.8+
- (Optional) Virtual environment tool (venv)
- (Optional) GPU + CUDA if you want to run PyTorch on GPU for AI generator (not required)

### Backend Setup

1. Open a terminal:
2. Change into backend directory:
   - cd backend
3. Create and activate virtual environment:
   - Unix / macOS:
     - python -m venv venv
     - source venv/bin/activate
   - Windows (PowerShell):
     - python -m venv venv
     - .\venv\Scripts\Activate.ps1
   - Windows (cmd):
     - venv\Scripts\activate
4. Install dependencies:
   - pip install -r requirements.txt
5. Run the backend (development):
   - uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

Backend will be available at:
http://localhost:8000

Notes:
- If you use a GPU and want PyTorch to use it, ensure the appropriate torch build is installed.
- The AI maze generator is optional; classical generators are available as fallback.

### Frontend Setup

1. Open a separate terminal:
2. Change into frontend directory:
   - cd frontend
3. Install dependencies:
   - npm install
4. Run the dev server:
   - npm run dev

Frontend will be available at:
http://localhost:3000

### Run both services

Start the backend first (port 8000), then start the frontend (port 3000). The frontend calls the backend endpoints to generate mazes and run algorithms.

---

## API

Generate Maze
- GET /api/generate-maze

Example response:
{
  "maze": [[1,0,1,1], [1,0,0,1]],
  "rows": 20,
  "cols": 20,
  "start": [1, 1],
  "end": [18, 18]
}

Notes:
- The backend exposes endpoints that return intermediate algorithm states for animation.
- Check backend/app/routers for additional routes and parameters (e.g., algorithm selection, seed, size).

---

## Usage

- Open the frontend at http://localhost:3000
- Choose a maze generation mode (classical or AI-assisted)
- Select a pathfinding algorithm (BFS, DFS, A*, Dijkstra, Q-Learning)
- Set start and end nodes by clicking grid cells
- Control animation speed and play/pause the step-wise visualization
- Regenerate or reset the maze as needed

The frontend animates the step-by-step states the backend returns. This keeps algorithm execution deterministic and offloads CPU work to the backend.

---

## Algorithms Implemented

- BFS (Breadth-First Search)
- DFS (Depth-First Search)
- A*
- Dijkstra
- Q-Learning (for comparative visualization)

Maze generation:
- Classical (deterministic generators)
- AI-assisted generator (PyTorch logic that biases complexity/connectivity)

---

## Project Structure

MazeQuest-AI/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routers/
│   │   └── core/
│   │       ├── ai_generator.py
│   │       ├── classical_gen.py
│   │       └── utils.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── algorithms/
│   │   ├── hooks/
│   │   └── lib/
│   └── package.json

---

## Design Notes & Trade-offs

- Step-wise execution was chosen to simplify animation control and keep the UI responsive.
- Larger grids reduce rendering smoothness; the app caps grid size to maintain consistent frame rates.
- AI is limited to maze generation to preserve predictable pathfinding behavior.
- Backend computation is kept lightweight and synchronous per request; streaming or WebSockets were deferred for simplicity.

---

## Future Improvements

- Stream algorithm states using WebSockets for lower latency
- Chunked rendering and virtualized grids to support larger mazes
- Add tests and CI for backend and frontend
- Improve AI maze generation controls and reproducibility (seed management)

---

## Contributing

Contributions are welcome. Suggested workflow:
- Fork the repository
- Create a feature branch: git checkout -b feat/your-feature
- Implement and test locally
- Open a PR describing your changes

Please follow code style in each part of the stack (ESLint/Prettier for the frontend and PEP8 for Python).

---

## License

This project is licensed under the MIT License.

---

## Author

Ishika Mohol

```

