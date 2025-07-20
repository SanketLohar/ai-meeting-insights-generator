import axios from 'axios';
import { AuthResponse, Meeting, MeetingInsights } from '../types';

const apiUrl = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: apiUrl,
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
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
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