import axios from 'axios';

// This creates a new 'instance' of axios that is pre-configured.
// It reads the VITE_API_URL from your environment variables once.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;
