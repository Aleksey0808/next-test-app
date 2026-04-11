"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import styles from "./page.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import dynamic from "next/dynamic";
import {
  removeOrder,
  removeProduct,
  selectLanguage,
  selectOrders,
  selectProducts,
  selectSearchQuery,
  selectIsInventoryLoaded,
} from "@/store/slices/appSlice";
import { formatDateLong, formatDateShort, formatMoney, getPriceValue } from "@/lib/inventory";
const InfoOrder = dynamic(() => import("@/components/InfoOrder"));
const ConfirmDeleteModal = dynamic(() => import("@/components/ConfirmDeleteModal"));

import { deleteOrderRequest, deleteProductRequest } from "@/services/inventoryApi";
import { SelectedProduct } from "@/types/inventory";
import Loading from "@/components/Loading";
import { getDictionary } from "@/helpers";

const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const products = useAppSelector(selectProducts);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(orders[0]?.id ?? null);
  const [orderToDelete, setOrderToDelete] = useState<number | null>(null);
  const [productToDelete, setProductToDelete] = useState<SelectedProduct>(null);
  const searchQuery = useAppSelector(selectSearchQuery);
  const isInventoryLoaded = useAppSelector(selectIsInventoryLoaded);
  const language = useAppSelector(selectLanguage);
  const dictionary = getDictionary(language);

  const handleDeleteOrder = async () => {
    if (!orderToDelete) return;

    try {
      await deleteOrderRequest(orderToDelete);

      if (orderToDelete === selectedOrderId) {
        setSelectedOrderId(null);
      }

      dispatch(removeOrder(orderToDelete));
      setOrderToDelete(null);
    } catch (error) {
      console.error("Failed to delete order", error);
    }
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;

    try {
      await deleteProductRequest(productToDelete.id);
      dispatch(removeProduct(productToDelete.id));
      setProductToDelete(null);
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  const enrichedOrders = useMemo(() => {
    return orders.map((order) => {
      const orderProducts = products.filter((product) => product.order === order.id);
      const totalUsd = orderProducts.reduce((sum, product) => sum + getPriceValue(product.price, "USD"), 0);
      const totalUah = orderProducts.reduce((sum, product) => sum + getPriceValue(product.price, "UAH"), 0);

      return {
        ...order,
        products: orderProducts,
        totalUsd,
        totalUah,
      };
    });
  }, [orders, products]);

  const visibleOrders = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) {
      return enrichedOrders;
    }

    return enrichedOrders.filter((order) => {
      const matchesOrder =
        order.title.toLowerCase().includes(query) || order.description.toLowerCase().includes(query);

      const matchesProducts = order.products.some((product) => {
        return (
          product.title.toLowerCase().includes(query) ||
          product.type.toLowerCase().includes(query) ||
          product.serialNumber.toString().includes(query)
        );
      });

      return matchesOrder || matchesProducts;
    });
  }, [enrichedOrders, searchQuery]);

  const activeOrderId = enrichedOrders.some((order) => order.id === selectedOrderId) ? selectedOrderId : null;

  const selectedOrder = visibleOrders.find((order) => order.id === activeOrderId) ?? null;
  const orderToDeleteData = visibleOrders.find((order) => order.id === orderToDelete) ?? null;

  const closeOrder = () => {
    setSelectedOrderId(null);
  };

  if (!isInventoryLoaded) {
    return <Loading />;
  }

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>{dictionary.orders.pageTitle}</h1>
        <p>/</p>
        <p className={styles.titleCount}>{visibleOrders.length}</p>
      </div>

      <div className={styles.layout}>
        <div className={styles.list}>
          {visibleOrders.map((order) => (
            <article
              key={order.id}
              className={order.id === selectedOrderId ? `${styles.card} ${styles.cardActive}` : styles.card}
              onClick={() => setSelectedOrderId(order.id)}>
              <div className={styles.cardTop}>
                <span className={styles.cardLabel}>
                  {dictionary.orders.itemPrefix} #{order.id}
                </span>
                <span className={styles.cardCount}>
                  {order.products.length} {dictionary.orders.productsCount}
                </span>
              </div>

              <div className={styles.cardBody}>
                <div>
                  <h2 className={styles.cardTitle}>{order.title}</h2>
                  <p className={styles.cardText}>{order.description}</p>
                </div>

                <button
                  className={styles.deleteButton}
                  onClick={(event) => {
                    event.stopPropagation();
                    setOrderToDelete(order.id);
                  }}
                  type="button">
                  <Image alt="Delete" height={16} src="/delete.png" width={16} />
                </button>
              </div>

              <div className={styles.cardMetaGrid}>
                <div className={styles.metaBlock}>
                  <span className={styles.metaLabel}>{dictionary.orders.date}</span>
                  <strong>{formatDateShort(order.date)}</strong>
                  <span>{formatDateLong(order.date)}</span>
                </div>

                <div className={styles.metaBlock}>
                  <span className={styles.metaLabel}>{dictionary.orders.total}</span>
                  <strong>{formatMoney(order.totalUsd, "USD")}</strong>
                  <span>{formatMoney(order.totalUah, "UAH")}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <InfoOrder
          closeOrder={closeOrder}
          onDeleteProduct={setProductToDelete}
          selectedOrder={selectedOrder}
        />
      </div>

      <ConfirmDeleteModal
        description={orderToDeleteData?.title}
        isOpen={Boolean(orderToDelete)}
        label=""
        onCancel={() => setOrderToDelete(null)}
        onConfirm={handleDeleteOrder}
        title={dictionary.orders.deleteOrderTitle}
      />

      <ConfirmDeleteModal
        description={dictionary.orders.deleteProductDescription}
        isOpen={Boolean(productToDelete)}
        label={dictionary.orders.deleteProductLabel}
        onCancel={() => setProductToDelete(null)}
        onConfirm={handleDeleteProduct}
        product={productToDelete}
        title={dictionary.orders.deleteProductTitle}
      />
    </section>
  );
};

export default OrdersPage;
