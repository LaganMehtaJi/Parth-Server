
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/student';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Companies
export const fetchCompanies = () => api.get('/companies');
export const createCompany = (companyData) => api.post('/companies', companyData);
export const updateCompany = (id, companyData) => api.put(`/companies/${id}`, companyData);
export const deleteCompany = (id) => api.delete(`/companies/${id}`);

// Jobs
export const addJobToCompany = (companyId, jobData) => api.post(`/companies/${companyId}/jobs`, jobData);
export const deleteJobFromCompany = (companyId, jobId) => api.delete(`/companies/${companyId}/jobs/${jobId}`);

// Error handling interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject({
        message: error.response.data.message || 'An error occurred',
        status: error.response.status,
      });
    }
    return Promise.reject({ message: 'Network error' });
  }
);

export default api;