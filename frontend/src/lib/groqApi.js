// Groq AI API integration for maze generation
import axios from 'axios';

const GROQ_API_KEY = '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';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const groqClient = axios.create({
  baseURL: GROQ_API_URL,
  headers: {
    'Authorization': `Bearer ${GROQ_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export const generateAIMaze = async (rows = 20, cols = 20) => {
  try {
    const prompt = `Generate a maze with ${rows} rows and ${cols} columns. 
    Return ONLY a JSON object with this exact structure:
    {
      "maze": [[1,1,1,1,1], [1,0,0,0,1], [1,0,1,0,1], [1,0,0,0,1], [1,1,1,1,1]],
      "start": [1, 1],
      "end": [${rows-2}, ${cols-2}],
      "aiParams": {
        "density": 0.7,
        "connectivity": 0.8,
        "complexity": 0.6
      }
    }
    
    Rules:
    - Use 1 for walls, 0 for paths
    - Ensure start and end are on paths (0)
    - Make it solvable
    - Add some complexity but keep it navigable
    - Return ONLY the JSON, no other text`;

    const response = await groqClient.post('', {
      model: 'llama-3.1-70b-versatile',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const content = response.data.choices[0].message.content;
    
    // Extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response');
    }

    const mazeData = JSON.parse(jsonMatch[0]);
    
    // Validate the maze structure
    if (!mazeData.maze || !Array.isArray(mazeData.maze)) {
      throw new Error('Invalid maze structure');
    }

    // Ensure start and end are paths
    const [startRow, startCol] = mazeData.start;
    const [endRow, endCol] = mazeData.end;
    
    if (mazeData.maze[startRow] && mazeData.maze[startRow][startCol] !== undefined) {
      mazeData.maze[startRow][startCol] = 0;
    }
    if (mazeData.maze[endRow] && mazeData.maze[endRow][endCol] !== undefined) {
      mazeData.maze[endRow][endCol] = 0;
    }

    return {
      maze: mazeData.maze,
      rows: mazeData.maze.length,
      cols: mazeData.maze[0]?.length || 0,
      start: mazeData.start,
      end: mazeData.end,
      aiParams: mazeData.aiParams || {
        density: Math.random(),
        connectivity: Math.random(),
        complexity: Math.random()
      }
    };

  } catch (error) {
    console.error('Groq AI API error:', error);
    // Fallback to mock API
    return await generateMockMaze(rows, cols);
  }
};

// Fallback mock maze generator
const generateMockMaze = async (rows, cols) => {
  const maze = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      if (i === 0 || i === rows - 1 || j === 0 || j === cols - 1) {
        row.push(1); // Walls on borders
      } else if (i % 2 === 0 && j % 2 === 0) {
        row.push(1); // Wall pattern
      } else {
        row.push(0); // Path
      }
    }
    maze.push(row);
  }
  
  // Ensure start and end are paths
  maze[1][1] = 0; // Start
  maze[rows - 2][cols - 2] = 0; // End
  
  return {
    maze,
    rows,
    cols,
    start: [1, 1],
    end: [rows - 2, cols - 2],
    aiParams: {
      density: Math.random(),
      connectivity: Math.random(),
      complexity: Math.random()
    }
  };
};
