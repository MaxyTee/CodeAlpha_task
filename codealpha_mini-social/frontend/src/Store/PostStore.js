import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

const API_URL = "http://localhost:4000/api/post";

const initialState = {
  isLoading: false,
  error: null,
  post: null,
  allPost: [],
  postByUserId: [],
};

export const usePostStore = create((set, get) => ({
  ...initialState,

  getPostByUserId: async (force = false) => {
    const { postByUserId } = get();

    if (postByUserId?.length > 0 && !force) return;

    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.get(`${API_URL}/getUserPost`);
      if (!data.success) {
        set({ isLoading: false, error: data.message });
      }

      set({ isLoading: false, error: null, postByUserId: data.userPost });
    } catch (error) {
      console.log(error);
      set({
        isLoading: false,
        error: error?.data?.message || "Error getting user post",
      });
    }
  },
  createPost: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.post(`${API_URL}/createPost`, payload);
      if (!data.success) {
        toast.error(data.message);
        set({ isLoading: false, error: data.message });
        return;
      }

      const { getPostByUserId } = get();
      await getPostByUserId(true);

      toast.success(data.message);
      set({ isLoading: false, error: null, post: data.post });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
      set({ isLoading: false, error: error?.response?.data?.message });
    }
  },

  getAllPost: async (force = false) => {
    const { allPost } = get();
    if (allPost.length > 0 && !force) return;
    set({ isLoading: true, error: null });

    try {
      const { data } = await axios.get(`${API_URL}/get-allPost`);
      if (!data.success) {
        set({ isLoading: false, error: data.message });
      }

      set({ isLoading: false, error: null, allPost: data.folowingPosts });
    } catch (error) {
      console.log("Error message", error);
      set({
        isLoading: false,
        error: error?.data?.message || "Error getting all post",
      });
    }
  },

  updatePostbyUserId: async (payload) => {
    set({ isLoading: false, error: null });
    try {
      const { data } = await axios.patch(
        `${API_URL}/updatePost/${payload.postId}`,
        payload
      );
      if (!data.success) {
        set({ isLoading: false, error: data.message });
      }

      const { getPostByUserId } = get();
      await getPostByUserId(true);

      set({ isLoading: false, error: null });
    } catch (error) {
      console.log(error);
      set({
        isLoading: false,
        error: error?.data?.message || "Error updating post",
      });
    }
  },

  deletePost: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.delete(
        `${API_URL}/deletePost/${payload.postId}`
      );
      if (!data.success) {
        set({ isLoading: false, error: data.message });
        return { success: false };
      }

      const { postByUserId, getPostByUserId } = get();

      const deletedPost = postByUserId.filter(
        (post) => post._id !== payload.postId
      );

      await getPostByUserId(payload.userId, true);

      set({
        isLoading: false,
        error: null,
        postByUserId: deletedPost,
      });

      return { success: true };
    } catch (error) {
      console.log(error);
      set({ isLoading: false, error: error?.data?.message });
    }
  },
}));
