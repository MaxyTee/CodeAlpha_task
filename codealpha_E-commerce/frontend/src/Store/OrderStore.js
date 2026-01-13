import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const initialState = {
  order: null,
  isLoading: false,
  error: null,
  AllOrders: [],
  userOrders: [],
};

export const useOrderStore = create((set, get) => ({
  ...initialState,

  getAllOrders: async (force = false) => {
    const { AllOrders } = get();
    if (AllOrders.length > 0 && !force) return;

    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.get(`${API_URL}/order/get-all-order`);
      if (!data.success) {
        set({ isLoading: false, error: data.message });
        toast.error(data.message);
      }

      set({ isLoading: false, error: null, AllOrders: data.orders });
      toast.success(data.message);
    } catch (error) {
      console.log("Error", error);
      set({
        isLoading: false,
        error: error?.response?.data?.message || "Error getting all order",
      });
    }
  },

  getUserOrder: async (user, force = false) => {
    const { userOrders } = get();
    if (userOrders.length > 0 && !force) return;

    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.get(
        `${API_URL}/order/get-user-order/${user}`
      );
      if (!data.success) {
        set({ isLoading: false, error: data.message });
        toast.error(data.message);
      }

      set({ isLoading: false, error: null, userOrders: data.orders });
      toast.success(data.message);
    } catch (error) {
      console.log("Error", error);
      set({
        isLoading: false,
        error: error?.response?.data?.message || "Error getting all order",
      });
    }
  },

  createOrder: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.post(
        `${API_URL}/order/create-order`,
        payload
      );
      if (!data.success) {
        set({ isLoading: false, error: data.message });
        toast.error(data.message);
      }

      const { getAllOrders, getUserOrder } = get();
      await getAllOrders(true);
      await getUserOrder(payload.user);

      set({ isLoading: false, error: null, order: data.order });
      toast.success(data.message);
    } catch (error) {
      console.log("Error", error);
      set({
        isLoading: false,
        error: error?.response?.data?.message || "Error creating order",
      });
    }
  },
}));
