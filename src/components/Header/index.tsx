"use client";

import Image from "next/image";
import Link from "next/link";
import TopMenu from "@/components/TopMenu";
import styles from "./Header.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectSearchQuery, setSearchQuery, selectLanguage, setLanguage } from "@/store/slices/appSlice";
import { getDictionary } from "@/helpers";

const Header = ({ isSidebarOpen, onMenuClick }: { isSidebarOpen: boolean; onMenuClick: () => void }) => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(selectSearchQuery);
  const language = useAppSelector(selectLanguage);
  const dictionary = getDictionary(language);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <button
            aria-expanded={isSidebarOpen}
            aria-label="Открыть меню"
            className={styles.burgerButton}
            onClick={onMenuClick}
            type="button">
            {/* <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} /> */}
            <Image alt="menu" height={24} src="/burger.png" width={24} />
          </button>

          <Link href="/orders" className={styles.brand}>
            <Image alt="logo" height={34} src="/logo.png" unoptimized width={34} />
            <h1 className={styles.brandTitle}>IVENTORY</h1>
          </Link>
        </div>

        <div className={styles.center}>
          <div className={styles.wrapper}>
            <input
              className={styles.input}
              type="text"
              value={searchQuery}
              onChange={(event) => dispatch(setSearchQuery(event.target.value))}
              placeholder={dictionary.search.placeholder}
            />
          </div>
        </div>

        <div className={styles.right}>
          <TopMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
