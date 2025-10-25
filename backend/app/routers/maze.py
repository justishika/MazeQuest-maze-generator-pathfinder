from fastapi import APIRouter, Depends
from app.core.ai_generator import generate_ai_maze
from app.main import verify_api_key

router = APIRouter()

@router.get("/generate-maze")
async def generate_maze(rows: int = 20, cols: int = 20, api_key: str = Depends(verify_api_key)):
    """Generate an AI-enhanced maze with specified dimensions"""
    maze_data = generate_ai_maze(rows, cols)
    return {
        "maze": maze_data["maze"],
        "rows": maze_data["rows"],
        "cols": maze_data["cols"],
        "start": maze_data["start"],
        "end": maze_data["end"],
        "aiParams": maze_data.get("aiParams", {
            "density": 0.5,
            "connectivity": 0.5,
            "complexity": 0.5
        })
    }
