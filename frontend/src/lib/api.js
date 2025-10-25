import axios from 'axios';
import { generateAIMaze } from './groqApi';
import { mockMazeAPI } from './mockApi';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const mazeAPI = {
  generateMaze: async (rows = 20, cols = 20) => {
    try {
      // Try real backend API first
      const response = await api.get('/generate-maze', {
        params: { rows, cols }
      });
      return response.data;
    } catch (error) {
      console.warn('Backend API not available, trying Groq AI:', error.message);
      
      try {
        // Try Groq AI API
        return await generateAIMaze(rows, cols);
      } catch (aiError) {
        console.warn('Groq AI not available, using mock API:', aiError.message);
        // Final fallback to mock API
        return await mockMazeAPI.generateMaze(rows, cols);
      }
    }
  }
};

export default api;
