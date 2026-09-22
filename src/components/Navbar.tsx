"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
] as const;

function isCurrent(pathname: string, href: string) {
  return (
    pathname === href || (href === "/writing" && pathname.startsWith("/blog/"))
  );
}

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="site-header">
      <Link href="/" className="site-name">
        José Benítez
      </Link>
      <nav aria-label="Primary navigation">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={
              isCurrent(pathname, item.href)
                ? pathname === item.href
                  ? "page"
                  : "location"
                : undefined
            }
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
