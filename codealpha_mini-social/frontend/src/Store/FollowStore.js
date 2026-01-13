import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

const API_URL = "http://localhost:4000/api/user";

const initialState = {
  loadingIds: [],
  isLoading: false,
  error: null,
};

export const useFollowStore = create((set) => ({
  ...initialState,

  followUser: async (id) => {
    set((state) => ({ loadingIds: [...state.loadingIds, id], error: null }));
    try {
      const { data } = await axios.post(`${API_URL}/follow/${id}`);
      if (!data.success) {
        set({ error: data.message });
        toast.error(data.message);
      }

      set({ error: null });
      toast.success(data.message);
    } catch (error) {
      console.log("Error", error);
      toast.error(error?.response?.data?.message || "Server error");
    } finally {
      set((state) => ({
        loadingIds: state.loadingIds.filter((uid) => uid !== id),
      }));
    }
  },

  unFollowUser: async (id) => {
    set((state) => ({ loadingIds: [...state.loadingIds, id], error: null }));

    try {
      const { data } = await axios.post(`${API_URL}/unfollow/${id}`);

      if (!data.success) {
        set({ error: data?.message });
        toast.error(data.message);
      }
      set({ error: null });
      toast.success(data.message);
    } catch (error) {
      console.log("Error", error);
      toast.error(error?.response?.data?.message || "Sever error");
    } finally {
      set((state) => ({
        loadingIds: state.loadingIds.filter((uid) => uid !== id),
      }));
    }
  },
}));
