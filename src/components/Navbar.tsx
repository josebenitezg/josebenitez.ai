"use client";

import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Link as NextUILink,
  Kbd,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { 
  CommandLineIcon, 
  ChevronRightIcon,
  HomeIcon,
  InformationCircleIcon,
  RectangleStackIcon,
  MagnifyingGlassIcon,
  WrenchScrewdriverIcon,
  DocumentIcon,
  CodeBracketIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { usePathname, useRouter } from 'next/navigation';
import { useKBar } from "kbar";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from 'next/link';

interface NavbarProps {
  className?: string;
}

const MENU_ITEMS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Blog", path: "/blog" },
  { label: "Papers", path: "/papers" },
  { label: "Projects", path: "/projects" },
];

export default function Navbar({ className = "" }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const { query } = useKBar();
  const [isDropUpOpen, setIsDropUpOpen] = useState(false);

  return (
    <>
      <NextUINavbar
        maxWidth="xl"
        position="sticky"
        className={`backdrop-blur-md bg-background/30 dark:bg-background/30 border-b border-divider sm:flex hidden ${className}`}
      >
        <NavbarBrand className="gap-4">
          <Link 
            href="/"
            className="flex items-center gap-2 font-mono hover:opacity-80 transition-opacity"
          >
            <CommandLineIcon className="w-5 h-5 text-primary" />
            <span className="text-primary/80">&gt;</span>
            <span className="text-primary">jose</span>
            <ChevronRightIcon className="w-3 h-3 text-primary/50" />
            <span className="text-default-600">~{pathname}</span>
            <span className="animate-[pulse_1.5s_ease-in-out_infinite] opacity-70">_</span>
          </Link>
        </NavbarBrand>

        {/* Desktop Menu */}
        <NavbarContent className="hidden sm:flex justify-center" justify="center">
          <div className="flex gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-xl border border-success/10">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`
                  px-4 py-2 rounded-full transition-all duration-300
                  ${pathname === item.path 
                    ? 'bg-success/20 text-success' 
                    : 'hover:bg-success/10 text-default-600 hover:text-success'
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </NavbarContent>

        <NavbarContent justify="end" className="gap-4">
          <NavbarItem>
            <Button
              variant="light"
              className="gap-2"
              startContent={<MagnifyingGlassIcon className="h-4 w-4" />}
              onClick={() => query.toggle()}
            >
              <div className="flex gap-1 items-center text-sm">
                <Kbd keys={["command"]}>K</Kbd>
              </div>
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              isIconOnly
              variant="light"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "light" ? (
                <MoonIcon className="h-5 w-5" />
              ) : (
                <SunIcon className="h-5 w-5 text-yellow-500" />
              )}
            </Button>
          </NavbarItem>
        </NavbarContent>
      </NextUINavbar>

      {/* Mobile Drop-up Menu */}
      <div className="sm:hidden fixed bottom-8 right-4 z-50">
        <button
          onClick={() => setIsDropUpOpen(!isDropUpOpen)}
          className={`
            w-12 h-12 rounded-full 
            bg-success/10 border border-success/20 
            backdrop-blur-lg flex items-center justify-center 
            shadow-lg shadow-success/20
            transition-all duration-300
            hover:bg-success/20 hover:scale-105
            relative
            after:absolute after:inset-0
            after:rounded-full after:border-2 after:border-success/40
            after:animate-ping-slow
          `}
        >
          <Bars3Icon className="w-6 h-6 text-success" />
        </button>

        <AnimatePresence>
          {isDropUpOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-16 right-0 w-64 p-2 rounded-2xl bg-black/50 backdrop-blur-xl border border-success/20 shadow-xl"
            >
              <div className="flex flex-col gap-2">
                {/* Flecha decorativa */}
                <div className="absolute bottom-[-8px] right-4 w-4 h-4 bg-black/50 border-r border-b border-success/20 transform rotate-45" />
                
                {/* Menú items */}
                {MENU_ITEMS.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`
                      px-4 py-2 rounded-xl transition-all duration-300
                      ${pathname === item.path 
                        ? 'bg-success/20 text-success' 
                        : 'hover:bg-success/10 text-default-600 hover:text-success'
                      }
                    `}
                    onClick={() => setIsDropUpOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
} 