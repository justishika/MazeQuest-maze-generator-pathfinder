# 🧠 MazeQuest AI

**AI-Powered Maze Generator and Pathfinding Visualizer**

A stunning full-stack web application that generates unique AI-enhanced mazes and visualizes various pathfinding algorithms in real-time. Built with Next.js, FastAPI, PyTorch, and Framer Motion.

![MazeQuest AI](https://img.shields.io/badge/MazeQuest-AI-blue?style=for-the-badge&logo=brain)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104-green?style=for-the-badge&logo=fastapi)
![PyTorch](https://img.shields.io/badge/PyTorch-2.1-orange?style=for-the-badge&logo=pytorch)

## ✨ Features

- **🤖 AI-Enhanced Maze Generation**: Uses PyTorch neural networks to create unique, complex mazes
- **🎯 Multiple Pathfinding Algorithms**: BFS, DFS, A*, Dijkstra, and Q-Learning
- **⚡ Real-time Visualization**: Watch algorithms solve mazes with cinematic animations
- **🎛️ Interactive Controls**: Adjustable animation speed and algorithm selection
- **📱 Responsive Design**: Works on desktop and tablet devices

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.8+
- **pip** (Python package manager)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment:**
   ```bash
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Start the FastAPI server:**
   ```bash
   uvicorn app.main:app --reload
   ```

   The backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`

## 🎮 How to Use

🎥 Demo Preview

![Image](https://github.com/user-attachments/assets/b3970f29-23b5-4d97-86d0-c77f5dabdffc)


1. **Generate a Maze**: Click "Generate AI Maze" to create a unique maze using AI
2. **Set Start/End Positions**: 
   - Click "Set Start" then click any path cell to set start position (cyan)
   - Click "Set End" then click any path cell to set end position (magenta)
   - Use "Clear" to reset positions
3. **Pan & Zoom**: 
   - Mouse wheel: Zoom in/out
   - Click and drag: Pan around the maze
   - Maze maintains fixed 600x600px size
4. **Select Algorithm**: Choose from BFS, DFS, A*, Dijkstra, or Q-Learning
5. **Adjust Speed**: Use the animation speed slider to control visualization speed
6. **Visualize Path**: Click "Visualize Path" to watch the algorithm solve the maze
7. **Reset**: Use various reset options to clear paths, positions, or start over

## 🏗️ Architecture

### Backend (FastAPI + PyTorch)
```
backend/
├── app/
│   ├── main.py              # FastAPI application
│   ├── routers/
│   │   └── maze.py         # Maze generation endpoints
│   └── core/
│       ├── ai_generator.py # AI-enhanced maze generation
│       ├── classical_gen.py# Classical maze algorithms
│       └── utils.py        # Utility functions
└── requirements.txt
```

### Frontend (Next.js + React)
```
frontend/
├── src/
│   ├── app/
│   │   ├── page.jsx        # Main application page
│   │   ├── layout.tsx      # Root layout
│   │   └── globals.css     # Global styles
│   ├── components/         # React components
│   ├── hooks/             # Custom React hooks
│   ├── algorithms/        # Pathfinding algorithms
│   └── lib/               # API utilities
└── package.json
```

## 🧩 Algorithms

### Maze Generation
- **Recursive Backtracker**: Classical maze generation algorithm
- **AI Enhancement**: PyTorch neural network adds bias for density, connectivity, and complexity

### Pathfinding Algorithms
- **BFS (Breadth-First Search)**: Explores level by level, guarantees shortest path
- **DFS (Depth-First Search)**: Explores as far as possible before backtracking
- **A***: Heuristic-based search, optimal and efficient
- **Dijkstra**: Shortest path algorithm for weighted graphs
- **Q-Learning**: AI reinforcement learning approach

## 🎨 Design Features

- **Fixed-Size Maze**: 600x600px maze container that never resizes, maintaining consistent proportions
- **Interactive Grid**: Clickable cells with hover effects and visual feedback
- **Neon Color Scheme**: Cyan (start), magenta (end), green (path), with glowing effects
- **Pan/Zoom Integration**: Smooth TransformWrapper for navigation without affecting maze size
- **Glassmorphism UI**: Frosted glass effects on control panels with backdrop blur
- **Smooth Animations**: Framer Motion for fluid transitions and hover effects
- **Responsive Layout**: 60% maze area, 40% control panel on large screens
- **Custom Fonts**: Orbitron (headers), Space Grotesk (body), Poppins (UI)

## 🔧 API Endpoints

### `GET /api/generate-maze`
Generates an AI-enhanced maze.

**Parameters:**
- `rows` (int, optional): Number of rows (default: 20)
- `cols` (int, optional): Number of columns (default: 20)

**Response:**
```json
{
  "maze": [[1,1,1,1,1], [1,0,0,0,1], ...],
  "rows": 20,
  "cols": 20,
  "start": [1, 1],
  "end": [18, 18]
}
```

## 🛠️ Development

### Backend Development
```bash
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Development
```bash
cd frontend
npm run dev
```

### Building for Production
```bash
# Frontend
cd frontend
npm run build
npm start

# Backend
cd backend
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## 📦 Dependencies

### Backend
- **FastAPI**: Modern web framework for APIs
- **PyTorch**: Machine learning framework
- **NumPy**: Numerical computing
- **Uvicorn**: ASGI server

### Frontend
- **Next.js 14**: React framework with App Router
- **Framer Motion**: Animation library for smooth transitions
- **React Zoom Pan Pinch**: Pan/zoom functionality for maze navigation
- **TailwindCSS**: Utility-first CSS framework with custom neon theme
- **Lucide React**: Icon library for UI elements
- **Axios**: HTTP client for API communication

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **PyTorch Team** for the amazing ML framework
- **FastAPI** for the high-performance web framework
- **Framer Motion** for smooth animations
- **TailwindCSS** for the utility-first CSS framework

---

**Made with ❤️ for Algorithm enthusiasts and maze lovers!**

*Experience the future of interactive maze visualization with AI-powered generation and real-time pathfinding algorithms.*

## 🎯 Key Highlights

- **Fixed 600x600px maze** that never resizes or distorts
- **Interactive start/end selection** with visual feedback
- **Smooth pan/zoom controls** for navigation
- **Real-time algorithm visualization** with hover effects
- **Futuristic neon UI** with glassmorphism design
- **Responsive layout** optimized for all screen sizes
