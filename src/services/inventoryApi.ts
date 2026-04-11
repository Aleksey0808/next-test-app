import { api } from "@/services/api";

export const getOrders = () => api.get("/orders");
export const getProducts = () => api.get("/products");
export const deleteOrderRequest = (id: number) => api.delete(`/orders/${id}`);
export const deleteProductRequest = (id: number) => api.delete(`/products/${id}`);

export const loginRequest = (payload: { name: string; email: string }) => api.post("/auth/login", payload);
