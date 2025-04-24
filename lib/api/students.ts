import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface Student {
  _id: string;
  name: string;
  email: string;
  bio?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStudentDto {
  name: string;
  email: string;
  password: string;
  bio?: string;
  isActive?: boolean;
  sendWelcomeEmail?: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export const studentsApi = {
  create: async (student: CreateStudentDto): Promise<Student> => {
    const response = await axios.post(`${API_URL}/students`, student);
    return response.data;
  },

  login: async (credentials: LoginCredentials): Promise<Student> => {
    const response = await axios.post(`${API_URL}/students/login`, credentials);
    return response.data;
  },

  getAll: async (): Promise<Student[]> => {
    const response = await axios.get(`${API_URL}/students`);
    return response.data;
  },

  getOne: async (id: string): Promise<Student> => {
    const response = await axios.get(`${API_URL}/students/${id}`);
    return response.data;
  },

  update: async (id: string, data: Partial<CreateStudentDto>): Promise<Student> => {
    const response = await axios.patch(`${API_URL}/students/${id}`, data);
    return response.data;
  },

  remove: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/students/${id}`);
  }
}; 