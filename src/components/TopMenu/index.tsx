"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import styles from "./TopMenu.module.css";
import { io } from "socket.io-client";
import { selectLanguage, setLanguage } from "@/store/slices/appSlice";
import { getDictionary } from "@/helpers";

const TopMenu = () => {
  const [now, setNow] = useState<Date | null>(null);
  const [activeSessions, setActiveSessions] = useState(0);
  const dispatch = useAppDispatch();
  const language = useAppSelector(selectLanguage);
  const dictionary = getDictionary(language);

  const switchLanguage = (lang: "ru" | "en") => {
    dispatch(setLanguage(lang));
    localStorage.setItem("language", lang);
  };

  useEffect(() => {
const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string);


    socket.on("sessions", (count) => {
      setActiveSessions(count);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(timerId);
  }, []);

  const date = now
    ? now.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "--.--.----";

  const time = now
    ? now.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "--:--:--";

  return (
    <div className={styles.topMenu}>
      <div className={styles.language}>
        <button
          className={language === "ru" ? styles.buttonLanguageActive : styles.buttonLanguage}
          onClick={() => switchLanguage("ru")}
          type="button">
          {dictionary.topMenu.languageRu}
        </button>

        <button
          className={language === "en" ? styles.buttonLanguageActive : styles.buttonLanguage}
          onClick={() => switchLanguage("en")}
          type="button">
          {dictionary.topMenu.languageEn}
        </button>
      </div>
      <div className={styles.dateTime}>
        <span className={styles.date}>{date}</span>
        <span className={styles.time}>{time}</span>
      </div>

      <div className={styles.sessions}>
        <span className={styles.sessionsLabel}>{dictionary.topMenu.activeSessions}</span>
        <span className={styles.sessionsCount}>{activeSessions}</span>
      </div>
    </div>
  );
};

export default TopMenu;
