import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

const API_URL = "http://localhost:4000/api/like";

const initialState = {
  isLoading: true,
  error: null,
};

export const useLikeStore = create((set) => ({
  ...initialState,

  likePost: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.post(
        `${API_URL}/likePost/${payload.targetedUserId}/${payload.postId}`
      );
      if (!data.success) {
        set({ isLoading: false, error: data?.message });
        toast.error(data.message);
        return { success: false };
      }

      set({ isLoading: false, error: null });
      toast.success(data.message);

      return { success: true };
    } catch (error) {
      console.log("Error", error);
      toast.error(error?.response?.data?.message);
      set({ isLoading: false, error: error?.data?.message });
    } finally {
      set({ isLoading: false, error: null });
    }
  },

  unLikePost: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.post(
        `${API_URL}/unlikePost/${payload.targetedUserId}/${payload.postId}`
      );

      if (!data.success) {
        set({ isLoading: false, error: data?.message });
        toast.error(data.message);
        return { success: false };
      }

      set({ isLoading: false, error: null });
      return { success: true };
    } catch (error) {
      console.log("Error", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
