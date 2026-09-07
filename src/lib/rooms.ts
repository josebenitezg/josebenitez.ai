export const rooms = [
  { number: "00", label: "Observatory", href: "/", note: "A place to begin." },
  {
    number: "01",
    label: "Work",
    href: "/work",
    note: "Ideas in the physical world.",
  },
  {
    number: "02",
    label: "Writing",
    href: "/writing",
    note: "Following the threads.",
  },
  {
    number: "03",
    label: "About",
    href: "/about",
    note: "The person behind the work.",
  },
  {
    number: "04",
    label: "Capabilities",
    href: "/capabilities",
    note: "Thinking through a system.",
  },
  {
    number: "05",
    label: "Contact",
    href: "/contact",
    note: "A conversation starts here.",
  },
] as const;

export function roomForPath(pathname: string) {
  return rooms.find(
    (room) =>
      room.href === pathname ||
      (room.href === "/writing" && pathname.startsWith("/blog/")),
  );
}
