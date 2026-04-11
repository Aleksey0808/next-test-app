import Link from "next/link";
import styles from "./not-found.module.css";

const NotFound = () => {
  return (
    <section className={styles.page}>
      <span className={styles.badge}>404</span>
      <h1 className={styles.title}>Страница не найдена</h1>
      <p className={styles.text}>
        Похоже, такого маршрута пока нет. Можно вернуться на главную страницу.
      </p>
      <Link href="/" className={styles.link}>
        На главную
      </Link>
    </section>
  );
};

export default NotFound;
