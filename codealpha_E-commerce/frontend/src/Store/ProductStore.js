import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:4500/api";

const initialState = {
  product: null,
  isLoading: false,
  error: null,
  allProduct: [],
};

export const useProductStore = create((set, get) => ({
  ...initialState,

  getSingleProduct: async (slug) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.get(
        `${API_URL}/product/single-products/${slug}`
      );
      if (!data.success) {
        set({ isLoading: false, error: data.message });
      }

      set({ isLoading: false, error: null, product: data.product });

      return { success: true, product: data.product };
    } catch (error) {
      console.log("Error", error);
      set({
        isLoading: false,
        error: error?.response?.data?.message || "Error getting single Product",
      });
      return { success: false };
    }
  },

  getAllProduct: async (force = false) => {
    const { allProduct } = get();
    if (allProduct.length > 0 && !force) return;

    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.get(`${API_URL}/product/all-products`);
      if (!data.success) {
        set({ isLoading: false, error: data.message });
      }

      set({ isLoading: false, error: null, allProduct: data.allProducts });

      return { success: true };
    } catch (error) {
      console.log("Error", error);
      set({
        isLoading: false,
        error: error?.response?.data?.message || "Error creatng Product",
      });
      // toast.error(error.message);
      return { success: false };
    }
  },

  createProduct: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.post(
        `${API_URL}/product/create-product`,
        payload
      );
      if (!data.success) {
        set({ isLoading: false, error: data.message });
        toast.error(data.message);
        return { success: false };
      }

      set({ isLoading: false, error: null, product: data.product });
      toast.success(data.message);

      const { getAllProduct } = get();
      await getAllProduct(true);
      // await getSingleProduct();

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

  updateProduct: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.patch(
        `${API_URL}/product/update-product/${payload.update._id}`,
        payload
      );
      if (!data.success) {
        set({ isLoading: false, error: data.message });
        return { success: false };
      }

      const { getAllProduct } = get();

      await getAllProduct(true);

      set({ isLoading: false, error: null, product: data.product });

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
  deleteProduct: async (productId) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.delete(
        `${API_URL}/product/delete-product/${productId}`
      );
      if (!data.success) {
        set({ isLoading: false, error: data.message });
        return { success: false };
      }

      const { getAllProduct, allProduct } = get();

      const newProduct = allProduct.filter(
        (product) => product._id !== productId
      );
      await getAllProduct(true);

      set({ isLoading: false, error: null, allProduct: newProduct });

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
