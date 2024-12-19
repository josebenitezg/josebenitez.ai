"use client";

import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Link,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <NextUINavbar
      maxWidth="xl"
      position="sticky"
      className="backdrop-blur-md bg-background/30 dark:bg-background/30 border-b border-divider"
    >
      <NavbarBrand>
        <Link href="/" className="font-bold text-inherit">
          <span className="text-primary">&lt;</span>
          Joselo
          <span className="text-primary">/&gt;</span>
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
          <Link color="foreground" href="/about">
            About
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            isIconOnly
            variant="light"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5 text-yellow-500" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
} 