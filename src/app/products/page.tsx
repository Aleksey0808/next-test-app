"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./page.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import dynamic from "next/dynamic";

import {
  removeProduct,
  selectLanguage,
  selectOrders,
  selectProducts,
  selectSearchQuery,
  selectIsInventoryLoaded,
} from "@/store/slices/appSlice";
import {
  formatDateShort,
  formatMoney,
  getConditionLabel,
  getPriceValue,
  getStatusLabel,
} from "@/lib/inventory";
const ConfirmDeleteModal = dynamic(() => import("@/components/ConfirmDeleteModal"));

import { deleteProductRequest } from "@/services/inventoryApi";
import { SelectedProduct } from "@/types/inventory";
import Loading from "@/components/Loading";
import { getDictionary } from "@/helpers";

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const orders = useAppSelector(selectOrders);
  const [selectedType, setSelectedType] = useState("all");
  const [productToDelete, setProductToDelete] = useState<SelectedProduct | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const searchQuery = useAppSelector(selectSearchQuery);
  const isInventoryLoaded = useAppSelector(selectIsInventoryLoaded);
  const language = useAppSelector(selectLanguage);
  const dictionary = getDictionary(language);

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

  const typeOptions = useMemo(() => {
    return ["all", ...new Set(products.map((product) => product.type))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesType = selectedType === "all" || product.type === selectedType;

      const query = searchQuery.toLowerCase().trim();

      const matchesSearch =
        query === "" ||
        product.title.toLowerCase().includes(query) ||
        product.type.toLowerCase().includes(query) ||
        product.serialNumber.toString().includes(query) ||
        product.specification.toLowerCase().includes(query);

      return matchesType && matchesSearch;
    });
  }, [products, selectedType, searchQuery]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!filterRef.current?.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  if (!isInventoryLoaded) {
    return <Loading />;
  }

  return (
    <section className={styles.page}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarTitle}>
          <h1 className={styles.title}>{dictionary.products.pageTitle}</h1>
          <p>/</p>
          <span className={styles.titleCount}>{filteredProducts.length}</span>
        </div>

        <div className={styles.filterField} ref={filterRef}>
          <div className={styles.filterWrapper}>
            <span className={styles.filterLabel}>{dictionary.products.filterLabel}</span>
            <button
              aria-expanded={isFilterOpen}
              className={styles.selectButton}
              onClick={() => setIsFilterOpen((value) => !value)}
              type="button">
              <span>{selectedType === "all" ? dictionary.products.allTypes : selectedType}</span>
              <span className={styles.selectArrow}>▾</span>
            </button>
          </div>

          {isFilterOpen ? (
            <div className={styles.selectMenu}>
              {typeOptions.map((type) => (
                <button
                  key={type}
                  className={
                    type === selectedType
                      ? `${styles.selectOption} ${styles.selectOptionActive}`
                      : styles.selectOption
                  }
                  onClick={() => {
                    setSelectedType(type);
                    setIsFilterOpen(false);
                  }}
                  type="button">
                  {type === "all" ? dictionary.products.allTypes : type}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className={styles.grid}>
        {filteredProducts.map((product) => {
          const order = orders.find((item) => item.id === product.order);

          return (
            <article key={product.id} className={styles.card}>
              <div className={styles.cardMark}>
                <span className={product.isNew ? styles.markFree : styles.markRepair}></span>
              </div>

              <div className={styles.cardImageWrap}>
                <Image
                  alt={product.title}
                  className={styles.cardImage}
                  height={50}
                  src={product.photo}
                  width={50}
                />
              </div>

              <div className={styles.cardMain}>
                <div className={styles.cardTitleRow}>
                  <h2 className={styles.cardTitle}>{product.title}</h2>
                  <span className={styles.cardModel}>{product.type}</span>
                </div>
                <span className={styles.cardSerial}>SN {product.serialNumber}</span>
              </div>

              <div className={styles.cardStatus}>
                <span className={styles.cardLabel}>{dictionary.products.status}</span>
                <span
                  className={
                    product.isNew
                      ? `${styles.statusValue} ${styles.statusFree}`
                      : `${styles.statusValue} ${styles.statusRepair}`
                  }>
                  {getStatusLabel(product.isNew)}
                </span>
              </div>

              <div className={styles.cardGuarantee}>
                <span className={styles.cardLabel}>{dictionary.products.guarantee}</span>
                <span className={styles.cardGuaranteeValue}>
                  {formatDateShort(product.guarantee.start)} - {formatDateShort(product.guarantee.end)}
                </span>
              </div>

              <div className={styles.cardCondition}>
                <span className={styles.cardLabel}>{dictionary.products.condition}</span>
                <span className={styles.cardConditionValue}>{getConditionLabel(product.isNew)}</span>
              </div>

              <div className={styles.cardPrice}>
                <span className={styles.cardPriceUsd}>
                  {formatMoney(getPriceValue(product.price, "USD"), "USD")}
                </span>
                <strong className={styles.cardPriceUah}>
                  {formatMoney(getPriceValue(product.price, "UAH"), "UAH")}
                </strong>
              </div>

              <div className={styles.cardGroup}>
                <span className={styles.cardLabel}>{dictionary.products.group}</span>
                <span className={styles.cardGroupValue}>{order?.title ?? dictionary.products.notFound}</span>
              </div>

              <button
                className={styles.deleteButton}
                onClick={() => setProductToDelete(product)}
                type="button">
                <Image alt="Delete" height={12} src="/delete.png" width={12} />
              </button>
            </article>
          );
        })}
      </div>

      <ConfirmDeleteModal
        isOpen={Boolean(productToDelete)}
        title={dictionary.products.deleteProductTitle}
        onCancel={() => setProductToDelete(null)}
        onConfirm={handleDeleteProduct}
        product={productToDelete}
      />
    </section>
  );
};

export default ProductsPage;
