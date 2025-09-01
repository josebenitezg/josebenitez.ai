"use client";

import { 
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { usePathname } from 'next/navigation';
import { useState } from "react";
import Link from 'next/link';

interface NavbarProps {
  className?: string;
}

const MENU_ITEMS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Blog", path: "/blog" },
  { label: "Biohacking", path: "/biohacking" },
];

export default function Navbar({ className = "" }: NavbarProps) {
  const pathname = usePathname();
  const [isDropUpOpen, setIsDropUpOpen] = useState(false);

  return (
    <>
      <div className={`sm:flex hidden sticky top-0 z-20 border-b border-white/10 bg-transparent ${className}`}>
        <div className="max-w-7xl mx-auto w-full h-14 flex items-center justify-between px-4">
          <Link 
            href="/"
            className="flex items-center gap-3 font-semibold hover:opacity-80 transition-opacity"
          >
            <span className="text-white">José Benítez</span>
          </Link>

          <nav className="flex gap-1">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-2.5 py-1.5 rounded-md transition-colors ${
                  pathname === item.path ? 'bg-white/10 text-white' : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="sm:hidden fixed bottom-8 right-4 z-50">
        {isDropUpOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsDropUpOpen(false)}
          />
        )}
        <button
          onClick={() => setIsDropUpOpen(!isDropUpOpen)}
          className={`
            w-12 h-12 rounded-full 
            bg-white/10 border border-white/15 
            backdrop-blur-lg flex items-center justify-center 
            shadow-lg shadow-black/20
            transition-all duration-300
            hover:bg-white/15 hover:scale-105
            relative
            after:absolute after:inset-0
            after:rounded-full after:border-2 after:border-white/20
          `}
        >
          <Bars3Icon className="w-6 h-6 text-white" />
        </button>

        {isDropUpOpen && (
          <div className="absolute bottom-16 right-0 z-50 w-64 p-2 rounded-xl bg-black/60 backdrop-blur-xl border border-white/15 shadow-xl">
            <div className="flex flex-col gap-2">
              {MENU_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`
                    px-4 py-2 rounded-xl transition-all duration-300
                    ${pathname === item.path 
                      ? 'bg-white/10 text-white' 
                      : 'hover:bg-white/5 text-neutral-300 hover:text-white'
                    }
                  `}
                  onClick={() => setIsDropUpOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
} 