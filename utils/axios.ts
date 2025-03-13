import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: { "Content-Type": "application/json" },
  params: {
    api_key: "f49945b6f0fce723ce78332162695c65",
  },
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("auth");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error fetching auth token", error);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        await AsyncStorage.removeItem("auth");
        router.replace("/login");
      }
      if (error.response.status >= 500) {
        console.error("Server error! Please try again later.");
      }
    } else {
      console.error("Network error! Check your connection.");
    }

    return Promise.reject(error);
  },
);

export default api;
