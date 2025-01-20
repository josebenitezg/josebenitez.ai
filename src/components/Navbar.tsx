"use client";

import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Link,
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
import { usePathname } from 'next/navigation';
import { useKBar } from "kbar";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className = "" }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const { query } = useKBar();
  const [isDropUpOpen, setIsDropUpOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Blog", href: "/blog", icon: RectangleStackIcon },
    { name: "Papers", href: "/papers", icon: DocumentIcon },
    { name: "Projects", href: "/projects", icon: WrenchScrewdriverIcon },
    { name: "About", href: "/about", icon: InformationCircleIcon },
  ];

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

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="/blog">
              Blog
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/projects">
              Projects
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/papers">
              Pepe
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/about">
              About
            </Link>
          </NavbarItem>
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
                
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                      pathname === item.href 
                        ? 'bg-success/20 text-success' 
                        : 'hover:bg-success/10 text-foreground'
                    }`}
                    onClick={() => setIsDropUpOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
                
                {/* Theme Toggle */}
                <button
                  onClick={() => {
                    setTheme(theme === "dark" ? "light" : "dark");
                    setIsDropUpOpen(false);
                  }}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-success/10 w-full"
                >
                  {theme === "light" ? (
                    <>
                      <MoonIcon className="w-5 h-5" />
                      <span className="font-medium">Dark Mode</span>
                    </>
                  ) : (
                    <>
                      <SunIcon className="w-5 h-5 text-yellow-500" />
                      <span className="font-medium">Light Mode</span>
                    </>
                  )}
                </button>

                {/* Command Palette Trigger */}
                <button
                  onClick={() => {
                    query.toggle();
                    setIsDropUpOpen(false);
                  }}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-success/10 w-full"
                >
                  <MagnifyingGlassIcon className="w-5 h-5" />
                  <span className="font-medium">Search</span>
                  <Kbd className="ml-auto">⌘K</Kbd>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
} 