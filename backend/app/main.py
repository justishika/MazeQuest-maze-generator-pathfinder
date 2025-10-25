from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import maze

app = FastAPI(title="MazeQuest AI", version="1.0.0")

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(maze.router, prefix="/api", tags=["maze"])

@app.get("/")
async def root():
    return {"message": "MazeQuest AI Backend is running!"}
