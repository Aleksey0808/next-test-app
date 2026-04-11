import { translations } from "@/utils/translations";

export const getDictionary = (language: "ru" | "en") => {
  return translations[language];
};
