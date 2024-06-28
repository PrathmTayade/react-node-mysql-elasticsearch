import axios from "axios";

const API_BASE_URL = `${
  import.meta.env.VITE_BACKEND || "http://localhost:3000"
}/es/clients`; // Adjust URL as per your API endpoint

const apiService = {
  async getAllCompanies({ page = 1, limit = 10 }) {
    const response = await axios.get(
      `${API_BASE_URL}?page=${page}&limit=${limit}`
    );
    return response.data;
  },

  async getCompanyById(id) {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  },

  async createCompany(companyData) {
    const response = await axios.post(API_BASE_URL, companyData);
    return response.data;
  },

  async updateCompany(id, companyData) {
    const response = await axios.put(`${API_BASE_URL}/${id}`, companyData);
    return response.data;
  },

  async deleteCompany(id) {
    await axios.delete(`${API_BASE_URL}/${id}`);
  },

  async searchCompanies(searchTerm) {
    const response = await axios.get(`${API_BASE_URL}/search?q=${searchTerm}`);
    return response.data;
  },
};

export default apiService;
