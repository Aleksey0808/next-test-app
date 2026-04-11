export const orders = [
  {
    id: 1,
    title: "Приход офисной техники №101",
    date: "2017-06-29 12:09:33",
    description: "Поставка техники для центрального офиса и отдела продаж.",
  },
  {
    id: 2,
    title: "Приход оборудования №102",
    date: "2017-07-03 09:15:10",
    description: "Новая партия рабочих станций и сетевого оборудования.",
  },
  {
    id: 3,
    title: "Приход периферии №103",
    date: "2017-07-11 16:42:54",
    description: "Мыши, клавиатуры, мониторы и аксессуары для сотрудников.",
  },
  {
    id: 4,
    title: "Приход серверного парка №104",
    date: "2017-07-15 10:21:01",
    description: "Серверы и системы хранения для расширения инфраструктуры.",
  },
  {
    id: 5,
    title: "Приход мобильного оборудования №105",
    date: "2017-07-20 14:11:23",
    description: "Ноутбуки и планшеты для выездной команды и менеджеров.",
  },
];

export const products = [
  {
    id: 1,
    serialNumber: 4821001,
    isNew: 1,
    photo: "/monitors.png",
    title: "Dell UltraSharp U2720Q",
    type: "Monitors",
    specification: "27-inch 4K IPS monitor, USB-C, HDR support",
    guarantee: {
      start: "2017-06-29 12:09:33",
      end: "2020-06-29 12:09:33",
    },
    price: [
      { value: 540, symbol: "USD", isDefault: 0 },
      { value: 14580, symbol: "UAH", isDefault: 1 },
    ],
    order: 1,
    date: "2017-06-29 12:09:33",
  },
  {
    id: 2,
    serialNumber: 4821002,
    isNew: 1,
    photo: "/monitors.png",
    title: "HP EliteDisplay E243",
    type: "Monitors",
    specification: "23.8-inch Full HD monitor with ergonomic stand",
    guarantee: {
      start: "2017-06-29 12:09:33",
      end: "2020-06-29 12:09:33",
    },
    price: [
      { value: 230, symbol: "USD", isDefault: 0 },
      { value: 6210, symbol: "UAH", isDefault: 1 },
    ],
    order: 3,
    date: "2017-07-11 16:42:54",
  },
  {
    id: 3,
    serialNumber: 5912001,
    isNew: 1,
    photo: "/laptops.png",
    title: "Lenovo ThinkPad T14 Gen 2",
    type: "Laptops",
    specification: "14-inch business laptop, Intel i7, 16GB RAM, 512GB SSD",
    guarantee: {
      start: "2017-07-20 14:11:23",
      end: "2020-07-20 14:11:23",
    },
    price: [
      { value: 1280, symbol: "USD", isDefault: 0 },
      { value: 34560, symbol: "UAH", isDefault: 1 },
    ],
    order: 5,
    date: "2017-07-20 14:11:23",
  },
  {
    id: 4,
    serialNumber: 5912002,
    isNew: 1,
    photo: "/laptops.png",
    title: "Apple MacBook Air 13",
    type: "Laptops",
    specification: "13-inch laptop, M1 chip, 8GB RAM, 256GB SSD",
    guarantee: {
      start: "2017-07-20 14:11:23",
      end: "2020-07-20 14:11:23",
    },
    price: [
      { value: 1199, symbol: "USD", isDefault: 0 },
      { value: 32373, symbol: "UAH", isDefault: 1 },
    ],
    order: 5,
    date: "2017-07-20 14:11:23",
  },
  {
    id: 5,
    serialNumber: 6703001,
    isNew: 1,
    photo: "/networking.png",
    title: "Cisco Catalyst C1000-24T-4G-L",
    type: "Networking",
    specification: "24-port managed switch with 4x1G SFP uplinks",
    guarantee: {
      start: "2017-07-03 09:15:10",
      end: "2022-07-03 09:15:10",
    },
    price: [
      { value: 870, symbol: "USD", isDefault: 0 },
      { value: 23490, symbol: "UAH", isDefault: 1 },
    ],
    order: 2,
    date: "2017-07-03 09:15:10",
  },
  {
    id: 6,
    serialNumber: 6703002,
    isNew: 1,
    photo: "/networking.png",
    title: "Ubiquiti UniFi 6 Long-Range",
    type: "Networking",
    specification: "Wi-Fi 6 access point for office wireless coverage",
    guarantee: {
      start: "2017-07-03 09:15:10",
      end: "2021-07-03 09:15:10",
    },
    price: [
      { value: 210, symbol: "USD", isDefault: 0 },
      { value: 5670, symbol: "UAH", isDefault: 1 },
    ],
    order: 2,
    date: "2017-07-03 09:15:10",
  },
  {
    id: 7,
    serialNumber: 7304001,
    isNew: 1,
    photo: "/storage.png",
    title: "Synology DS920+",
    type: "Storage",
    specification: "4-bay NAS for backups and shared company files",
    guarantee: {
      start: "2017-07-15 10:21:01",
      end: "2021-07-15 10:21:01",
    },
    price: [
      { value: 620, symbol: "USD", isDefault: 0 },
      { value: 16740, symbol: "UAH", isDefault: 1 },
    ],
    order: 4,
    date: "2017-07-15 10:21:01",
  },
  {
    id: 8,
    serialNumber: 7304002,
    isNew: 1,
    photo: "/storage.png",
    title: "Seagate IronWolf 8TB",
    type: "Storage",
    specification: "8TB NAS hard drive for redundant storage arrays",
    guarantee: {
      start: "2017-07-15 10:21:01",
      end: "2020-07-15 10:21:01",
    },
    price: [
      { value: 240, symbol: "USD", isDefault: 0 },
      { value: 6480, symbol: "UAH", isDefault: 1 },
    ],
    order: 4,
    date: "2017-07-15 10:21:01",
  },
  {
    id: 9,
    serialNumber: 8405001,
    isNew: 1,
    photo: "/tablets.png",
    title: "Apple iPad Air 10.9",
    type: "Tablets",
    specification: "10.9-inch tablet for field presentations and reporting",
    guarantee: {
      start: "2017-07-20 14:11:23",
      end: "2019-07-20 14:11:23",
    },
    price: [
      { value: 690, symbol: "USD", isDefault: 0 },
      { value: 18630, symbol: "UAH", isDefault: 1 },
    ],
    order: 5,
    date: "2017-07-20 14:11:23",
  },
  {
    id: 10,
    serialNumber: 9106001,
    isNew: 1,
    photo: "/accessories.png",
    title: "Logitech MX Keys",
    type: "Accessories",
    specification: "Wireless keyboard with backlight and multi-device support",
    guarantee: {
      start: "2017-07-11 16:42:54",
      end: "2019-07-11 16:42:54",
    },
    price: [
      { value: 120, symbol: "USD", isDefault: 0 },
      { value: 3240, symbol: "UAH", isDefault: 1 },
    ],
    order: 3,
    date: "2017-07-11 16:42:54",
  },
  {
    id: 11,
    serialNumber: 9106002,
    isNew: 1,
    photo: "/accessories.png",
    title: "Logitech MX Master 3",
    type: "Accessories",
    specification: "Wireless productivity mouse with USB receiver and Bluetooth",
    guarantee: {
      start: "2017-07-11 16:42:54",
      end: "2019-07-11 16:42:54",
    },
    price: [
      { value: 99, symbol: "USD", isDefault: 0 },
      { value: 2673, symbol: "UAH", isDefault: 1 },
    ],
    order: 3,
    date: "2017-07-11 16:42:54",
  },
  {
    id: 12,
    serialNumber: 4407001,
    isNew: 0,
    photo: "/servers.png",
    title: "Dell PowerEdge R540",
    type: "Servers",
    specification: "Rack server with dual Xeon CPUs and 64GB ECC RAM",
    guarantee: {
      start: "2017-07-15 10:21:01",
      end: "2022-07-15 10:21:01",
    },
    price: [
      { value: 3400, symbol: "USD", isDefault: 0 },
      { value: 91800, symbol: "UAH", isDefault: 1 },
    ],
    order: 4,
    date: "2017-07-15 10:21:01",
  },
];

export const getOrderById = (orderId) => {
  return orders.find((order) => order.id === Number(orderId));
};

export const getProductsByOrderId = (orderId) => {
  return products.filter((product) => product.order === Number(orderId));
};
