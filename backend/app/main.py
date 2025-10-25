from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from app.routers import maze
import os

app = FastAPI(title="MazeQuest AI", version="1.0.0")

# API Key validation
async def verify_api_key(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header missing")
    
    try:
        scheme, token = authorization.split()
        if scheme.lower() != "bearer":
            raise HTTPException(status_code=401, detail="Invalid authentication scheme")
        
        # Check if API key is valid (you can add more validation here)
        expected_key = os.getenv("API_KEY", "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")
        if token != expected_key:
            raise HTTPException(status_code=401, detail="Invalid API key")
        
        return token
    except ValueError:
        raise HTTPException(status_code=401, detail="Invalid authorization header format")

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://*.vercel.app",
        "https://mazequest-ai.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(maze.router, prefix="/api", tags=["maze"])

@app.get("/")
async def root():
    return {"message": "MazeQuest AI Backend is running!"}
