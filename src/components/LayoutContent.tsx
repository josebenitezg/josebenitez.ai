"use client";

import { usePathname } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { CommandPalette } from "@/components/CommandPalette";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <CommandPalette>
      <div className="layout-container">
        <Navbar className="absolute top-0 left-0 right-0 z-20" />
        <main className={`main-content ${!isHome ? 'scrollable' : ''}`}>
          {children}
        </main>
        <Footer className="footer-container" />
        <ChatWidget />
      </div>
    </CommandPalette>
  );
} 