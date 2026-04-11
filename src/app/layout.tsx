import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import LayoutShell from "@/components/LayoutShell";
import Providers from "@/providers";
import styles from "./layout.module.css";
import "./globals.css";
import InventoryBootstrap from "@/InventoryBootstrap";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Test App",
  description: "Base structure for a Next.js project with Redux Toolkit",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable} ${styles.html}`}>
      <body className={styles.body}>
        <Providers>
          <InventoryBootstrap />
          <LayoutShell>{children}</LayoutShell>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
