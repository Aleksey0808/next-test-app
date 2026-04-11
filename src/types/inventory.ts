export type Price = {
  value: number;
  symbol: string;
  isDefault: number;
};

export type Product = {
  id: number;
  serialNumber: number;
  isNew: number;
  photo: string;
  title: string;
  type: string;
  specification: string;
  guarantee: {
    start: string;
    end: string;
  };
  price: Price[];
  order: number;
  date: string;
};

export type Order = {
  id: number;
  title: string;
  date: string;
  description: string;
};

export type SelectedProduct = {
  id: number;
  title: string;
  serialNumber: number;
  isNew: number;
  photo: string;
  price: Price[];
} | null;

export type SelectedOrder = {
  id: number;
  title: string;
  description: string;
  totalUsd: number;
  totalUah: number;
  products: Product[];
} | null;

export type AppState = {
  appName: string;
  orders: Order[];
  products: Product[];
  avatar: string;
  searchQuery: string;
  isInventoryLoaded: boolean;
  language: "ru" | "en";
  isLanguageReady: boolean;
};

export type ConfirmDeleteModalProps = {
  description?: string;
  isOpen: boolean;
  label?: string;
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
};

export type DeleteProduct = {
  id: number;
  title: string;
  serialNumber: number;
  isNew: number;
  photo: string;
  price: {
    value: number;
    symbol: string;
    isDefault: number;
  }[];
} | null;
