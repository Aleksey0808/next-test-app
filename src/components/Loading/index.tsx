"use client";
import React from "react";
import Image from "next/image";
import styles from "./Loading.module.css";
import { useAppSelector } from "@/store/hooks";
import { selectLanguage } from "@/store/slices/appSlice";
import { getDictionary } from "@/helpers";

const Loading = () => {
  const language = useAppSelector(selectLanguage);
  const dictionary = getDictionary(language);

  return (
    <section className={styles.loadingState}>
      <Image alt="Loading" className={styles.loadingImage} height={120} src="/loading.png" width={120} />
      <h2 className={styles.loadingTitle}>{dictionary.loading.title}</h2>
      <p className={styles.loadingText}>{dictionary.loading.text}</p>
    </section>
  );
};

export default Loading;
