"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Container from "@/components/Container";
import ReadingProgress from "@/components/ReadingProgress";
import { rooms, roomForPath } from "@/lib/rooms";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const currentRoom = roomForPath(pathname);
  useEffect(() => {
    const keyboard = () => {
      document.documentElement.dataset.navigationInput = "keyboard";
    };
    const pointer = () => {
      document.documentElement.dataset.navigationInput = "pointer";
    };
    document.addEventListener("keydown", keyboard);
    document.addEventListener("pointerdown", pointer, { passive: true });
    return () => {
      document.removeEventListener("keydown", keyboard);
      document.removeEventListener("pointerdown", pointer);
    };
  }, []);
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (!isOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [isOpen]);
  const navigation = (mobile = false) =>
    rooms.slice(1).map((room) => (
      <Link
        key={room.href}
        href={room.href}
        onClick={() => setIsOpen(false)}
        className={room.href === "/contact" ? "nav-contact" : undefined}
        aria-current={
          currentRoom?.href === room.href
            ? pathname === room.href
              ? "page"
              : "location"
            : undefined
        }
      >
        {mobile && (
          <span className="nav-number" aria-hidden="true">
            {room.number}
          </span>
        )}
        {room.label}
        {room.href === "/contact" && (
          <ArrowUpRight size={13} aria-hidden="true" />
        )}
      </Link>
    ));
  return (
    <header className="site-header">
      <Container className="site-header-inner">
        <Link href="/" className="site-signature" aria-label="José Benítez">
          <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <g stroke="currentColor" transform="translate(20 20) rotate(-25)">
              {[0, 1, 2, 3, 4, 5].map((n) => (
                <ellipse
                  key={n}
                  rx={11 + Math.cos(n) * 3}
                  ry={7 + Math.cos(n) * 2}
                  cy={Math.sin(n) * 5}
                />
              ))}
            </g>
          </svg>
          <span>
            José Benítez
            <span className="signature-caption">Personal observatory</span>
          </span>
        </Link>
        <nav className="desktop-navigation" aria-label="Primary navigation">
          {navigation()}
        </nav>
        <button
          ref={toggle}
          type="button"
          className="menu-toggle"
          onClick={() => setIsOpen((value) => !value)}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? (
            <X size={19} aria-hidden="true" />
          ) : (
            <Menu size={19} aria-hidden="true" />
          )}
        </button>
        {isOpen && (
          <nav
            id="mobile-navigation"
            className="mobile-navigation"
            aria-label="Mobile navigation"
          >
            <p className="observatory-label">Around the observatory</p>
            {navigation(true)}
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="mobile-home"
            >
              <span className="nav-number" aria-hidden="true">
                00
              </span>
              Back to the observatory
            </Link>
          </nav>
        )}
      </Container>
      <ReadingProgress />
    </header>
  );
}
