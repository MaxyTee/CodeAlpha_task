import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
axios.defaults.withCredentials = true;
const API_URL = `${import.meta.env.VITE_BACKEND_URL}/auth`;

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  loginError: null,
  signupError: null,
  isCheckingAuth: true,
  allUser: [],
};

export const useAuthStore = create((set, get) => ({
  ...initialState,

  getAllUser: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.get(`${API_URL}/getAllUser`);
      if (!data.success) {
        set({ isLoading: false, error: data.message });
      }

      set({ isLoading: false, error: null, allUser: data.allUser });
    } catch (error) {
      console.log("Error", error);
      set({ isLoading: false, error: error?.response?.data?.message });
    }
  },

  signup: async (payload) => {
    set({ isLoading: true, signupError: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, payload);
      if (!response.data.success) {
        set({ isLoading: false, signupError: response.data.message });
        toast.error(response?.data?.message);
        return { success: false };
      }
      set({
        isAuthenticated: true,
        isLoading: false,
        signupError: null,
        user: response.data.user,
      });
      toast.success(response.data.message);

      return { success: true };
    } catch (error) {
      console.log("Error message", error);
      set({
        signupError: error?.response?.data.message || "Error Creating Account",
        isLoading: false,
        isAuthenticated: false,
      });
    }
  },

  login: async (payload) => {
    console.log(payload);
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.post(`${API_URL}/login`, payload, {
        withCredentials: true,
      });
      if (!data.success) {
        set({ isLoading: false, error: data?.message });
        toast.error(data.message);
        return { success: false };
      }

      set({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      toast.success(data.message);
      return { success: true };
    } catch (error) {
      console.log(error);
      set({
        loginError: error?.response?.data?.message || "Error Login in",
        isAuthenticated: true,
        isLoading: false,
      });
    }
  },

  logout: async () => {
    try {
      const response = await axios.post(`${API_URL}/logout`);
      if (!response.data.success) {
        return;
      }

      set({ ...initialState });
    } catch (error) {
      console.log("Error", error);
      return;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const { data } = await axios.get(`${API_URL}/checkAuth`);
      if (!data.success) {
        set({ isCheckingAuth: false, error: data?.message });
      }
      set({
        user: data.user,
        isCheckingAuth: false,
        isAuthenticated: true,
      });
    } catch (error) {
      console.log("Error", error);
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
  },

  updateUser: async (payload) => {
    set({ isLoading: true, error: null });

    try {
      const { data } = await axios.post(`${API_URL}/updateUser`, payload);

      if (!data.success) {
        set({ isLoading: false, error: data?.message });
        toast.error(data.message);
      }

      set({ isLoading: false, error: null, user: data.user });
      toast.success(data.message);
    } catch (error) {
      console.log("Error", error);
      toast.error(error?.response?.data?.message || "Sever error");
    } finally {
      set({ isLoading: false, error: null });
    }
  },
}));
