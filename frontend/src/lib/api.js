import axios from 'axios';
import { mockMazeAPI } from './mockApi';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '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';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // Increased timeout for AI processing
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  }
});

export const mazeAPI = {
  generateMaze: async (rows = 20, cols = 20) => {
    try {
      console.log('🤖 Attempting to connect to AI backend...', API_BASE_URL);
      
      // Try real AI API first
      const response = await api.get('/api/generate-maze', {
        params: { rows, cols }
      });
      
      console.log('✅ AI backend connected! Generated maze with parameters:', response.data.aiParams);
      return response.data;
    } catch (error) {
      console.warn('⚠️ AI backend not available, using mock API:', error.message);
      console.log('💡 To enable AI features, deploy backend to Railway/Render/Heroku');
      
      // Fallback to mock API
      const mockData = await mockMazeAPI.generateMaze(rows, cols);
      return {
        ...mockData,
        aiParams: {
          density: 0.5,
          connectivity: 0.5,
          complexity: 0.5
        }
      };
    }
  }
};

export default api;
