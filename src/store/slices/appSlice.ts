import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";
import type { AppState } from "@/types/inventory";

const initialState: AppState = {
  appName: "next-test-app",
  orders: [],
  products: [],
  avatar: "/user.png",
  searchQuery: "",
  isInventoryLoaded: false,
  language: "ru",
  isLanguageReady: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAvatar: (state, action) => {
      state.avatar = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter((product) => product.id !== action.payload);
    },
    removeOrder: (state, action) => {
      state.orders = state.orders.filter((order) => order.id !== action.payload);
      state.products = state.products.filter((product) => product.order !== action.payload);
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setInventoryLoaded: (state, action) => {
      state.isInventoryLoaded = action.payload;
    },
    setLanguageReady: (state, action) => {
      state.isLanguageReady = action.payload;
    },

    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const selectAppName = (state: RootState) => state.app.appName;
export const selectOrders = (state: RootState) => state.app.orders;
export const selectProducts = (state: RootState) => state.app.products;
export const selectSearchQuery = (state: RootState) => state.app.searchQuery;
export const selectProductsByOrderId = (state: RootState, orderId: number) =>
  state.app.products.filter((product) => product.order === orderId);
export const selectAvatar = (state: RootState) => state.app.avatar;
export const selectIsInventoryLoaded = (state: RootState) => state.app.isInventoryLoaded;
export const selectIsLanguageReady = (state: RootState) => state.app.isLanguageReady;
export const selectLanguage = (state: RootState) => state.app.language;
export const selectLanguageReady = (state: RootState) => state.app.isLanguageReady;

export const {
  setAvatar,
  setSearchQuery,
  removeProduct,
  removeOrder,
  setOrders,
  setProducts,
  setInventoryLoaded,
  setLanguage,
  setLanguageReady,
} = appSlice.actions;

export default appSlice.reducer;
