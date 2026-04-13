"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import styles from "./Sidebar.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectAvatar, setAvatar, selectLanguage } from "@/store/slices/appSlice";
import { getDictionary } from "@/helpers";

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const language = useAppSelector(selectLanguage);
  const dictionary = getDictionary(language);

  const menuItems = [
    { label: dictionary.sidebar.orders, href: "/orders" },
    { label: dictionary.sidebar.groups, href: "/groups" },
    { label: dictionary.sidebar.products, href: "/products" },
    { label: dictionary.sidebar.users, href: "/users" },
    { label: dictionary.sidebar.settings, href: "/settings" },
  ];

  const dispatch = useAppDispatch();
  const image = useAppSelector(selectAvatar);

  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleChangeImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload/avatar`, {

      method: "POST",
      body: formData,
    });

    const data = await response.json();

    dispatch(setAvatar(data.imageUrl));
    localStorage.setItem("avatar", data.imageUrl);
  };

  return (
    <>
      <button
        aria-hidden={!isOpen}
        className={isOpen ? styles.overlayVisible : styles.overlay}
        onClick={onClose}
        type="button"
      />

      <aside className={isOpen ? `${styles.sidebar} ${styles.sidebarOpen}` : styles.sidebar}>
        <div className={styles.sidebarTop}>
          <button className={styles.closeButton} onClick={onClose} type="button">
            <Image alt="close" height={24} src="/close.png" unoptimized width={24} />
          </button>

          <button className={styles.avatarButton} onClick={handleOpenFilePicker} type="button">
            <Image
              alt="avatar"
              className={styles.avatarImage}
              height={96}
              src={image}
              unoptimized
              width={96}
            />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleChangeImage}
            style={{ display: "none" }}
          />
        </div>

        <nav className={styles.sidebarNav}>
          {menuItems.map((item) => (
            <Link
              key={item.href}
              className={
                pathname === item.href ? `${styles.menuButton} ${styles.menuButtonActive}` : styles.menuButton
              }
              href={item.href}
              onClick={onClose}>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
