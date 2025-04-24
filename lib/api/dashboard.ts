import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface DashboardStats {
  totalStudents: number;
  totalCourses: number;
  totalEnrollments: number;
  revenue: number;
  studentGrowth: number;
  courseGrowth: number;
  enrollmentGrowth: number;
  revenueGrowth: number;
}

export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    const response = await axios.get(`${API_URL}/dashboard/stats`);
    return response.data;
  },

  getRecentStudents: async () => {
    const response = await axios.get(`${API_URL}/dashboard/recent-students`);
    return response.data;
  },

  getPopularCourses: async () => {
    const response = await axios.get(`${API_URL}/dashboard/popular-courses`);
    return response.data;
  },

  getRecentEnrollments: async () => {
    const response = await axios.get(`${API_URL}/dashboard/recent-enrollments`);
    return response.data;
  },

  getSystemStatus: async () => {
    const response = await axios.get(`${API_URL}/dashboard/system-status`);
    return response.data;
  }
}; 