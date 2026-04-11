"use client";

import styles from "./page.module.css";
import { useAppSelector } from "@/store/hooks";
import { selectLanguage } from "@/store/slices/appSlice";
import { getDictionary } from "@/helpers";
import { selectProducts } from "@/store/slices/appSlice";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) => {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className={styles.tooltip}>
      <strong>{label}</strong>
      <span>{payload[0].value}</span>
    </div>
  );
};

const GroupsPage = () => {
  const language = useAppSelector(selectLanguage);
  const dictionary = getDictionary(language);
  const products = useAppSelector(selectProducts);

  const chartData = Object.entries(
    products.reduce(
      (acc, product) => {
        acc[product.type] = (acc[product.type] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    ),
  ).map(([name, count]) => ({
    name,
    count,
  }));

  const totalGroups = chartData.length;
  const totalProducts = products.length;

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>{dictionary.groups.pageTitle}</h1>
      </div>

      <section className={styles.chartCard}>
        <div className={styles.chartHeader}>
          <div>
            <h2 className={styles.chartTitle}>{dictionary.groups.pageTitle}</h2>
            <p className={styles.chartText}>{dictionary.groups.chartTitle}</p>
          </div>

          <div className={styles.metrics}>
            <div className={styles.metric}>
              <span className={styles.metricLabel}>{dictionary.groups.groupsCount}</span>
              <strong className={styles.metricValue}>{totalGroups}</strong>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricLabel}>{dictionary.groups.productsCount}</span>
              <strong className={styles.metricValue}>{totalProducts}</strong>
            </div>
          </div>
        </div>

        <div className={styles.chartWrap}>
          <ResponsiveContainer>
            <BarChart data={chartData} barCategoryGap={24}>
              <defs>
                <linearGradient id="groupsBar" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#16a34a" />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(148, 163, 184, 0.2)" strokeDasharray="4 4" vertical={false} />
              <XAxis
                axisLine={false}
                dataKey="name"
                tick={{ fill: "#64748b", fontSize: 12 }}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                axisLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(34, 197, 94, 0.08)" }} />
              <Bar dataKey="count" fill="url(#groupsBar)" radius={[12, 12, 4, 4]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
      {chartData.length === 0 ? (
        <div className={styles.emptyState}>
          <p>{dictionary.groups.emptyChart}</p>
        </div>
      ) : null}
    </section>
  );
};

export default GroupsPage;
