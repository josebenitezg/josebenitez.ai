import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/Container";

export default function NextRoom({
  href,
  number,
  label,
  title,
}: {
  href: string;
  number: string;
  label: string;
  title: string;
}) {
  return (
    <nav className="next-room" aria-label="Continue exploring">
      <Container>
        <Link href={href}>
          <span className="observatory-label">
            Continue exploring <span aria-hidden="true">—</span> {number} /{" "}
            {label}
          </span>
          <span className="next-room-title">
            {title}
            <ArrowUpRight size={28} aria-hidden="true" />
          </span>
        </Link>
      </Container>
    </nav>
  );
}
