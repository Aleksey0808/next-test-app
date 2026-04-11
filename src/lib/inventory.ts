export const formatDateShort = (value: string) => {
  return new Date(value).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const formatDateLong = (value: string) => {
  return new Date(value).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getPriceValue = (prices: { value: number; symbol: string }[], symbol: string) => {
  return prices.find((price) => price.symbol === symbol)?.value ?? 0;
};

export const formatMoney = (value: number, symbol: string) => {
  return `${value.toLocaleString("ru-RU")} ${symbol}`;
};

export const getConditionLabel = (isNew: number) => {
  return isNew ? "Новый" : "Б/У";
};

export const getStatusLabel = (isNew: number) => {
  return isNew ? "Свободен" : "В ремонте";
};
