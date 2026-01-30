import axios from "axios";

// Base URL for API requests
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Create an axios instance with default configuration
export const getCategories = async () => {
    const res = await axios.get(`${API_URL}/categories`);
    return res.data;
}