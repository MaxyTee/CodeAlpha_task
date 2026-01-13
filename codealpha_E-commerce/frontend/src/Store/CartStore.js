import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const initialState = {
  isLoading: false,
  error: null,
  cart: [],
};

export const useCartStore = create((set, get) => ({
  ...initialState,

  getCart: async (user) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.get(`${API_URL}/cart/get-cart/${user}`);
      if (!data.success) {
        set({ isLoading: false, error: data.message });
      }

      set({ isLoading: false, error: null, cart: data.cart.items });
      return { success: true };
    } catch (error) {
      console.log("Error", error);
      set({
        isLoading: false,
        error: error?.response?.data?.message || "Error getting cart",
      });
      return { success: false };
    }
  },

  removeFromCart: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.get(
        `${API_URL}/cart/remove-from-cart/${payload.user}/${payload.product}`,
        payload
      );
      if (!data.success) {
        toast.error(data.message);
        set({ isLoading: false, error: data.message });
      }

      const { getCart } = get();

      await getCart(payload.user);

      set({ isLoading: false, error: null });
      toast.success(data.message);
    } catch (error) {
      console.log("Error", error);
      set({
        isLoading: false,
        error: error?.response?.data?.message || "Error removing from cart",
      });
      return { success: false };
    }
  },

  clearCart: async (user) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.delete(`${API_URL}/cart/clear-cart/${user}`);
      if (!data.success) {
        set({ isLoading: false, error: data.message });
        toast.error(data.message);
      }

      set({ isLoading: false, error: null, cart: [] });
      toast.success(data.message);
      return { success: true };
    } catch (error) {
      console.log("Error", error);
      set({
        isLoading: false,
        error: error?.response?.data?.message || "Error clearing cart",
      });
      return { success: false };
    }
  },

  increaseProductQuantity: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.post(
        `${API_URL}/cart/inc-product-quantity`,
        payload
      );
      if (!data.success) {
        set({ isLoading: false, error: data.message });
        toast.error(data.message);
        return { success: false };
      }

      console.log(payload.product);

      const { getCart, cart } = get();
      await getCart(payload.user);

      const newData = cart.find((item) => item.product._id === payload.product);
      console.log(newData);

      set({ isLoading: false, error: null });
      toast.success(data.message);

      return { success: true };
    } catch (error) {
      console.log("Error", error);
      set({
        isLoading: false,
        error: error?.response?.data?.message || "Error Increasing Product",
      });
      return { success: false };
    }
  },
  addToCart: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.post(`${API_URL}/cart/add-to-cart`, payload);
      if (!data.success) {
        set({ isLoading: false, error: data.message });
        toast.error(data.message);
        return { success: false };
      }

      const { getCart } = get();
      getCart(payload.user);

      set({ isLoading: false, error: null, cart: data.cart });
      toast.success(data.message);

      return { success: true };
    } catch (error) {
      console.log("Error", error);
      set({
        isLoading: false,
        error: error?.response?.data?.message || "Error creatng Product",
      });
      return { success: false };
    }
  },
}));
