import axios from 'axios';
import { mockMazeAPI } from './mockApi';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const mazeAPI = {
  generateMaze: async (rows = 20, cols = 20) => {
    try {
      // Try real API first
      const response = await api.get('/generate-maze', {
        params: { rows, cols }
      });
      return response.data;
    } catch (error) {
      console.warn('Real API not available, using mock API:', error.message);
      // Fallback to mock API
      return await mockMazeAPI.generateMaze(rows, cols);
    }
  }
};

export default api;
