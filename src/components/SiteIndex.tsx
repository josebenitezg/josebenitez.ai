"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { rooms, roomForPath } from "@/lib/rooms";
export default function SiteIndex() {
  const pathname = usePathname();
  const currentRoom = roomForPath(pathname);
  return (
    <nav className="site-index" aria-label="Observatory index">
      {rooms.map((room) => (
        <Link
          key={room.href}
          href={room.href}
          aria-current={
            currentRoom?.href === room.href
              ? pathname === room.href
                ? "page"
                : "location"
              : undefined
          }
        >
          {room.label}
        </Link>
      ))}
    </nav>
  );
}
