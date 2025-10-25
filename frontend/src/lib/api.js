import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const mazeAPI = {
  generateMaze: async (rows = 20, cols = 20) => {
    try {
      const response = await api.get('/generate-maze', {
        params: { rows, cols }
      });
      return response.data;
    } catch (error) {
      console.error('Error generating maze:', error);
      throw new Error('Failed to generate maze');
    }
  }
};

export default api;
