import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    Accept: 'application/json',
  },
});

export async function generatePortfolio(file) {
  const formData = new FormData();
  formData.append('resume', file);

  const { data } = await api.post('/portfolio/generate', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return data;
}

export async function getPortfolio(id) {
  const { data } = await api.get(`/portfolio/${id}`);
  return data;
}

export default api;
