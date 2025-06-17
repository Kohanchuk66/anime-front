import axios from "axios";

const API_BASE_URL = "http://localhost:5001";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
const token = localStorage.getItem("token");
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      if (err.response.status === 401) {
        originalConfig._retry = true;

        try {
          const { data } = await api.get("/refresh_token");
          api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
          originalConfig.headers["Authorization"] = `Bearer ${data.token}`;
          return api(originalConfig);
        } catch (_error) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }

          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post("/login", { email, password });
    return response.data;
  },

  register: async (username: string, email: string, password: string) => {
    const response = await api.post("/register", {
      username,
      email,
      password,
    });
    return response.data;
  },
};

// User API
export const userAPI = {
  getUsers: async () => {
    const response = await api.get("api//users");
    return response.data;
  },

  getUser: async (id: string) => {
    const response = await api.get(`api/user/${id}`);
    return response.data;
  },

  updateUser: async (id: string, updates: any) => {
    const response = await api.put(`api/user/${id}`, updates);
    return response.data;
  },
};

// Anime API
export const animeAPI = {
  getAnime: async (params?: any) => {
    const response = await api.get("/api/catalog", { params });
    return response.data;
  },

  getAnimeById: async (id: string) => {
    const response = await api.get(`/api/catalog/${id}`);
    return response.data;
  },

  createAnime: async (animeData: any) => {
    const response = await api.post("/anime", animeData);
    return response.data;
  },

  getAnimeReviews: async (id: string) => {
    const response = await api.get(`/anime/${id}/reviews`);
    return response.data;
  },

  createReview: async (animeId: string, reviewData: any) => {
    const response = await api.post(`/anime/${animeId}/reviews`, reviewData);
    return response.data;
  },
};

// News API
export const newsAPI = {
  getNews: async () => {
    const response = await api.get("api/news");
    return response.data;
  },

  createNews: async (newsData: any) => {
    const response = await api.post("api/news", newsData);
    return response.data;
  },
};

// Watchlist API
export const watchlistAPI = {
  getWatchlists: async () => {
    const response = await api.get("api/watchlist");
    return response.data;
  },

  createWatchlist: async (watchlistData: any) => {
    const response = await api.post("api/watchlist", watchlistData);
    return response.data;
  },

  updateWatchlist: async (id: string, updates: any) => {
    const response = await api.put(`api/watchlist/${id}`, updates);
    return response.data;
  },

  deleteWatchlist: async (id: string) => {
    await api.delete(`api/watchlist/${id}`);
  },
};

// Report API
export const reportAPI = {
  createReport: async (reportData: any) => {
    const response = await api.post("/reports", reportData);
    return response.data;
  },

  getReports: async () => {
    const response = await api.get("/reports");
    return response.data;
  },
};

// Admin API
export const adminAPI = {
  banUser: async (userId: string, banned: boolean) => {
    const response = await api.put(`/admin/users/${userId}/ban`, { banned });
    return response.data;
  },

  changeUserRole: async (userId: string, role: string) => {
    const response = await api.put(`/admin/users/${userId}/role`, { role });
    return response.data;
  },
};

export default api;
