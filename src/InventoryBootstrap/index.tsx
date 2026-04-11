"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import {
  setOrders,
  setProducts,
  setAvatar,
  setInventoryLoaded,
  setLanguage,
  setLanguageReady,
} from "@/store/slices/appSlice";
import { getOrders, getProducts } from "@/services/inventoryApi";

const InventoryBootstrap = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const savedAvatar = localStorage.getItem("avatar");
    console.log("savedAvatar", savedAvatar);

    if (savedAvatar && savedAvatar !== "null" && savedAvatar !== "undefined") {
      dispatch(setAvatar(savedAvatar));
    } else {
      dispatch(setAvatar("/user.png"));
    }
    const savedLanguage = localStorage.getItem("language");

    if (savedLanguage === "ru" || savedLanguage === "en") {
      dispatch(setLanguage(savedLanguage));
    }
    dispatch(setLanguageReady(true));

    const loadData = async () => {
      try {
        const [ordersResponse, productsResponse] = await Promise.all([getOrders(), getProducts()]);

        dispatch(setOrders(ordersResponse.data));
        dispatch(setProducts(productsResponse.data));
        dispatch(setInventoryLoaded(true));
      } catch (error) {
        console.error("Failed to load inventory data", error);
      }
    };

    loadData();
  }, [dispatch]);

  return null;
};

export default InventoryBootstrap;
