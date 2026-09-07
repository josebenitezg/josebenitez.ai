import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/Container";

export default function NextRoom({
  href,
  title,
}: {
  href: string;
  title: string;
}) {
  return (
    <nav className="next-room" aria-label="Continue exploring">
      <Container>
        <Link href={href} className="observatory-link">
          {title}
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </Container>
    </nav>
  );
}
