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
        <Navbar className="z-20" />
        <main className={`main-content ${isHome ? 'home-content' : 'scrollable-content'}`}>
          {children}
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </CommandPalette>
  );
} 