// src/utils/jobApi.js
import axios from 'axios';

export const getJobs = async (page = 1, limit = 5) => {
  const response = await axios.get(`http://localhost:5000/student/job?page=${page}&limit=${limit}`);
  return response.data; // Assuming API returns { jobs: [], totalPages: number }
};
