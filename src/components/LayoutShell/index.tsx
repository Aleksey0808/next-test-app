"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import styles from "./LayoutShell.module.css";
import { selectLanguageReady } from "@/store/slices/appSlice";
import { useAppSelector } from "@/store/hooks";
import Loading from "../Loading";

const LayoutShell = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isLanguageReady = useAppSelector(selectLanguageReady);

  const handleOpenSidebar = () => {
    setIsSidebarOpen((current) => !current);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  if (!isLanguageReady) {
    return <Loading />;
  }

  return (
    <div className={styles.shell}>
      <Header isSidebarOpen={isSidebarOpen} onMenuClick={handleOpenSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default LayoutShell;
