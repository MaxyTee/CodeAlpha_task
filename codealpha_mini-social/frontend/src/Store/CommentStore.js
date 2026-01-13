import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:4000/api/comment";

const initialState = { comments: null, isLoading: false };

export const useCommentStore = create((set) => ({
  ...initialState,
  createComment: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.post(`${API_URL}/create-comment`, payload);
      if (!data.success) {
        set({ isLoading: false, error: data?.messaag });
      }

      set({ isLoading: false, error: null });
    } catch (error) {
      console.log("Error", error);
      set({
        error: error?.data?.messaag || "Error creating messages",
        isLoading: false,
      });
    }
  },
}));
