import cors from "cors";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import { getOrderById, getProductsByOrderId, orders, products } from "./data.mjs";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import jwt from "jsonwebtoken";

const PORT = process.env.PORT || 4000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:3000";
const SERVER_PUBLIC_URL = process.env.SERVER_PUBLIC_URL || `http://localhost:${PORT}`;
const JWT_SECRET = process.env.JWT_SECRET || "test-secret-key";


const app = express();
const server = http.createServer(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({
  storage,
});

app.use(
  cors({
    origin: CLIENT_ORIGIN,
  }),
);
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: CLIENT_ORIGIN,
  },
});

let activeSessions = 0;

io.on("connection", (socket) => {
  activeSessions += 1;
  socket.emit("sessions", activeSessions);
  io.emit("sessions", activeSessions);

  socket.on("disconnect", () => {
    activeSessions -= 1;
    io.emit("sessions", activeSessions);
  });
});

app.get("/api/orders", (req, res) => {
  res.json(orders);
});

app.get("/api/orders/:id", (req, res) => {
  const order = getOrderById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  return res.json({
    ...order,
    products: getProductsByOrderId(order.id),
  });
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/orders/:id/products", (req, res) => {
  const order = getOrderById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  return res.json(getProductsByOrderId(order.id));
});

app.get("/api/sessions", (req, res) => {
  res.json({ activeSessions });
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true, activeSessions });
});

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.post("/api/upload/avatar", upload.single("avatar"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "File not uploaded" });
  }

const imageUrl = `${SERVER_PUBLIC_URL}/uploads/${req.file.filename}`;

  return res.json({
    message: "Avatar uploaded successfully",
    imageUrl,
  });
});

app.post("/api/auth/login", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  const token = jwt.sign(
    {
      name,
      email,
      role: "admin",
    },
    JWT_SECRET,
    { expiresIn: "1h" },
  );

  return res.json({ token });
});

app.delete("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  products.splice(index, 1);

  return res.json({ message: "Product deleted" });
});

app.delete("/api/orders/:id", (req, res) => {
  const id = Number(req.params.id);
  const orderIndex = orders.findIndex((order) => order.id === id);

  if (orderIndex === -1) {
    return res.status(404).json({ message: "Order not found" });
  }

  orders.splice(orderIndex, 1);

  for (let index = products.length - 1; index >= 0; index -= 1) {
    if (products[index].order === id) {
      products.splice(index, 1);
    }
  }

  return res.json({ message: "Order deleted" });
});

server.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
