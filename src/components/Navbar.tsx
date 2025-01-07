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
} from "@heroicons/react/24/outline";
import { usePathname } from 'next/navigation';
import { useKBar } from "kbar";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const { query } = useKBar();

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
        className="backdrop-blur-md bg-background/30 dark:bg-background/30 border-b border-divider sm:flex hidden"
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

      {/* Mobile Floating Menu */}
      <div className="sm:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-2 p-2 rounded-full backdrop-blur-md bg-background/60 dark:bg-background/60 border border-divider shadow-lg">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`p-3 rounded-full transition-colors ${
                pathname === item.href 
                  ? 'bg-primary/20 text-primary' 
                  : 'hover:bg-primary/10 text-foreground'
              }`}
            >
              <item.icon className="w-5 h-5" />
            </Link>
          ))}
          <Button
            isIconOnly
            variant="light"
            className="rounded-full"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "light" ? (
              <MoonIcon className="h-5 w-5" />
            ) : (
              <SunIcon className="h-5 w-5 text-yellow-500" />
            )}
          </Button>
        </div>
      </div>
    </>
  );
} 