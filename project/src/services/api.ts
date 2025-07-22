import axios from 'axios';
import { AuthResponse, Meeting, MeetingInsights } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Mock mode for testing - set to false when backend is ready
const MOCK_MODE = true;

// Mock data for testing
const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', password: 'password123' }
];

const mockDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    if (MOCK_MODE) {
      await mockDelay(1000); // Simulate network delay
      
      const user = mockUsers.find(u => u.email === email && u.password === password);
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      return {
        token: 'mock-jwt-token-' + Date.now(),
        user: { id: user.id, name: user.name, email: user.email }
      };
    }
    
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    if (MOCK_MODE) {
      await mockDelay(1000); // Simulate network delay
      
      // Check if user already exists
      if (mockUsers.find(u => u.email === email)) {
        throw new Error('User already exists');
      }
      
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password
      };
      
      mockUsers.push(newUser);
      
      return {
        token: 'mock-jwt-token-' + Date.now(),
        user: { id: newUser.id, name: newUser.name, email: newUser.email }
      };
    }
    
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

export const meetingAPI = {
  upload: async (file: File, onProgress?: (progress: number) => void): Promise<{ meetingId: string }> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/meeting/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total && onProgress) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      },
    });
    
    return response.data;
  },

  getInsights: async (meetingId: string): Promise<MeetingInsights> => {
    const response = await api.get(`/meeting/insights/${meetingId}`);
    return response.data;
  },

  getHistory: async (): Promise<Meeting[]> => {
    const response = await api.get('/meeting/history');
    return response.data;
  },

  downloadMeeting: async (meetingId: string): Promise<Blob> => {
    const response = await api.get(`/meeting/download/${meetingId}`, {
      responseType: 'blob',
    });
    return response.data;
  },

  exportInsights: async (meetingId: string, format: 'pdf' | 'docx'): Promise<Blob> => {
    const response = await api.get(`/meeting/export/${meetingId}?format=${format}`, {
      responseType: 'blob',
    });
    return response.data;
  },

  shareMeeting: async (meetingId: string): Promise<{ shareUrl: string }> => {
    const response = await api.post(`/meeting/share/${meetingId}`);
    return response.data;
  },
};

export default api;