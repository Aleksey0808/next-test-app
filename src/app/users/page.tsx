"use client";

import styles from "./page.module.css";
import { useAppSelector } from "@/store/hooks";
import { selectLanguage } from "@/store/slices/appSlice";
import { getDictionary } from "@/helpers";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
});

const UsersPage = () => {
  const language = useAppSelector(selectLanguage);
  const dictionary = getDictionary(language);

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>{dictionary.users.pageTitle}</h1>
      </div>

      <section className={styles.mapCard}>
        <MapView />
      </section>
    </section>
  );
};

export default UsersPage;
