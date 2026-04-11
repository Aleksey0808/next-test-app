"use client";

import Image from "next/image";
import styles from "./InfoOrder.module.css";
import { formatMoney, getConditionLabel, getPriceValue, getStatusLabel } from "@/lib/inventory";
import { SelectedOrder, SelectedProduct } from "@/types/inventory";
import { useAppSelector } from "@/store/hooks";
import { selectLanguage } from "@/store/slices/appSlice";
import { getDictionary } from "@/helpers";

type Props = {
  selectedOrder: SelectedOrder;
  closeOrder: () => void;
  onDeleteProduct: (product: SelectedProduct) => void;
};

const InfoOrder = ({ selectedOrder, closeOrder, onDeleteProduct }: Props) => {
  const language = useAppSelector(selectLanguage);
  const dictionary = getDictionary(language);

  return (
    <aside className={styles.details}>
      {selectedOrder ? (
        <>
          <div className={styles.detailsHeader}>
            <div>
              <span className={styles.detailsLabel}>{dictionary.orders.selectedOrder}</span>
              <h2 className={styles.detailsTitle}>{selectedOrder.title}</h2>
            </div>

            <button className={styles.closeDetails} onClick={() => closeOrder()} type="button">
              <Image alt="Close" height={20} src="/close.png" width={20} />
            </button>
          </div>

          <p className={styles.detailsText}>{selectedOrder.description}</p>

          <div className={styles.summaryGrid}>
            <div className={styles.summaryCard}>
              <span>{dictionary.orders.productsInOrder}</span>
              <strong>{selectedOrder.products.length}</strong>
            </div>
            <div className={styles.summaryCard}>
              <span>{dictionary.orders.totalUsd}</span>
              <strong>{formatMoney(selectedOrder.totalUsd, "USD")}</strong>
            </div>
            <div className={styles.summaryCard}>
              <span>{dictionary.orders.totalUah}</span>
              <strong>{formatMoney(selectedOrder.totalUah, "UAH")}</strong>
            </div>
          </div>

          <div className={styles.productList}>
            {selectedOrder.products.map((product) => (
              <article key={product.id} className={styles.productItem}>
                <div className={styles.productItemTop}>
                  <Image
                    alt={product.title}
                    className={styles.productImage}
                    height={52}
                    src={product.photo}
                    width={52}
                  />
                  <div className={styles.productInfo}>
                    <h3>{product.title}</h3>
                    <p>{product.type}</p>
                    <span>
                      {getConditionLabel(product.isNew)} • {getStatusLabel(product.isNew)}
                    </span>
                  </div>
                </div>
                <div className={styles.productBottom}>
                  <div className={styles.productPrice}>
                    <strong>{formatMoney(getPriceValue(product.price, "USD"), "USD")}</strong>
                    <span>{formatMoney(getPriceValue(product.price, "UAH"), "UAH")}</span>
                  </div>
                  <button
                    className={styles.deleteButton}
                    onClick={() => onDeleteProduct(product)}
                    type="button">
                    <Image alt="Delete" height={14} src="/delete.png" width={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </>
      ) : (
        <div className={styles.emptyState}>
          <h2>{dictionary.orders.emptyTitle}</h2>
          <p>{dictionary.orders.emptyText}</p>
        </div>
      )}
    </aside>
  );
};

export default InfoOrder;
