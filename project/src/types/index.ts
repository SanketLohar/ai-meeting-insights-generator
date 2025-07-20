export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Meeting {
  id: string;
  title: string;
  fileName: string;
  duration: number;
  uploadDate: string;
  status: 'processing' | 'completed' | 'failed';
  fileSize: number;
}

export interface MeetingInsights {
  id: string;
  summary: string;
  actionItems: ActionItem[];
  participants: Participant[];
  keywords: string[];
  duration: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  topics: Topic[];
}

export interface ActionItem {
  id: string;
  text: string;
  assignee?: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

export interface Participant {
  name: string;
  speakingTime: number;
  contributions: number;
}

export interface Topic {
  name: string;
  confidence: number;
  timeSpent: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}