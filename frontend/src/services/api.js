// src/services/apiService.js
const API_BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://apexauto.duckdns.org/api";

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // 🔹 Get Authorization header if token exists
  getAuthHeader() {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  // 🔹 Core request handler
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const text = await response.text();
      let data;

      // Try parsing JSON, fallback to text
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = { message: text };
      }

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! Status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // AUTH ENDPOINTS
  async register(userData) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    const data = await this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    return data;
  }

  async getProfile() {
    return this.request("/auth/profile", { method: "GET" });
  }

  async logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return { success: true, message: "Logged out successfully" };
  }

  //  SERVICE ENDPOINTS
  async getServices(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/services${query ? `?${query}` : ""}`, { method: "GET" });
  }

  async getServiceById(id) {
    return this.request(`/services/${id}`, { method: "GET" });
  }

  async createService(serviceData) {
    return this.request("/services", {
      method: "POST",
      body: JSON.stringify(serviceData),
    });
  }

  async updateService(id, serviceData) {
    return this.request(`/services/${id}`, {
      method: "PUT",
      body: JSON.stringify(serviceData),
    });
  }

  async deleteService(id) {
    return this.request(`/services/${id}`, { method: "DELETE" });
  }

  //  BUILDS ENDPOINTS
  async createBuild(buildData) {
    return this.request("/builds", {
      method: "POST",
      body: JSON.stringify(buildData),
    });
  }

  async getBuildsByUserId(userId, params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/builds/${userId}${query ? `?${query}` : ""}`, {
      method: "GET",
    });
  }

  async updateBuild(id, buildData) {
    return this.request(`/builds/${id}`, {
      method: "PUT",
      body: JSON.stringify(buildData),
    });
  }

  async deleteBuild(id) {
    return this.request(`/builds/${id}`, { method: "DELETE" });
  }

  // CAR MODELS ENDPOINTS
  async getCarModels() {
    return this.request("/car-models", { method: "GET" });
  }

  async createCarModel(carModelData) {
    return this.request("/car-models", {
      method: "POST",
      body: JSON.stringify(carModelData),
    });
  }

  // COLORS ENDPOINTS
  async getColors() {
    return this.request("/colors", { method: "GET" });
  }

  async createColor(colorData) {
    return this.request("/colors", {
      method: "POST",
      body: JSON.stringify(colorData),
    });
  }

  

  async healthCheck() {
    return this.request("/health", { method: "GET" });
  }
}

export default new ApiService();
