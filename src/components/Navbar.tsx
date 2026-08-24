"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "@/components/Container";

const NAV_ITEMS = [
  { label: "Work", path: "/work" },
  { label: "Capabilities", path: "/capabilities" },
  { label: "Field notes", path: "/writing" },
  { label: "About", path: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#090909]/90 backdrop-blur-xl">
      <Container className="relative flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-semibold tracking-[-0.02em] text-stone-100 transition-colors hover:text-white"
        >
          José Benítez
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              aria-current={isActive(item.path) ? "page" : undefined}
              className={`rounded-full px-3 py-2 text-sm transition-colors ${
                isActive(item.path)
                  ? "bg-white/10 text-stone-100"
                  : "text-stone-400 hover:bg-white/5 hover:text-stone-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className="button button-small ml-2">
            Contact
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-stone-200 transition-colors hover:bg-white/10 md:hidden"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? <X aria-hidden="true" size={19} /> : <Menu aria-hidden="true" size={19} />}
        </button>

        {isOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="absolute left-5 right-5 top-[calc(100%+0.75rem)] rounded-2xl border border-white/10 bg-[#111111] p-2 shadow-2xl shadow-black/40 md:hidden"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                aria-current={isActive(item.path) ? "page" : undefined}
                className={`block rounded-xl px-4 py-3 text-sm transition-colors ${
                  isActive(item.path)
                    ? "bg-white/10 text-stone-100"
                    : "text-stone-300 hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="button mt-2 w-full">
              Contact
            </Link>
          </nav>
        )}
      </Container>
    </header>
  );
}
