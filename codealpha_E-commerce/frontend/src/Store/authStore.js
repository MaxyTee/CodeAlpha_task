import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/auth`;

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  loginError: null,
  signupError: null,
};

export const useAuthStore = create((set) => ({
  ...initialState,

  signup: async (payload) => {
    set({ isLoading: true, signupError: null });
    try {
      const { response } = await axios.post(`${API_URL}/signup`, payload);
      if (!response.data.success) {
        set({ isLoading: false, signupError: response.data.message });
        toast.error(response.data.message);
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
     const message =error?.response?.data?.message || "Error Creating Account";
      console.log("Signup error:", error);
      set({
        signupError: message,
        isLoading: false,
        isAuthenticated: false,
      });
      
      toast.error(message);
      return { success: false };
    }
  },

  userLogin: async (payload) => {
    set({ isLoading: true, loginError: null });
    try {
      const response = await axios.post(`${API_URL}/user/login`, payload);
      if (!response.data.success) {
        set({ isLoading: false, loginError: response?.data?.message });
        toast.error(response.data.message);
        return { success: false };
      }
      set({
        isLoading: false,
        isAuthenticated: true,
        loginError: null,
        user: response.data.user,
      });

      toast.success(response.data.message);
      return { success: true };
    } catch (error) {
      const message =error?.response?.data?.message || "Error Creating Account";
      console.log(error?.message);
      set({
        isLoading: false,
        loginError: message,
        isAuthenticated: false,
      });

      toast.error(message)
    }
  },
  userAddress: async (payload) => {
    set({ isLoading: true, loginError: null });
    try {
      const response = await axios.patch(`${API_URL}/user/addresses`, payload);
      if (!response.data.success) {
        set({ isLoading: false, loginError: response?.data?.message });
        toast.error(response.data.message);
        return { success: false };
      }
      set({
        isLoading: false,
        isAuthenticated: true,
        loginError: null,
        user: response.data.user,
      });

      toast.success(response.data.message);
      return { success: true };
    } catch (error) {
      console.log(error);
      set({
        isLoading: false,
        loginError: error?.response?.data?.message,
        isAuthenticated: false,
      });
    }
  },
  admiLogin: async (payload) => {
    set({ isLoading: true, loginError: null });
    try {
      const response = await axios.post(`${API_URL}/admin/login`, payload);
      if (!response.data.success) {
        set({ isLoading: false, loginError: response?.data?.message });
        toast.error(response.data.message);
        return { success: false };
      }
      set({
        isLoading: false,
        isAuthenticated: true,
        loginError: null,
        user: response.data.user,
      });

      toast.success(response.data.message);
      return { success: true };
    } catch (error) {
      console.log(error);
      set({
        isLoading: false,
        loginError: error?.response?.data?.message,
        isAuthenticated: false,
      });
    }
  },

  logout: async () => {
    try {
      const response = await axios.post(`${API_URL}/logout`);
      if (!response.data.success) {
        return { success: false };
      }

      set({ ...initialState });
      return { success: true };
    } catch (error) {
      console.log("Error", error);
      return { success: false };
    }
  },
}));
