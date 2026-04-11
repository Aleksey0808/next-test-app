"use client";

import Image from "next/image";
import styles from "./ConfirmDeleteModal.module.css";
import { ConfirmDeleteModalProps, DeleteProduct } from "@/types/inventory";
import { useAppSelector } from "@/store/hooks";
import { selectLanguage } from "@/store/slices/appSlice";
import { getDictionary } from "@/helpers";

type Props = ConfirmDeleteModalProps & {
  product?: DeleteProduct;
};

const ConfirmDeleteModal = ({ description, isOpen, label, onCancel, onConfirm, product, title }: Props) => {
  const language = useAppSelector(selectLanguage);
  const dictionary = getDictionary(language);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        {title ? <h2 className={styles.modalTitle}>{title}</h2> : null}
        {product ? (
          <div className={styles.productCard}>
            <span className={product.isNew ? styles.markFree : styles.markRepair}></span>
            <div className={styles.productImageWrap}>
              <Image
                alt={product.title}
                className={styles.productImage}
                height={52}
                src={product.photo}
                width={52}
              />
            </div>
            <div className={styles.productInfo}>
              <strong className={styles.productTitle}>{product.title}</strong>
              <span className={styles.serialNumber}>SN-{product.serialNumber}</span>
            </div>
          </div>
        ) : null}
        {description ? <h2 className={styles.modalLabel}>{description}</h2> : null}
        <div className={styles.modalActions}>
          <button className={styles.modalCancel} onClick={onCancel} type="button">
            {dictionary.modal.cancel}
          </button>
          <button className={styles.modalConfirm} onClick={onConfirm} type="button">
            {dictionary.modal.remove}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
