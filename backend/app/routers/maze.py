from fastapi import APIRouter
from app.core.ai_generator import generate_ai_maze

router = APIRouter()

@router.get("/generate-maze")
async def generate_maze(rows: int = 20, cols: int = 20):
    """Generate an AI-enhanced maze with specified dimensions"""
    maze_data = generate_ai_maze(rows, cols)
    return {
        "maze": maze_data["maze"],
        "rows": maze_data["rows"],
        "cols": maze_data["cols"],
        "start": maze_data["start"],
        "end": maze_data["end"]
    }
