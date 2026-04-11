import { describe, expect, it } from "vitest";
import appReducer, { removeProduct } from "../store/slices/appSlice";

describe("appSlice", () => {
  it("removes product by id", () => {
    const initialState = {
      appName: "next-test-app",
      orders: [],
      products: [
        {
          id: 1,
          serialNumber: 1001,
          isNew: 1,
          photo: "/monitors.png",
          title: "Dell Monitor",
          type: "Monitors",
          specification: "27 inch",
          guarantee: {
            start: "2024-01-10",
            end: "2026-01-10",
          },
          price: [
            { value: 200, symbol: "USD", isDefault: 0 },
            { value: 8000, symbol: "UAH", isDefault: 1 },
          ],
          order: 1,
          date: "2024-01-10",
        },
        {
          id: 2,
          serialNumber: 1002,
          isNew: 0,
          photo: "/laptops.png",
          title: "Lenovo ThinkPad",
          type: "Laptops",
          specification: "Core i7",
          guarantee: {
            start: "2023-05-01",
            end: "2025-05-01",
          },
          price: [
            { value: 900, symbol: "USD", isDefault: 0 },
            { value: 36000, symbol: "UAH", isDefault: 1 },
          ],
          order: 1,
          date: "2023-05-01",
        },
      ],
      avatar: "/user.png",
      searchQuery: "",
      isInventoryLoaded: true,
      language: "ru",
    };

    const nextState = appReducer(initialState, removeProduct(1));

    expect(nextState.products).toHaveLength(1);
    expect(nextState.products[0].id).toBe(2);
  });
});
